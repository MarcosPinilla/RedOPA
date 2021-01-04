import { GraphQLList, GraphQLNonNull } from 'graphql';
import institucionType from '../../types/institucion.type';
import models from '../../../models';
import { AuthenticationError } from 'apollo-server';

const institucionesQuery = {
  type: GraphQLList(GraphQLNonNull(institucionType)),
  args: {},
  resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    return models.Institucion.findAll({
      include: [
        {
          model: models.Usuario,
          as: 'usuarios',
        }
      ]
    });
  },
};

export default institucionesQuery;