import alumnoType from "../../types/alumno.type";
import models from "../../../models";
import { GraphQLList, GraphQLNonNull } from "graphql";
import { ForbiddenError, AuthenticationError } from 'apollo-server';

const pupilos = {
  type: GraphQLList(alumnoType),
  args: {},
  async resolve (source, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario
        },
        include: [
          {
            model: models.Apoderado,
            as: 'apoderado',
          },
        ],
      },
    );

    if (usuario.apoderado === null) {
      throw new ForbiddenError('El usuario no es de tipo apoderado');
    }

    return models.Alumno.findAll(
      {
        include: [
          {
            model: models.Apoderado,
            as: 'apoderados',
            where: {
              id: usuario.apoderado.id
            },
          },
          {
            model: models.Usuario,
            as: 'cuenta',
          },
        ],
      }
    )
  },
};

export default pupilos;