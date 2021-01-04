import amigoType from '../../types/amigo.type';
import models from '../../../models';
import { ForbiddenError, UserInputError, AuthenticationError } from 'apollo-server';
import { GraphQLID } from 'graphql';

const createAmigo = {
  type: amigoType,
  args: {
    amigo_id: {
      type: GraphQLID,
    },
  },
  async resolve (source, { amigo_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    var usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario
        },
        include: [
          {
            model: models.Alumno,
            as: 'alumno'
          }
        ]
      }
    );
    
    if (usuario.alumno === null) {
      throw new ForbiddenError('Not authorized to do this operation');
    }

    let numeroAmigos = await models.Amigo.count(
      {
        where: {
          alumno_id: usuario.alumno.id,
          deletedAt: null,
        }
      }
    );

    if (numeroAmigos >= 5) {
      throw new UserInputError('No se pueden agregar más amigos');
    }

    if (usuario.alumno.id == amigo_id) {
      throw new Error('El alumno no puede ser amigo de si mismo');
    }

    var amigo = await models.Alumno.findOne(
      {
        include: [
          {
            model: models.Usuario,
            as: 'cuenta',
            where: {
              institucion_id: me.institucion,
            },
          }
        ],
        where: {
          id: amigo_id
        }
      }
    );

    if (amigo === null) {
      throw new UserInputError('Debe elegir un alumno válido y de la misma institución');
    }

    var amistad = await models.Amigo.findOne(
      {
        where: {
          alumno_id: usuario.alumno.id,
          amigo_id: amigo_id
        }
      }
    );

    if (amistad !== null) {
      throw new Error('Amistad ya definida');
    }

    return models.Amigo.create({
      estado: 1,
      alumno_id: usuario.alumno.id,
      amigo_id: amigo_id,
    });
  }
}

export default createAmigo;