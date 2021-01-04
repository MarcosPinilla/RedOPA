import { GraphQLNonNull, GraphQLList, GraphQLInt } from 'graphql';
import { AuthenticationError, ForbiddenError } from 'apollo-server';
import alumnoType from "../../types/alumno.type";
import models from "../../../models";

const alumnosAdminQuery = {
  type: GraphQLList(GraphQLNonNull(alumnoType)),
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

    return models.Alumno.findAll({
      include: [
        {
          model: models.Usuario,
          as: 'cuenta',
        },
        {
          model: models.Curso,
          as: 'curso'
        },
        {
          model: models.Minoria,
          as: 'minoria'
        },
        {
          model: models.Foto,
          as: 'fotos'
        },
        {
          model: models.ContactoExterno,
          as: 'contactosExternos'
        },
        {
          model: models.Funcionario,
          as: 'contactos',
        },
        {
          model: models.Apoderado,
          as: 'apoderados'
        },
        {
          model: models.Interes,
          as: 'intereses'
        },
        {
          model: models.Alumno,
          as: 'amigos'
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

export default alumnosAdminQuery;