import { GraphQLBoolean, GraphQLInt, GraphQLString } from 'graphql';
import models from '../../../models';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';

const updateEmail = {
  type: GraphQLBoolean,
  args: {},
  async resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario,
        },
      },
    );

    if (usuario === null) {
      throw new AuthenticationError('El usuario no existe');
    }

    if (usuario.consentimiento !== null) {
      throw new ForbiddenError('El acuerdo de privacidad ya fue aceptado');
    }

    var hoy = new Date();
    hoy.setHours(hoy.getHours() - (new Date().getTimezoneOffset() / 60));

    usuario.update({
      consentimiento: hoy,
    });

    if (usuario.consentimiento !== null) {
      return true;
    } else throw new Error('Error del servidor');
  }
};

export default updateEmail;