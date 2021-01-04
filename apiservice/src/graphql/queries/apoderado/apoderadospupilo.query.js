import apoderadoType from '../../types/apoderado.type';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import models from "../../../models";
import { GraphQLNonNull, GraphQLID, GraphQLList } from 'graphql';

const apoderadosPupilo = {
  type: GraphQLList(apoderadoType),
  args: {
    alumno_id: {
      type: GraphQLNonNull(GraphQLID),
    }
  },
  async resolve (root, { alumno_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso <= 1) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    let alumno = await models.Alumno.findOne({
      where: {
        id: alumno_id,
      },
    });

    if (alumno === null) {
      throw new UserInputError('No se encontró el alumno');
    }

    return await models.Apoderado.findAll({
      include: [
        {
          model: models.Usuario,
          as: 'cuenta',
        },
        {
          model: models.Alumno,
          as: 'pupilos',
          where: {
            id: alumno_id,
          },
        },
      ],
    });
  },
};

export default apoderadosPupilo;