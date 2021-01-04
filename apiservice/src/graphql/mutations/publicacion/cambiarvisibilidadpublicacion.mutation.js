import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLNonNull } from "graphql";
import { ForbiddenError, AuthenticationError, UserInputError } from 'apollo-server';
import models from "../../../models";

const cambiarVisibilidadPublicacion = {
  type: GraphQLBoolean,
  args: {
    visibilidad: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    publicacion_id: {
      type: GraphQLNonNull(GraphQLInt),
    }
  },
  async resolve(root, { visibilidad, publicacion_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso <= 1) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    let publicacion = await models.Publicacion.findOne({
      where: {
        id: publicacion_id,
      },
    });

    if (publicacion === null) {
      throw new UserInputError('No se encontró la publicación');
    }

    publicacion.update({
      visibilidad: visibilidad,
    });

    return true;
  }
}

export default cambiarVisibilidadPublicacion;