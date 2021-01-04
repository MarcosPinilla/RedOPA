import { GraphQLInt } from 'graphql';
import models from '../../../models';
import funcionariopaginationType from '../../types/nocontactospagination.type';
import { Sequelize } from 'sequelize';
import { ForbiddenError, AuthenticationError } from 'apollo-server';

const contactosQuery = {
  type: funcionariopaginationType,
  args: {
    offset: {
      type: GraphQLInt,
    },
    limit: {
      type: GraphQLInt,
    }
  },
  async resolve (root, { limit, offset }, { me }) {
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
                model: models.Funcionario,
                as: 'contactos',
              },
            ],
          },
        ],
      },
    );

    if (usuario.alumno === null) {
      throw new ForbiddenError('Not authorized to do this operation');
    };

    var idsContactos = [];

    usuario.alumno.contactos.forEach(contacto => {
      idsContactos.push(contacto.id);
    });

    const Op = Sequelize.Op;

    var data = await models.Funcionario.findAndCountAll(
      {
        where: {
          id: {
            [Op.notIn]: idsContactos,
          },
        },
        include: [
          {
            model: models.Usuario,
            as: 'cuenta',
            where: {
              institucion_id: usuario.institucion_id,
              id: {
                [Op.ne]: usuario.id,
              },
            },
            include: [
              {
                model: models.Institucion,
                as: 'institucion',
              }
            ]
          },
        ],
        order: [
          ['cuenta', 'nombres', 'ASC'],
        ],
        distinct: true,
        offset,
        limit
      },
    );

    return getPagingData(data);
  }
};

const getPagingData = (data) => {
  const { count: totalItems, rows: items } = data;
  return { totalItems, items };
};

export default contactosQuery;