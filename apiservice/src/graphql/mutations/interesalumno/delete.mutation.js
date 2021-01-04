import { GraphQLID, GraphQLBoolean } from 'graphql';
import models from '../../../models';
import { ForbiddenError, UserInputError, AuthenticationError } from 'apollo-server';

const deleteInteresAlumno = {
  type: GraphQLBoolean,
  args: {
    interes_id: {
      type: GraphQLID,
    },
  },
  async resolve (source, { interes_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const usuario = await models.Usuario.findOne(
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

    const interes = await models.Interes.findOne(
      {
        where: {
          id: interes_id,
        },
      }
    );

    if (interes === null) {
      throw new UserInputError('Debe elegir un interés válido');
    };

    const interesAlumno = await models.InteresAlumno.findOne(
      {
        where: {
          alumno_id: usuario.alumno.id,
          interes_id: interes.id,
        },
      },
    );

    if (interesAlumno === null) {
      throw new Error('Interés no vinculado a alumno');
    };

    return models.InteresAlumno.destroy({
      where: {
        alumno_id: usuario.alumno.id,
        interes_id: interes.id,
      }
    });
  },
};

export default deleteInteresAlumno;