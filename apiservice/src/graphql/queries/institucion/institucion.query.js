import { GraphQLID, GraphQLNonNull } from 'graphql';
import institucionType from '../../types/institucion.type';
import models from '../../../models';
import { UserInputError, AuthenticationError } from 'apollo-server';

const institucionQuery = {
  type: GraphQLNonNull(institucionType),
  args: {
    id: {
      type: GraphQLID,
    },
  },
  async resolve(root, { id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    let institucion = await models.Institucion.findOne({
      where: {
        id
      },
      include: [
        {
          model: models.Usuario,
          as: 'usuarios'
        } 
      ] 
    });

    if (institucion === null) {
      throw new UserInputError('No se encontró la institución');
    }

    return institucion;
  }
}

export default institucionQuery;