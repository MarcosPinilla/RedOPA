import { GraphQLID, GraphQLInt } from 'graphql';
import { AuthenticationError } from 'apollo-server';
import models from "../../../models";
import { Sequelize } from 'sequelize';
import alumnopaginationType from './../../types/alumnopagination.type';

const alumnosQuery = {
  type: alumnopaginationType,
  args: {
    institucion_id: {
      type: GraphQLID,
    },
    course_id: {
      type: GraphQLID,
    },
    offset: {
      type: GraphQLInt,
    },
    limit: {
      type: GraphQLInt,
    }
  },
  async resolve (root, { institucion_id, course_id, offset, limit }, { me }) {
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
        data = await models.Alumno.findAndCountAll({
          include: [
            {
              model: models.Usuario,
              as: 'cuenta',
              where: {
                id: {
                  [Op.ne]: me.usuario,
                },
              }
            },
          ].concat(extra_includes),
          order: [
            ['cuenta', 'nombres', 'ASC'],
          ],
          distinct: true,
          offset,
          limit,
        });
      } else {
        // Código admin
        data = await models.Alumno.findAndCountAll({
          include: [
            {
              model: models.Usuario,
              as: 'cuenta',
              where: {
                institucion_id: institucion_id,
                id: {
                  [Op.ne]: me.usuario,
                },
              }
            }
          ].concat(extra_includes),
          order: [
            ['cuenta', 'nombres', 'ASC'],
          ],
          distinct: true,
          offset,
          limit,
        });
      }
    } else {
      data = await models.Alumno.findAndCountAll({
        include: [
          {
            model: models.Usuario,
            as: 'cuenta',
            where: {
              institucion_id: me.institucion,
              id: {
                [Op.ne]: me.usuario,
              },
            }
          }
        ].concat(extra_includes),
        order: [
          ['cuenta', 'nombres', 'ASC'],
        ],
        distinct: true,
        offset,
        limit,
      });
    }
 
    return getPagingData(data);
  }
}

const getPagingData = (data) => {
  const { count: totalItems, rows: items } = data;
  return { totalItems, items };
};

export default alumnosQuery;