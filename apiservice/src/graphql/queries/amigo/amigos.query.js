import { GraphQLList, GraphQLNonNull } from 'graphql';
import { AuthenticationError, ForbiddenError } from 'apollo-server';
import alumnoType from '../../types/alumno.type';
import models from '../../../models';

const amigosQuery = {
  type: GraphQLList(GraphQLNonNull(alumnoType)),
  args: {},
  async resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    var usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario
        },
        include: [
          {
            model: models.Alumno,
            as: 'alumno'
          }
        ]
      }
    );

    if (usuario.alumno === null) {
      throw new ForbiddenError('Not authorized to do this operation');
    };

    const alumno = await models.Alumno.findOne({
      where: {
        id: usuario.alumno.id,
      },
      include: [
        {
          model: models.Alumno,
          as: 'amigos',
          include: [
            {
              model: models.Usuario,
              as: 'cuenta'
            }
          ],
          order: [
            ['cuenta', 'nombres', 'ASC'],
          ]
        }
      ],
    });

    return alumno.amigos;
  },
};

export default amigosQuery;