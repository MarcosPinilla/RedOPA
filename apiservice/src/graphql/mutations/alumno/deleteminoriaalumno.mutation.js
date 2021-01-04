import { GraphQLBoolean } from "graphql";
import models from '../../../models';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';

const deleteMinoria = {
  type: GraphQLBoolean,
  args: {},
  async resolve (root, {}, { me }) {
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
      minoria_id: null,
    });

    return true;
  }
}

export default deleteMinoria;