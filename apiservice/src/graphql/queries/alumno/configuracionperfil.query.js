import { GraphQLBoolean } from 'graphql';
import models from '../../../models';
import { ForbiddenError, AuthenticationError } from 'apollo-server';

const configuracionPerfilQuery = {
  type: GraphQLBoolean,
  args: {},
  async resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario,
        },
        include: [
          {
            model: models.Alumno,
            as: 'alumno',
          },
        ],
      },
    );

    if (usuario.alumno === null) {
      throw new ForbiddenError('Not authorized to do this operation');
    };

    if (usuario.alumno.configuracion_perfil !== 1) {
      return false;
    }

    return true;
  }
};

export default configuracionPerfilQuery;