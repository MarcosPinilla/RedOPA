import { GraphQLNonNull, GraphQLID, GraphQLBoolean } from "graphql"
import models from "../../../models";
import { ForbiddenError, AuthenticationError, UserInputError } from 'apollo-server';
const fs = require('fs');

const deleteApoderado = {
  type: GraphQLBoolean,
  args: {
    apoderado_id: {
      type: GraphQLNonNull(GraphQLID),
    }
  },
  async resolve (root, { apoderado_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso < 2) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    let apoderado = await models.Apoderado.findOne({
      where: {
        id: apoderado_id,
      },
    });

    if (apoderado === null) {
      throw new UserInputError('No se encontró el apoderado');
    }

    let usuarioApoderado = await models.Usuario.findOne({
      where: {
        id: apoderado.usuario_id,
      },
    });

    if (usuarioApoderado === null) {
      throw new UserInputError('No se encontró el usuario');
    }

    if (me.permiso === 2) {
      if (usuarioApoderado.institucion_id !== me.institucion) {
        throw new ForbiddenError('El apoderado no pertenece a su institución');
      }
    }

    apoderado.destroy();
    usuarioApoderado.destroy();

    return true;
  },
};

export default deleteApoderado;