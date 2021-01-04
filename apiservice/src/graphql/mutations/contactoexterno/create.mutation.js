import contactoExternoType from '../../types/contactoexterno.type';
import { GraphQLString } from 'graphql';
import models from '../../../models';
import { ForbiddenError, AuthenticationError, UserInputError } from 'apollo-server';

const createContactoExterno = {
  type: contactoExternoType,
  args: {
    nombre: {
      type: GraphQLString,
    },
    telefono: {
      type: GraphQLString,
    },
    correo: {
      type: GraphQLString,
    },
  },
  async resolve (root, { nombre, telefono, correo }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario,
        },
        include: [
          {
            model: models.Alumno,
            as: 'alumno'
          },
        ],
      },
    );

    if (usuario.alumno === null) {
      throw new ForbiddenError('Not authorized to do this operation');
    };

    let numeroContactosExternos = await models.ContactoExterno.count({
      where: {
        alumno_id: usuario.alumno.id,
        deletedAt: null,
      }
    });

    if (numeroContactosExternos >= 5) {
      throw new UserInputError('No se pueden agregar más contactos externos');
    }

    return models.ContactoExterno.create({
      nombre: nombre,
      telefono: telefono,
      correo: correo,
      alumno_id: usuario.alumno.id,
    });
  }
}

export default createContactoExterno;