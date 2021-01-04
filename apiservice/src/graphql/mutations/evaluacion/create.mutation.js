import evaluacionType from "../../types/evaluacion.type";
import { GraphQLID, GraphQLBoolean } from "graphql";
import { ForbiddenError, UserInputError, AuthenticationError } from "apollo-server";
import models from "../../../models";
import { Sequelize } from 'sequelize';
import nodemailer from 'nodemailer';

const createEvaluacion = {
  type: evaluacionType,
  args: {
    emocionId: {
      type: GraphQLID,
    },
    alumnoId: {
      type: GraphQLID,
    },
    permanente: {
      type: GraphQLBoolean,
    },
    puede: {
      type: GraphQLBoolean,
    },
  },
  async resolve (source, { emocionId, alumnoId, permanente, puede, }, { me }) {
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

    let emocionEval = await models.Emocion.findOne({
      where: {
        id: emocionId,
      },
    });

    if (emocionEval === null) {
      throw new UserInputError('Debe elegir una emoción válida');
    }

    var hoy = new Date();
    hoy.setHours(hoy.getHours() - (new Date().getTimezoneOffset() / 60));
    var comienzoHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 1,
      (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);
    var finHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 1,
      (0 - (new Date().getTimezoneOffset() / 60)), 0, 0, 0);
    
    /** 
     * si deja de funcionar cambiar lo de arriba a:
     * var comienzoHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() ,
        (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);
      var finHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 2,
        (0 - (new Date().getTimezoneOffset() / 60)), 0, 0, 0);
    */

    const Op = Sequelize.Op;

    let ultimaEvaluacion = await models.Evaluacion.findOne({
      where: {
        alumno_id: alumnoEvaluado.id,
        evaluador_id: usuario.id,
        fecha: { [Op.gt]: comienzoHoy },
      },
    });

    /* Descomentar para limitar evaluaciones a una por día */
    /**if (ultimaEvaluacion !== null) {
      throw new Error('Ya se ha evaluado a este alumno durante el día.');
    }*/

    if (usuario.institucion.id !== alumnoEvaluado.cuenta.institucion.id) {
      throw new ForbiddenError('El alumno no se encuentra en su institución');
    }

    let nivelEval = 0;

    if (usuario.alumno !== null) {
      /* El que evalúa es un alumno */
      if (usuario.alumno.id === alumnoEvaluado.id) {
        /* El alumno se evalúa a si mismo */
        if (emocionEval.id > 4) {
          if (permanente && puede != null && !puede) nivelEval = 4;
          else if (permanente && puede) nivelEval = 2;
          else nivelEval = 1;
        }
      } else {
        /* El alumno evalúa a un compañero */
        if (emocionEval.id > 4) {
          nivelEval = 1;
        }
      }
    } else if (usuario.apoderado !== null) {
      /* El que evalúa es apoderado */
      let apoderadoEval = await models.Apoderado.findOne(
        {
          where: {
            id: usuario.apoderado.id,
          },
          include: [{
            model: models.Alumno,
            as: 'pupilos',
            where: {
              id: alumnoEvaluado.id,
            }
          }],
        }
      );
      if (apoderadoEval === null) {
        throw new UserInputError('El alumno a evaluar no es pupilo del usuario');
      }
      if (emocionEval.id > 4) {
        nivelEval = 1;
      }
    } else if (usuario.funcionario !== null) {
      /* El que evalúa es un funcionario */
      if (emocionEval.id > 4) {
        nivelEval = 2;
      }
    } else {
      throw new ForbiddenError('Not authorized to do this operation');
    }

    /* Crear nuevo registro de riesgo diario del alumno */
    let ultimoRiesgo = await models.RiesgoDiario.findOne(
      {
        where: {
          fecha: { 
            [Op.gt]: comienzoHoy,
            [Op.lt]: finHoy,
          },
          alumno_id: alumnoEvaluado.id,
        }
      }
    );

    let riesgoActual = 0;
    let riesgoPrevio = 0;

    if (ultimoRiesgo === null) {
      models.RiesgoDiario.create({
        fecha: hoy,
        riesgo: nivelEval,
        alumno_id: alumnoEvaluado.id,
      });
      riesgoActual = nivelEval;
    } else {
      riesgoPrevio = ultimoRiesgo.riesgo;
      ultimoRiesgo.update({
        riesgo: ultimoRiesgo.riesgo + nivelEval,
      });
      riesgoActual = ultimoRiesgo.riesgo;
    }

    let umbral_riesgo = alumnoEvaluado.cuenta.institucion.umbral_riesgo;

    /* Comprobar registro diario y enviar alerta si es necesario */
    if (riesgoActual >= umbral_riesgo && riesgoPrevio < umbral_riesgo && hoy.getDay() !== 0 && hoy.getDay() !== 6) {
      /* Si la institución tiene activada la opción de recibir alertas */
      if (usuario.institucion.alertas) {
        /* Se crea alerta y se mandan correos a usuarios admins de la misma institución */
        let correos = [];

        const admins = await models.Usuario.findAll({
          where: {
            permiso_id: 2,
          },
          include: [{
            model: models.Institucion,
            as: 'institucion',
            where: {
              id: alumnoEvaluado.cuenta.institucion.id,
            },
          }],
        });

        admins.forEach(usuario => {
          correos.push(usuario.email);
          /* Crear alerta en base */
          models.Alerta.create({
            fecha: hoy,
            mensaje: 'El alumno ' + alumnoEvaluado.cuenta.nombres.split(' ')[0] + ' ' +
              alumnoEvaluado.cuenta.apellidos.split(' ')[0] + ' presenta alto riesgo suicida.',
            tipo: 1,
            alumno_id: alumnoEvaluado.id,
            receptor_id: usuario.id,
          });
        });

        let transport = nodemailer.createTransport({
          service: process.env.MAIL_SERVICE,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
          logger: true,
          debug: false,
        });
    
        let mailOptions = {
          to: correos,
          from: process.env.MAIL_USER,
          subject:'ALERTA DE RIESGO OPA',
          text: 'Estimad@, le informamos que RedOPA, al realizar la suma de las evaluaciones del estado de ánimo, identificó al estudiante ' + alumnoEvaluado.cuenta.nombres.split(' ')[0] + ' ' +
          alumnoEvaluado.cuenta.apellidos.split(' ')[0] + ' con riesgo suicida alto, es por este motivo que l@ invitamos a activar el protocolo de alerta:\n\n*No olvide que debe mantener la' +
          ' confidencialidad de esta información, procurando el uso de la app y de esta forma seguir cuidando a sus estudiantes.\n\nAtentamente RedOPA',
        };
    
        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
              return process.exit(1);
          }
          transport.close();
        });
      }
    }

    return await models.Evaluacion.create({
      fecha: hoy,
      nivel: nivelEval,
      emocion_id: emocionEval.id,
      alumno_id: alumnoEvaluado.id,
      evaluador_id: usuario.id,
    });
  },
};

export default createEvaluacion;