import { GraphQLList, GraphQLInt } from "graphql";
import apoderadoType from "../../types/apoderado.type";
import models from '../../../models';
import { AuthenticationError } from 'apollo-server';

const apoderadosAdminQuery = {
  type: GraphQLList(apoderadoType),
  args: {
    offset: {
      type: GraphQLInt,
    },
    limit: {
      type: GraphQLInt,
    }
  },
  resolve (root, args, me) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso <= 2) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    return models.Apoderado.findAll({
      include: [
        {
          model: models.Usuario,
          as: 'cuenta',
        },
        {
          model: models.Alumno,
          as: 'pupilos'
        },
      ],
      order: [
        ['cuenta', 'nombres', 'ASC'],
      ],
      offset,
      limit,
    });
  }
}

export default apoderadosAdminQuery;