import { GraphQLList, GraphQLNonNull } from 'graphql';
import interesType from '../../types/interes.type';
import models from '../../../models';
import { AuthenticationError, ForbiddenError } from 'apollo-server';

const interesesQuery = {
  type: GraphQLList(GraphQLNonNull(interesType)),
  args: {},
  async resolve (root, args, { me }) {
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

    if (usuario.institucion === null) {
      throw new ForbiddenError('Not authorized to do this operation');
    };
    
    return models.Interes.findAll({
      include: [{
        model: models.CategoriaInteres,
        as: 'categoria',
        include: [{
          model: models.Institucion,
          as: 'institucion',
          where: {
            id: usuario.institucion.id, 
          },
        }],
      }],
      where: {
        '$categoria.institucion_id$': usuario.institucion.id
      }
    });
  },
};

export default interesesQuery;