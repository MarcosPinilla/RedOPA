import { GraphQLList, GraphQLNonNull } from "graphql";
import { AuthenticationError, ForbiddenError } from 'apollo-server';
import evaluacionType from "../../types/evaluacion.type";
import models from "../../../models";

const historialApoderado = {
  type: GraphQLList(GraphQLNonNull(evaluacionType)),
  args: {},
  async resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    let usuario = await models.Usuario.findOne(
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

    return models.Evaluacion.findAll({
      where: {
        evaluador_id: usuario.id,
      },
      include: [
        {
          model: models.Emocion,
          as: 'emocion',
        },
        {
          model: models.Usuario,
          as: 'evaluador',
        },
        {
          model: models.Alumno,
          as: 'alumno',
        },
      ],
    });
  }
}

export default historialApoderado;