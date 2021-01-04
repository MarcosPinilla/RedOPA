import { GraphQLBoolean, GraphQLID } from "graphql";
import { UserInputError, AuthenticationError } from "apollo-server";
import models from "../../../models";
import { Sequelize } from 'sequelize';

const comprobarEvaluacionQuery = {
  type: GraphQLBoolean,
  args: {
    alumnoId: {
      type: GraphQLID,
    },
  },
  async resolve (source, { alumnoId }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    let usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario
        },
        include: [
          {
            model: models.Alumno,
            as: 'alumno'
          },
          {
            model: models.Apoderado,
            as: 'apoderado',
          },
          {
            model: models.Funcionario,
            as: 'funcionario',
          },
          {
            model: models.Institucion,
            as: 'institucion',
          },
        ],
      },
    );

    let alumnoEvaluado = await models.Alumno.findOne({
      where: {
        id: alumnoId,
      },
      include: [{
        model: models.Usuario,
        as: 'cuenta',
        include: [{
          model: models.Institucion,
          as: 'institucion',
        }],
      }],
    });

    if (alumnoEvaluado === null) {
      throw new UserInputError('Debe elegir un alumno válido');
    }

    var hoy = new Date();
    hoy.setHours(hoy.getHours() - (new Date().getTimezoneOffset() / 60));
    var comienzoHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 1,
      (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);
    
    /** 
     * si deja de funcionar cambiar lo de arriba a:
     * var comienzoHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() ,
        (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);
    */

    const Op = Sequelize.Op;

    let ultimaEvaluacion = await models.Evaluacion.findOne({
      where: {
        alumno_id: alumnoEvaluado.id,
        evaluador_id: usuario.id,
        fecha: { [Op.gt]: comienzoHoy },
      },
    });

    if (ultimaEvaluacion !== null) {
      return true;
    }

    return false;
  }
};

export default comprobarEvaluacionQuery;