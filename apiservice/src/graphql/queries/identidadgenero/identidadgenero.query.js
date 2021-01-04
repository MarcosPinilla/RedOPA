import { GraphQLList } from "graphql";
import identidadGeneroType from '../../types/identidadgenero.type';
import models from '../../../models';
import { AuthenticationError } from 'apollo-server';

const identidadesGeneroQuery = {
  type: GraphQLList(identidadGeneroType),
  args: {},
  resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    return models.IdentidadGenero.findAll();
  },
};

export default identidadesGeneroQuery;