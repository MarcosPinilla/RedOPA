import { GraphQLID, GraphQLList, GraphQLString } from 'graphql';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import models from "../../../models";
import { Sequelize } from 'sequelize';
import cantidadDatosType from '../../types/cantidaddatos.type';

const cantidadCoevaluacionesAlumnosQuery = {
  type: GraphQLList(cantidadDatosType),
  args: {
    institucion_id: {
      type: GraphQLID,
    }
  },
  async resolve (root, { institucion_id, }, { me }) {
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
        required: true,
      }],
    });
    
    const Op = Sequelize.Op;

    let porcentajes = [];

    for (let i = 0; i < cursos.length; i++) {
      let activosCurso = 0;

      for (let u = 0; u < cursos[i].alumnos.length; u++) {
        if (cursos[i].alumnos[u].configuracion_perfil > 0) activosCurso++;
      }

      if (cursos[i].alumnos.length > 0) {
        let porcentaje = (activosCurso / cursos[i].alumnos.length) * 100;

        porcentajes.push({
          nombre: cursos[i].nivel + '°' + cursos[i].letra,
          cantidad: Math.trunc(porcentaje),
        });
      } else {
        porcentajes.push({
          nombre: cursos[i].nivel + '°' + cursos[i].letra,
          cantidad: 0,
        });
      }
    }

    return porcentajes;
  }
}

export default cantidadCoevaluacionesAlumnosQuery;