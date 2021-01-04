import { GraphQLID, GraphQLInt } from 'graphql';
import models from '../../../models';
import { Sequelize } from 'sequelize';
import { AuthenticationError } from 'apollo-server';

import funcionarioPaginacionType from '../../types/funcionariopagination.type';

const funcionariosQuery = {
  type: funcionarioPaginacionType,
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

    const Op = Sequelize.Op;

    var data;
    
    if (me.permiso > 2) {
      // Código súper admin
      
      if (institucion_id === undefined || institucion_id < 1) {
        // Todas las instituciones

        data = await models.Funcionario.findAndCountAll(
          {
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
                    model: models.Permiso,
                    as: 'permiso',
                  }
                ],
              },
            ],
            order: [
              ['cuenta', 'nombres', 'ASC'],
            ],
            distinct: true,
            offset,
            limit,
          },
        );

      } else {
        // Institución indicada
        
        data = await models.Funcionario.findAndCountAll(
          {
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
                    model: models.Permiso,
                    as: 'permiso',
                  }
                ],
              },
            ],
            order: [
              ['cuenta', 'nombres', 'ASC'],
            ],
            distinct: true,
            offset,
            limit,
          },
        );

      }
    } else {
      // código normal
      data = await models.Funcionario.findAndCountAll(
        {
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
                  model: models.Permiso,
                  as: 'permiso',
                }
              ],
            },
          ],
          order: [
            ['cuenta', 'nombres', 'ASC'],
          ],
          distinct: true,
          offset,
          limit,
        },
      );
    }
    
    return getPagingData(data);
  }
}

const getPagingData = (data) => {
  const { count: totalItems, rows: items } = data;
  return { totalItems, items };
};

export default funcionariosQuery;