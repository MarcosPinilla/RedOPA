import { GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';
import funcionarioType from '../../types/funcionario.type';
import models from '../../../models';
import { AuthenticationError, ForbiddenError } from 'apollo-server';

const funcionariosAdminQuery = {
  type: GraphQLList(GraphQLNonNull(funcionarioType)),
  args: {
    offset: {
      type: GraphQLInt,
    },
    limit: {
      type: GraphQLInt,
    }
  },
  resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso <= 2) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    return models.Funcionario.findAll(
      {
        include: [
          {
            model: models.Usuario,
            as: 'cuenta',
            include: [
              {
                model: models.Institucion,
                as: 'institucion',
              },
            ],
          },
        ],
        order: [
          ['cuenta', 'nombres', 'ASC'],
        ],
        offset,
        limit,
      },
    );
  }
}

export default funcionariosAdminQuery;