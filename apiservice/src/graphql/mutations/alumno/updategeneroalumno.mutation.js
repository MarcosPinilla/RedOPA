import { GraphQLBoolean, GraphQLID } from "graphql";
import models from '../../../models';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';

const updateGenero = {
  type: GraphQLBoolean,
  args: {
    identidadGeneroId: {
      type: GraphQLID,
    },
  },
  async resolve (root, { identidadGeneroId }, { me }) {
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

    const identidadGenero = await models.IdentidadGenero.findOne({
      where: {
        id: identidadGeneroId,
      },
    });

    if (identidadGenero === null) {
      throw new UserInputError('La identidad de género no existe');
    }

    usuario.alumno.update({
      genero_id: identidadGenero.id,
    });

    return true;
  }
}

export default updateGenero;