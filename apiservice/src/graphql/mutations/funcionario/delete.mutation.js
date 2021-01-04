import { GraphQLNonNull, GraphQLID, GraphQLBoolean } from "graphql"
import models from "../../../models";
import { ForbiddenError, AuthenticationError, UserInputError } from 'apollo-server';
const fs = require('fs');

const deleteFuncionario = {
  type: GraphQLBoolean,
  args: {
    funcionario_id: {
      type: GraphQLNonNull(GraphQLID),
    }
  },
  async resolve (root, { funcionario_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso < 2) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    let funcionario = await models.Funcionario.findOne({
      where: {
        id: funcionario_id,
      },
    });

    if (funcionario === null) {
      throw new UserInputError('No se encontró el funcionario');
    }

    let usuarioFuncionario = await models.Usuario.findOne({
      where: {
        id: funcionario.usuario_id,
      },
    });

    if (usuarioFuncionario === null) {
      throw new UserInputError('No se encontró el usuario');
    }

    if (me.permiso === 2) {
      if (usuarioFuncionario.institucion_id !== me.institucion) {
        throw new ForbiddenError('El funcionario no pertenece a su institución');
      }
    }

    if (usuarioFuncionario.permiso_id > 1) {
      throw new ForbiddenError('No se pueden eliminar administradores');
    }

    funcionario.destroy();
    usuarioFuncionario.destroy();

    return true;
  },
};

export default deleteFuncionario;