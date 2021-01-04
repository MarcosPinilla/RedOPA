import { GraphQLNonNull, GraphQLList, GraphQLBoolean, GraphQLID } from 'graphql';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import alertaType from "../../types/alerta.type";
import models from "../../../models";
import { Sequelize } from 'sequelize';

const leerAlertaMutation = {
  type: GraphQLBoolean,
  args: {
    publicacion_id: {
      type: GraphQLNonNull(GraphQLID),
    }
  },
  async resolve (root, { publicacion_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso < 2) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    let alerta = await models.Alerta.findOne({
      where: {
        receptor_id: me.usuario,
        id: publicacion_id,
      }
    });

    if (alerta === null || alerta === undefined) {
      throw new UserInputError('Alerta no encontrada');
    }

    alerta.update({
      leida: 1,
    });

    return true;
  }
}

export default leerAlertaMutation;