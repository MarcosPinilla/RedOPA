import { GraphQLList } from "graphql";
import orientacionSexualType from '../../types/orientacionsexual.type';
import models from '../../../models';
import { AuthenticationError } from 'apollo-server';

const orientacionesSexualesQuery = {
  type: GraphQLList(orientacionSexualType),
  args: {},
  resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    return models.OrientacionSexual.findAll();
  },
};

export default orientacionesSexualesQuery;