import contactoType from '../../types/contacto.type';
import { UserInputError, ForbiddenError, AuthenticationError } from 'apollo-server';
import { GraphQLID } from 'graphql';
import models from '../../../models';

const createContacto = {
  type: contactoType,
  args: {
    funcionario_id: {
      type: GraphQLID,
    },
  },
  async resolve (root, { funcionario_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const usuario = await models.Usuario.findOne(
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

    const contacto = await models.Funcionario.findOne(
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
          id: funcionario_id,
        },
      },
    );

    if (contacto === null) {
      throw new UserInputError('Debe elegir un funcionario válido y de la misma institución');
    }

    let numeroContactos = await models.Contacto.count(
      {
        where: {
          alumno_id: usuario.alumno.id,
          deletedAt: null,
        }
      }
    );

    if (numeroContactos >= 5) {
      throw new UserInputError('No se pueden agregar más contactos');
    }

    var relacion = await models.Contacto.findOne({
      where: {
        alumno_id: usuario.alumno.id,
        contacto_id: funcionario_id,
      },
    });

    if (relacion !== null) {
      throw new Error('Contacto ya definido');
    };

    return models.Contacto.create({
      tipo: 1,
      alumno_id: usuario.alumno.id,
      contacto_id: funcionario_id,
    });
  },
};

export default createContacto;