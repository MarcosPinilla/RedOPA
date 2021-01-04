import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import funcionarioType from '../../types/funcionario.type';
import models from '../../../models';
import { Sequelize } from 'sequelize';
import { AuthenticationError } from 'apollo-server';
import searchFilter from "../../../utils/search_filter";


const searchFuncionarioQuery = {
  type: GraphQLList(GraphQLNonNull(funcionarioType)),
  args: {
    textSearch: {
        type: GraphQLString,
    },
    institucion_id: {
      type: GraphQLID,
    }
  },
  async resolve (root, { textSearch, institucion_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const Op = Sequelize.Op;

    var data;
    
    if (me.permiso > 2) {
      // Código súper admin
      
      if (institucion_id === undefined || institucion_id < 1) {
        // Todas las instituciones

        data = await models.Funcionario.findAll(
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
          },
        );

      } else {
        // Institución indicada
        
        data = await models.Funcionario.findAll(
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
          },
        );

      }
    } else {
      // código normal
      data = await models.Funcionario.findAll(
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
        },
      );
    }

    let result = searchFilter(data, textSearch);
    return (result.length <= 8 ? result : result.slice(0, 8));
  }
}

export default searchFuncionarioQuery;