import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from "graphql";
import models from "../../../models";
import { ForbiddenError, UserInputError, AuthenticationError } from "apollo-server";

const agregarAdmin = {
  type: GraphQLBoolean,
  args: {
    funcionario_id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  async resolve (root, { funcionario_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso < 2) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    if (me.permiso === 3) {
      const funcionario = await models.Funcionario.findOne({
        where: {
          id: funcionario_id,
        },
        include: [{
          model: models.Usuario,
          as: 'cuenta',
          required: true,
          include: [{
            model: models.Permiso,
            as: 'permiso',
            required: true,
          }]
        }]
      });

      if (funcionario === null) {
        throw new ForbiddenError('No se encontró el funcionario');
      }

      funcionario.cuenta.update({
        permiso_id: 2,
      });    
    }
    else {
      const funcionario = await models.Funcionario.findOne({
        where: {
          id: funcionario_id,
        },
        include: [{
          model: models.Usuario,
          as: 'cuenta',
          required: true,
          where: {
            institucion_id: me.institucion,
          },
          include: [{
            model: models.Permiso,
            as: 'permiso',
            required: true,
          }]
        }]
      });

      if (funcionario === null) {
        throw new ForbiddenError('El funcionario no pertenece a su institución');
      }

      funcionario.cuenta.update({
        permiso_id: 2,
      });
    }

    return true;
  }
}

export default agregarAdmin;