import { GraphQLNonNull, GraphQLID, GraphQLList, GraphQLString } from "graphql";
import models from '../../../models';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import { Sequelize } from 'sequelize';
import apoderadoType from "../../types/apoderado.type";
import searchFilter from "../../../utils/search_filter";

const searchApoderadosInstitucionQuery = {
  type: GraphQLList(GraphQLNonNull(apoderadoType)),
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

    const Op = Sequelize.Op
    
    if (me.permiso < 2) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    var data;

    if (me.permiso > 2) {
      // Código súper admin

      if (institucion_id === undefined || institucion_id < 1) {
        // Todas las instituciones

        data = await models.Apoderado.findAll({
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
        });
      } else {
        // Institución indicada

        data = await models.Apoderado.findAll({
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
          distinct: true
        });
      }
    } else {
      // Código admin

      data = await models.Apoderado.findAll({
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
        distinct: true
      });
    }

    let result = searchFilter(data, textSearch);

    return (result.length <= 8 ? result : result.slice(0, 8));
  },
}


export default searchApoderadosInstitucionQuery;