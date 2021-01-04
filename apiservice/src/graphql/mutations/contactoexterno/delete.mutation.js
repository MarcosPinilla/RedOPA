import { GraphQLBoolean, GraphQLID } from 'graphql';
import models from '../../../models';
import { ForbiddenError, UserInputError, AuthenticationError } from 'apollo-server';

const deleteContactoExterno = {
  type: GraphQLBoolean,
  args: {
    contacto_externo_id: {
      type: GraphQLID,
    },
  },
  async resolve (root, { contacto_externo_id }, { me }) {
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

    var contactoExterno = await models.ContactoExterno.findOne(
      {
        where: {
          id: contacto_externo_id,
          alumno_id: usuario.alumno.id,
        },
      },
    );

    if (contactoExterno === null) {
      throw new UserInputError('Contacto externo inválido');
    };

    return models.ContactoExterno.destroy({
      where: {
        id: contactoExterno.id,
        alumno_id: usuario.alumno.id,
      },
    });
  },
};

export default deleteContactoExterno;