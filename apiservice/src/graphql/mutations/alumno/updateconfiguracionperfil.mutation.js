  import { GraphQLBoolean } from 'graphql';
  import models from '../../../models';
  import { ForbiddenError, AuthenticationError } from 'apollo-server';

  const updateConfiguracionPerfil = {
    type: GraphQLBoolean,
    args: {
      perfilConfigurado: {
        type: GraphQLBoolean,
      },
    },
    async resolve (root, { perfilConfigurado }, { me }) {
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

      usuario.alumno.update({
        configuracion_perfil: perfilConfigurado,
      });

      return true;
    }
  };

  export default updateConfiguracionPerfil;