import models from '../../../models';
import { ForbiddenError, UserInputError, AuthenticationError } from 'apollo-server';
import { GraphQLID, GraphQLBoolean } from 'graphql';

const deleteAmigo = {
  type: GraphQLBoolean,
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

    if (usuario.alumno.id === amigo_id) {
      throw new Error('El alumno no puede ser amigo de si mismo');
    };

    var amigo = await models.Alumno.findOne(
      {
        where: {
          id: amigo_id
        }
      }
    );

    if (amigo === null) {
      throw new UserInputError('Debe elegir un alumno válido');
    }

    var amistad = await models.Amigo.findOne(
      {
        where: {
          alumno_id: usuario.alumno.id,
          amigo_id: amigo.id
        }
      }
    );

    if (amistad === null) {
      throw new Error('Amistad indefinida');
    }

    return models.Amigo.destroy({
      where: {
        alumno_id: usuario.alumno.id,
        amigo_id: amigo.id,
      },
    });
  }
}

export default deleteAmigo;