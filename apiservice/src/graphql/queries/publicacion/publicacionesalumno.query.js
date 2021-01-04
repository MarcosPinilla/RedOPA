import { GraphQLInt } from 'graphql';
import models from '../../../models';
import { ForbiddenError, AuthenticationError } from 'apollo-server';
import publicacionPaginationType from '../../types/publicacionpagination.type';

const publicacionesAlumnosQuery = {
  type: publicacionPaginationType,
  args: {
    offset: {
      type: GraphQLInt,
    },
    limit: {
      type: GraphQLInt,
    }
  },
  async resolve (root, { offset, limit }, { me }) {
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

    const interesesAlumno = await models.Interes.findAll({
      include: [
        {
          model: models.Alumno,
          as: 'alumnos',
          where: {
            id: usuario.alumno.id,
          },
        },
      ],
    });

    var idsIntereses = [];

    interesesAlumno.forEach(interes => {
      idsIntereses.push(interes.id);
    });

    var data = await models.Publicacion.findAndCountAll({
      where: {
        visibilidad: 1,
      },
      include: [
        {
          model: models.Interes,
          as: 'interes',
          where: {
            id: idsIntereses,
          },
          include: [{
            model: models.CategoriaInteres,
            as: 'categoria',
            include: [{
              model: models.Institucion,
              as: 'institucion',
              where: {
                id: usuario.institucion.id,
              }
            }]
          }],
        },
      ],
      distinct: true,
      offset,
      limit
    });

    return getPagingData(data); 
  },
};

const getPagingData = (data) => {
  const { count: totalItems, rows: items } = data;
  return { totalItems, items };
};

export default publicacionesAlumnosQuery;