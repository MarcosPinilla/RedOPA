import { GraphQLList, GraphQLID } from 'graphql';
import interesType from '../../types/interes.type';
import models from '../../../models';
import { ForbiddenError, AuthenticationError } from 'apollo-server';
import interesDatosType from '../../types/interesdatos.type';

const interesesCursoQuery = {
  type: GraphQLList(interesDatosType),
  args: {
    institucion_id: {
      type: GraphQLID,
    }
  },
  async resolve (root, { institucion_id }, { me }) {
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

    let intereses = await models.Interes.findAll({
      include: [{
        model: models.CategoriaInteres,
        as: 'categoria',
        required: true,
        include: [{
          model: models.Institucion,
          as: 'institucion',
          where: {
            id: institucion, 
          },
          required: true,
        }],
      }],
    });

    let interesesDatos = [];

    for (let j = 0; j < intereses.length; j++) {
      let cantidades = [];
      for (let i = 0; i < cursos.length; i++) {
        let cantidad = await models.Interes.count({
          include: [
            {
              model: models.Alumno,
              as: 'alumnos',
              distinct: true,
              required: true,
              include: [{
                model: models.Curso,
                as: 'curso',
                where: {
                  id: cursos[i].id,
                }
              }]
            },
          ],
          where: {
            id: intereses[j].id,
          },
        });

        cantidades.push({
          nombre: cursos[i].id,
          cantidad: cantidad,
        });
      }

      interesesDatos.push({
        nombre: intereses[j].nombre,
        id: intereses[j].id,
        cantidades: cantidades,
      });
    }

    return interesesDatos;
  },
};

export default interesesCursoQuery;