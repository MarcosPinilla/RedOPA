import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import models from '../../../models';
import funcionarioType from '../../types/funcionario.type';
import { Sequelize } from 'sequelize';
import { ForbiddenError, AuthenticationError } from 'apollo-server';
import searchFilter from "../../../utils/search_filter";

const searchNoContactosQuery = {
  type: GraphQLList(GraphQLNonNull(funcionarioType)),
  args: {
    textSearch: {
        type: GraphQLString,
    }
  },
  async resolve (root, { textSearch }, { me }) {
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

    var data = await models.Funcionario.findAll(
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
        distinct: true
      },
    );

    let result = searchFilter(data, textSearch);

    return (result.length <= 8 ? result : result.slice(0, 8));
  }
};

export default searchNoContactosQuery;