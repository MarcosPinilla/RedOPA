import { GraphQLBoolean, GraphQLID } from 'graphql';
import models from '../../../models';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';

const updateMinoria = {
  type: GraphQLBoolean,
  args: {
    minoriaId: {
      type: GraphQLID,
    },
  },
  async resolve (root, { minoriaId }, { me }) {
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

    const minoria = await models.Minoria.findOne({
      where: {
        id: minoriaId,
      },
    });

    if (minoria === null) {
      throw new UserInputError('La minoría no existe');
    }

    usuario.alumno.update({
      minoria_id: minoria.id,
    });

    return true;
  }
};

export default updateMinoria;