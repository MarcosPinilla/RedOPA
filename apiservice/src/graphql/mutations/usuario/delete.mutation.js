import { GraphQLNonNull, GraphQLID, GraphQLBoolean } from 'graphql';
import { AuthenticationError } from 'apollo-server';
import models from '../../../models';

const deleteUsuarioMutation = {
  type: new GraphQLNonNull(GraphQLBoolean),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },

  async resolve (source, { id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    return await models.Usuario.destroy({
      where: { id },
    });
  },
};

export default deleteUsuarioMutation;