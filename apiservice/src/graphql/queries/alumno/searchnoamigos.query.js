import { GraphQLNonNull, GraphQLList, GraphQLString } from 'graphql';
import { ForbiddenError, AuthenticationError } from 'apollo-server';
import alumnoType from '../../types/alumno.type';
import models from '../../../models';
import { Sequelize } from 'sequelize';
import searchFilter from "../../../utils/search_filter";

const searchNoAmigosQuery = {
  type: GraphQLList(GraphQLNonNull(alumnoType)),
  args: {
    textSearch: {
      type: GraphQLString,
    },
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

    const data = await models.Alumno.findAll({
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
        }
      ],
      order: [
        ['cuenta', 'nombres', 'ASC'],
      ]
    });

    
    var result = searchFilter(data, textSearch);
    
    return (result.length <= 8 ? result : result.slice(0, 8));
    
  }
}



export default searchNoAmigosQuery;