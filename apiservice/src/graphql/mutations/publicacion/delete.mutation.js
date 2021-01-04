import { GraphQLNonNull, GraphQLID, GraphQLBoolean } from "graphql"
import models from "../../../models";
import { ForbiddenError, AuthenticationError, UserInputError } from 'apollo-server';
const fs = require('fs');

const deletePublicacion = {
  type: GraphQLBoolean,
  args: {
    publicacion_id: {
      type: GraphQLNonNull(GraphQLID),
    }
  },
  async resolve (root, { publicacion_id }, { me }) {
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

    publicacion.destroy();

    return true;
  },
};

export default deletePublicacion