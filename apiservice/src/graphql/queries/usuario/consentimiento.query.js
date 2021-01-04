import { GraphQLNonNull, GraphQLInt } from 'graphql';
import usuarioType from '../../types/usuario.type';
import models from '../../../models';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import { GraphQLDateTime } from 'graphql-iso-date';

const logueadoQuery = {
  type: GraphQLDateTime,
  args: {
    usuario_id: {
      type: GraphQLInt,
    },
  },
  async resolve (root, { usuario_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso < 2) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    let usuario = await models.Usuario.findOne(
      {
        where: {
          id: usuario_id,
        },
      },
    );

    if (usuario === null) {
      throw new UserInputError('No se encontró al usuario con ese id');
    }

    return usuario.consentimiento;
  },
};

export default logueadoQuery;