import {  GraphQLInt } from "graphql";
import { AuthenticationError, ForbiddenError } from 'apollo-server';
import models from "../../../models";
import { Sequelize } from 'sequelize';

const autoevaluacionesDia = {
  type: GraphQLInt,
  args: {},
  async resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario,
        },
        include: [{
          model: models.Alumno,
          as: 'alumno',
        }]
      },
    );

    if (usuario.alumno === null) {
      throw new ForbiddenError('El usuario no es alumno');
    }

    const Op = Sequelize.Op;
    
    var hoy = new Date();
    hoy.setHours(hoy.getHours() - (new Date().getTimezoneOffset() / 60));
    var comienzoHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 1,
      (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);
    
    return models.Evaluacion.count({
      where: {
        evaluador_id: usuario.id,
        alumno_id: usuario.alumno.id,
        fecha: { [Op.gt]: comienzoHoy },
      },
    });
  }
}

export default autoevaluacionesDia;