import { GraphQLID, GraphQLList, GraphQLBoolean } from 'graphql';
import interesAlumnoType from '../../types/interesalumno.type';
import models from '../../../models';
import { ForbiddenError, UserInputError, AuthenticationError } from 'apollo-server';

const createInteresAlumnoLista = {
  type: GraphQLBoolean,
  args: {
    interesesIds: {
      type: GraphQLList(GraphQLID),
    },
  },
  async resolve (source, { interesesIds }, { me }) {
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

    for (let i = 0; i < interesesIds.length; i++) {
      let interes = await models.Interes.findOne(
        {
          include: [
            {
              model: models.CategoriaInteres,
              as: 'categoria',
              where: {
                institucion_id: me.institucion,
              }
            }
          ],
          where: {
            id: interesesIds[i],
          },
        }
      );

      if (interes === null) {
        throw new UserInputError('Debe elegir un interés válido y de la misma institución');
      };

      const interesAlumno = await models.InteresAlumno.findOne(
        {
          where: {
            alumno_id: usuario.alumno.id,
            interes_id: interes.id,
          },
        },
      );

      if (interesAlumno !== null) {
        throw new Error('Interés de alumno ya definido');
      };

      await models.InteresAlumno.create({
        alumno_id: usuario.alumno.id,
        interes_id: interes.id,
      });
    }

    return true;
  },
};

export default createInteresAlumnoLista;