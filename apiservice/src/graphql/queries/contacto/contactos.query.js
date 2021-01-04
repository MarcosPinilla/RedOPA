import { GraphQLList, GraphQLNonNull } from 'graphql';
import models from '../../../models';
import funcionarioType from '../../types/funcionario.type';
import { ForbiddenError, AuthenticationError } from 'apollo-server';

const contactosQuery = {
  type: GraphQLList(GraphQLNonNull(funcionarioType)),
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

    return models.Funcionario.findAll(
      {
        include: [
          {
            model: models.Alumno,
            as: 'contactos',
            where: {
              id: usuario.alumno.id,
            },
          },
          {
            model: models.Usuario,
            as: 'cuenta',
          },
        ],
        order: [
          ['cuenta', 'nombres', 'ASC'],
        ]
      },
    );
  },
};

export default contactosQuery;