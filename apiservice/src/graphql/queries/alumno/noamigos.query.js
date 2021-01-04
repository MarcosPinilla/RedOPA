import { GraphQLNonNull, GraphQLList, GraphQLInt } from 'graphql';
import { ForbiddenError, AuthenticationError } from 'apollo-server';
import noAmigoPaginationType from '../../types/noamigospagination.type';
import models from '../../../models';
import { Sequelize } from 'sequelize';

const noAmigosQuery = {
  type: noAmigoPaginationType,
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
            model: models.Alumno,
            as: 'alumno',
            include: [
              {
                model: models.Alumno,
                as: 'amigos',
              }
            ],
          },
        ],
      },
    );

    if (usuario.alumno === null) {
      throw new ForbiddenError('Not authorized to do this operation');
    };

    var idsAmigos = [];

    usuario.alumno.amigos.forEach(amigo => {
      idsAmigos.push(amigo.id);
    });

    const Op = Sequelize.Op;

    var data = await models.Alumno.findAndCountAll({
      where: {
        id: {
          [Op.notIn]: idsAmigos,
        },
      },
      include: [
        {
          model: models.Usuario,
          as: 'cuenta',
          where: {
            institucion_id: me.institucion,
            id: {
              [Op.ne]: usuario.id,
            },
          }
        },
      ],
      order: [
        ['cuenta', 'nombres', 'ASC'],
      ],
      distinct: true,
      offset,
      limit
    });

    return getPagingData(data);
  }
}

const getPagingData = (data) => {
  const { count: totalItems, rows: items } = data;
  return { totalItems, items };
};

export default noAmigosQuery;