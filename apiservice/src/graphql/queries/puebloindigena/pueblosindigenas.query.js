import { GraphQLList } from "graphql";
import puebloIndigenaType from '../../types/puebloindigena.type';
import models from '../../../models';
import { AuthenticationError } from 'apollo-server';

const pueblosIndigenasQuery = {
  type: GraphQLList(puebloIndigenaType),
  args: {},
  resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    return models.PuebloIndigena.findAll();
  },
};

export default pueblosIndigenasQuery;