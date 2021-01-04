import { GraphQLBoolean, GraphQLID } from "graphql";
import models from '../../../models';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';

const updateOrientacion = {
  type: GraphQLBoolean,
  args: {
    orientacionSexualId: {
      type: GraphQLID,
    },
  },
  async resolve (root, { orientacionSexualId }, { me }) {
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

    const orientacionSexual = await models.OrientacionSexual.findOne({
      where: {
        id: orientacionSexualId,
      },
    });

    if (orientacionSexual === null) {
      throw new UserInputError('La orientación sexual no existe');
    }

    usuario.alumno.update({
      orientacion_id: orientacionSexual.id,
    });

    return true;
  }
}

export default updateOrientacion;