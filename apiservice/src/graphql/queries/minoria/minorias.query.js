import { GraphQLList, GraphQLNonNull } from 'graphql';
import minoriaType from '../../types/minoria.type';
import models from '../../../models';
import { AuthenticationError } from 'apollo-server';

const minoriasQuery = {
  type: GraphQLList(GraphQLNonNull(minoriaType)),
  args: {},
  resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    return models.Minoria.findAll();
  },
};

export default minoriasQuery;