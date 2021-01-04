import { GraphQLInt } from 'graphql';
import publicacionPaginationType from '../../types/publicacionpagination.type';
import models from '../../../models';
import { AuthenticationError } from 'apollo-server';

const publicacionesQuery = {
  type: publicacionPaginationType,
  args: {
    offset: {
      type: GraphQLInt,
    },
    limit: {
      type: GraphQLInt,
    }
  },
  async resolve (root, { offset, limit }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario,
        },
        include: [
          {
            model: models.Institucion,
            as: 'institucion',
          },
        ],
      },
    );

    var data;
    data = await models.Publicacion.findAndCountAll({
      where: {
        visibilidad: 1,
      },
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
                id: usuario.institucion.id,
              },
              required: true,
            }]
          }],
        },
      ],
      distinct: true,
      offset,
      limit
    });
    
    return getPagingData(data);
  },
};

const getPagingData = (data) => {
  const { count: totalItems, rows: items } = data;
  return { totalItems, items: items };
};

export default publicacionesQuery;