import { GraphQLList, GraphQLNonNull } from 'graphql';
import contactoExternoType from '../../types/contactoexterno.type';
import models from '../../../models';
import { ForbiddenError, AuthenticationError } from 'apollo-server';

const contactosExternosQuery = {
  type: GraphQLList(GraphQLNonNull(contactoExternoType)),
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
        ],
      },
    );

    if (usuario.alumno === null) {
      throw new ForbiddenError('Not authorized to do this operation');
    };

    return models.ContactoExterno.findAll(
      {
        include: [{
          model: models.Alumno,
          as: 'alumno',
          where: {
            id: usuario.alumno.id,
          }
        }],
      },
    );
  },
};

export default contactosExternosQuery;
