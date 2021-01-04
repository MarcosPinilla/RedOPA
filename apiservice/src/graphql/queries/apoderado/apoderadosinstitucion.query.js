import { GraphQLList, GraphQLID, GraphQLInt } from "graphql";
import models from '../../../models';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import { Sequelize } from 'sequelize';
import apoderadopaginationType from "../../types/apoderadopagination.type";

const apoderadosInstitucionQuery = {
  type: apoderadopaginationType, 
  args: {
    institucion_id: {
      type: GraphQLID,
    },
    offset: {
      type: GraphQLInt,
    },
    limit: {
      type: GraphQLInt,
    }
  },
  async resolve (root, { institucion_id, offset, limit }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const Op = Sequelize.Op
    
    if (me.permiso < 2) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    var data;

    if (me.permiso > 2) {
      // Código súper admin

      if (institucion_id === undefined || institucion_id < 1) {
        // Todas las instituciones

        data = await models.Apoderado.findAndCountAll({
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
              ],
              required: true,
            },
          ],
          order: [
            ['cuenta', 'nombres', 'ASC'],
          ],
          distinct: true,
          offset,
          limit,
        });
      } else {
        // Institución indicada

        data = await models.Apoderado.findAndCountAll({
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
              ],
              required: true,
            },
          ],
          order: [
            ['cuenta', 'nombres', 'ASC'],
          ],
          distinct: true,
          offset,
          limit,
        });
      }
    } else {
      // Código admin

      data = await models.Apoderado.findAndCountAll({
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
            ],
            required: true,
          },
        ],
        order: [
          ['cuenta', 'nombres', 'ASC'],
        ],
        distinct: true,
        offset,
        limit,
      });
    }
    
    return getPagingData(data);
  },
}

const getPagingData = (data) => {
  const { count: totalItems, rows: items } = data;
  return { totalItems, items };
};

export default apoderadosInstitucionQuery;