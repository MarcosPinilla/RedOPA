import { GraphQLBoolean, GraphQLID } from "graphql";
import models from '../../../models';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';

const updatePueblo = {
  type: GraphQLBoolean,
  args: {
    puebloIndigenaId: {
      type: GraphQLID,
    },
  },
  async resolve (root, { puebloIndigenaId }, { me }) {

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

    const puebloIndigena = await models.PuebloIndigena.findOne({
      where: {
        id: puebloIndigenaId,
      },
    });

    if (puebloIndigena === null) {
      throw new UserInputError('El pueblo indígena no existe');
    }

    usuario.alumno.update({
      pueblo_id: puebloIndigena.id,
    });

    return true;
  }
}

export default updatePueblo;