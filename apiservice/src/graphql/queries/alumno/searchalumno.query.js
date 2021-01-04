import { GraphQLNonNull, GraphQLID, GraphQLList, GraphQLString } from 'graphql';
import { AuthenticationError } from 'apollo-server';
import alumnoType from '../../types/alumno.type';
import models from '../../../models';
import { Sequelize } from 'sequelize';
import searchFilter from "../../../utils/search_filter";


const searchAlumnoQuery = {
  type: GraphQLList(GraphQLNonNull(alumnoType)),
  args: {
    textSearch: {
      type: GraphQLString,
    },
    institucion_id: {
      type: GraphQLID,
    },
    course_id: {
      type: GraphQLID,
    }
  },
  async resolve (root, { textSearch, institucion_id, course_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const Op = Sequelize.Op;

    const extra_includes = [
      {
        model: models.Curso,
        as: 'curso',
        ...(course_id && course_id != 0) && {
          where: {
            id: course_id
          }
        },
      }
    ]; 

    var data;
    
    if (me.permiso > 2) {
      if (institucion_id === undefined || institucion_id < 1) {
        // Código súper admin
        data = await models.Alumno.findAll({
          include: [
            {
              model: models.Usuario,
              as: 'cuenta',
              where: {
                id: {
                  [Op.ne]: me.usuario,
                },
              },
              include: [
                {
                  model: models.Institucion,
                  as: 'institucion',
                },
                {
                  model: models.Genero,
                  as: 'genero',
                }
              ],
            },
          ].concat(extra_includes),
          order: [
            ['cuenta', 'nombres', 'ASC'],
          ],
          distinct: true,
        });
      } else {
        // Código admin
        data = await models.Alumno.findAll({
          include: [
            {
              model: models.Usuario,
              as: 'cuenta',
              where: {
                institucion_id: institucion_id,
                id: {
                  [Op.ne]: me.usuario,
                },
              },
              include: [
                {
                  model: models.Institucion,
                  as: 'institucion',
                },
                {
                  model: models.Genero,
                  as: 'genero',
                }
              ],
            }
          ].concat(extra_includes),
          order: [
            ['cuenta', 'nombres', 'ASC'],
          ],
          distinct: true
        });
      }
    } else {
      data = await models.Alumno.findAll({
        include: [
          {
            model: models.Usuario,
            as: 'cuenta',
            where: {
              institucion_id: me.institucion,
              id: {
                [Op.ne]: me.usuario,
              },
            },
            include: [
              {
                model: models.Institucion,
                as: 'institucion',
              },
              {
                model: models.Genero,
                as: 'genero',
              }
            ],
          }
        ].concat(extra_includes),
        order: [
          ['cuenta', 'nombres', 'ASC'],
        ],
        distinct: true
      });
    }
       
    var result = searchFilter(data, textSearch);

    return (result.length <= 8 ? result : result.slice(0, 8));
    
  }
}

export default searchAlumnoQuery;