import { GraphQLList, GraphQLNonNull } from 'graphql';
import interesType from '../../types/interes.type';
import models from '../../../models';
import { ForbiddenError, AuthenticationError } from 'apollo-server';

const interesesAlumnoQuery = {
  type: GraphQLList(GraphQLNonNull(interesType)),
  args: {},
  async resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario,
        },
        include: [
          {
            model: models.Alumno,
            as: 'alumno',
          },
          {
            model: models.Institucion,
            as: 'institucion',
          },
        ],
      },
    );

    if (usuario.alumno === null) {
      throw new ForbiddenError('Not authorized to do this operation');
    };
    
    return models.Interes.findAll({
      include: [
        {
          model: models.CategoriaInteres,
          as: 'categoria',
          include: [{
            model: models.Institucion,
            as: 'institucion',
            where: {
              id: usuario.institucion.id, 
            },
          }],
        },
        {
          model: models.Alumno,
          as: 'alumnos',
          where: {
            id: usuario.alumno.id,
          },
        },
      ],
      where: {
        '$categoria.institucion_id$': usuario.institucion.id
      }
    });
  },
};

export default interesesAlumnoQuery;