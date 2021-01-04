import { GraphQLID, GraphQLNonNull, GraphQLInt } from 'graphql';
import models from '../../../models';
import { UserInputError, AuthenticationError, ForbiddenError } from 'apollo-server';

const umbralRiesgoQuery = {
  type: GraphQLInt,
  args: {
    institucion_id: {
      type: GraphQLID,
    },
  },
  async resolve(root, { institucion_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso < 2) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    if (me.permiso === 2) {
      let institucion = await models.Institucion.findOne({
        where: {
          id: me.institucion,
        },
      });

      if (institucion === null) {
        throw new UserInputError('No se encontró la institución');
      }
  
      return institucion.umbral_riesgo;
    }

    if (institucion_id === null || institucion_id === '' || institucion_id === 0) {
      throw new UserInputError('Debe proporcionar un id de institución');
    }

    let institucion = await models.Institucion.findOne({
      where: {
        id: institucion_id
      }
    });

    if (institucion === null) {
      throw new UserInputError('No se encontró la institución');
    }

    return institucion.umbral_riesgo;
  }
}

export default umbralRiesgoQuery;