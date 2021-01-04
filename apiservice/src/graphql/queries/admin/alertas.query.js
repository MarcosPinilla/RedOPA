import { GraphQLNonNull, GraphQLList } from 'graphql';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import alertaType from "../../types/alerta.type";
import models from "../../../models";
import { Sequelize } from 'sequelize';

const alertasQuery = {
  type: GraphQLList(GraphQLNonNull(alertaType)),
  args: {},
  resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso < 2) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    var hoy = new Date();
    hoy.setHours(hoy.getHours() - (new Date().getTimezoneOffset() / 60));
    var comienzoHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 1,
      (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);

    const Op = Sequelize.Op;

    return models.Alerta.findAll({
      attributes: ['id', 'fecha', 'mensaje', 'tipo', 'leida'],
      where: {
        receptor_id: me.usuario,
      },
      include: [
        {
          model: models.Alumno,
          as: 'alumno',
          include: [
            {
              model: models.Usuario,
              as: 'cuenta',
            },
            {
              model: models.Curso,
              as: 'curso',
            },
          ],
          required: true,
        },
        {
          model: models.Usuario,
          as: 'receptor',
          required: true,
        },
      ],
      order: [
        ['fecha', 'DESC'],
      ]
    });
  }
}

export default alertasQuery;