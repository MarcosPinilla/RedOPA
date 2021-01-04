import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import models from "../../../models";
import { Sequelize } from 'sequelize';
import cantidadDatosType from '../../types/cantidaddatos.type';

const estadisticasEvaluacionesApoderadosQuery = {
  type: GraphQLList(cantidadDatosType),
  args: {
    institucion_id: {
      type: GraphQLID,
    },
    periodo: {
      type: GraphQLString,
    }
  },
  async resolve (root, { institucion_id, periodo }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso < 2) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    const admin = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario,
        },
        include: [{
          model: models.Institucion,
          as: 'institucion',
        }]
      },
    );

    let institucion = 0;
    if (admin.permiso_id === 3) {
      if (institucion_id !== null && institucion_id !== '' && institucion_id !== 0) {
        institucion = institucion_id;
      } else throw new UserInputError('Debe proporcionar un id de institución');      
    }
    else {
      institucion = admin.institucion.id;
    }

    let cursos = await models.Curso.findAll({
      where: {
        institucion_id: institucion,
      }
    });
    
    const Op = Sequelize.Op;

    var hoy = new Date();
    hoy.setHours(hoy.getHours() - (new Date().getTimezoneOffset() / 60));

    if (periodo === 'dia') {
      var comienzoPeriodo = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 1,
        (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);
    } else if (periodo === 'semana') {
      var comienzoPeriodo = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 8,
        (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);
    } else if (periodo === 'mes') {
      var comienzoPeriodo = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 31,
        (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);
    } else {
      var comienzoPeriodo = new Date(hoy.getFullYear() - 1, hoy.getMonth(), hoy.getDate(),
        (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);
    }

    let porcentajesUso = [];

    for (let i = 0; i < cursos.length; i++) {
      let apoderadosConfigurados = 0;
      apoderadosConfigurados = await models.Apoderado.count({
        distinct: true,
        include: [
          {
            model: models.Alumno,
            as: 'pupilos',
            where: {
              curso_id: cursos[i].id,
            },
            required: true,
          },
          {
            model: models.Usuario,
            as: 'cuenta',
            where: {
              configuracion_password: 1,
            },
            required: true,
          }
        ],
      });

      let apoderadosConEvaluaciones = 0;
      apoderadosConEvaluaciones = await models.Usuario.count({
        distinct: true,
        where: {
          configuracion_password: 1,
        },
        include: [
          {
            model: models.Apoderado,
            as: 'apoderado',
            required: true,
            include: [
              {
                model: models.Alumno,
                as: 'pupilos',
                where: {
                  curso_id: cursos[i].id,
                },
                required: true,
              },
            ],
          },
          {
            model: models.Evaluacion,
            as: 'evaluaciones',
            required: true,
            where: {
              fecha: { [Op.gt]: comienzoPeriodo },
            },
          },
        ]
      });
      
      if (apoderadosConfigurados > 0) {
        let porcentaje = (apoderadosConEvaluaciones / apoderadosConfigurados) * 100;

        porcentajesUso.push({
          nombre: cursos[i].nivel + '°' + cursos[i].letra,
          cantidad: Math.trunc(porcentaje),
        });
      } else {
        porcentajesUso.push({
          nombre: cursos[i].nivel + '°' + cursos[i].letra,
          cantidad: 0,
        });
      }
    }

    return porcentajesUso;
  }
}

export default estadisticasEvaluacionesApoderadosQuery;