import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import publicacionType from '../../types/publicacion.type';
import models from '../../../models';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import { Sequelize } from 'sequelize';

const publicacionesAdminQuery = {
  type: GraphQLList(GraphQLNonNull(publicacionType)),
  args: {
    institucion_id: {
      type: GraphQLID,
    },
  },
  resolve (root, { institucion_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const Op = Sequelize.Op
    
    if (me.permiso <= 1) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    if (me.permiso > 2) {
      // Código súper admin

      if (institucion_id === undefined || institucion_id < 1) {
        // Todas las instituciones

        return models.Publicacion.findAll({
          include: [
            {
              model: models.Interes,
              as: 'interes',
              required: true,
              include: [{
                model: models.CategoriaInteres,
                as: 'categoria',
                required: true,
                include: [{
                  model: models.Institucion,
                  as: 'institucion',
                  required: true,
                }]
              }],
            },
          ],
        });
      } else {
        // Institución indicada

        return models.Publicacion.findAll({
          include: [
            {
              model: models.Interes,
              as: 'interes',
              required: true,
              include: [{
                model: models.CategoriaInteres,
                as: 'categoria',
                required: true,
                include: [{
                  model: models.Institucion,
                  as: 'institucion',
                  where: {
                    id: institucion_id,
                  },
                  required: true,
                }]
              }],
            },
          ],
        });
      }
    } else {
      // Código admin

      return models.Publicacion.findAll({
        include: [
          {
            model: models.Interes,
            as: 'interes',
            required: true,
            include: [{
              model: models.CategoriaInteres,
              as: 'categoria',
              required: true,
              include: [{
                model: models.Institucion,
                as: 'institucion',
                where: {
                  id: me.institucion,
                },
                required: true,
              }]
            }],
          },
        ],
      });
    }
  },
};

export default publicacionesAdminQuery;