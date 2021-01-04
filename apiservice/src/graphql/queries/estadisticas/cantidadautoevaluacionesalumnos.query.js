import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import models from "../../../models";
import { Sequelize } from 'sequelize';
import cantidadDatosType from '../../types/cantidaddatos.type';

const cantidadAutoevaluacionesAlumnosQuery = {
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
      },
      include: [{
        model: models.Alumno,
        as: 'alumnos',
        required: false,
        where: {
          configuracion_perfil: 1,
        },
        include: [
          {
            model: models.Usuario,
            as: 'cuenta',
          },
        ],
      }],
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

    let cantidades = [];

    for (let i = 0; i < cursos.length; i++) {
      let autoevaluacionesCurso = 0;
      for (let u = 0; u < cursos[i].alumnos.length; u++) {
        if (cursos[i].alumnos[u] !== null && cursos[i].alumnos[u] !== undefined ) {
          let autoevaluacionesAlumno = await models.Evaluacion.findAll({
            where: {
              alumno_id: cursos[i].alumnos[u].id,
              evaluador_id: cursos[i].alumnos[u].usuario_id,
              fecha: { [Op.gt]: comienzoPeriodo },
            },
          });

          if (autoevaluacionesAlumno.length > 0) {
            autoevaluacionesCurso += autoevaluacionesAlumno.length;
          }
        }
      }

      if (cursos[i].alumnos.length > 0) {
        cantidades.push({
          nombre: cursos[i].nivel + '°' + cursos[i].letra,
          cantidad: autoevaluacionesCurso,
        });
      } else {
        cantidades.push({
          nombre: cursos[i].nivel + '°' + cursos[i].letra,
          cantidad: 0,
        });
      }
    }

    return cantidades;
  }
}

export default cantidadAutoevaluacionesAlumnosQuery;