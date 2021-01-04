import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import publicacionType from '../../types/publicacion.type';
import models from '../../../models';
import { AuthenticationError } from 'apollo-server';

const publicacionesInteresQuery = {
  type: GraphQLList(GraphQLNonNull(publicacionType)),
  args: {
    interes_id: {
      type: GraphQLID,
    },
  },
  resolve (root, { interes_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario,
        },
        include: [
          {
            model: models.Institucion,
            as: 'institucion',
          },
        ],
      },
    );

    return models.Publicacion.findAll({
      where: {
        interes_id: interes_id,
        visibilidad: 1,
      },
      include: [
        {
          model: models.Interes,
          as: 'interes',
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
    });
  },
};

export default publicacionesInteresQuery;