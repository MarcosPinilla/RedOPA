import { GraphQLID } from 'graphql';
import interesAlumnoType from '../../types/interesalumno.type';
import models from '../../../models';
import { ForbiddenError, UserInputError, AuthenticationError } from 'apollo-server';

const createInteresAlumno = {
  type: interesAlumnoType,
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

    let numeroIntereses = await models.InteresAlumno.count({
      where: {
        alumno_id: usuario.alumno.id,
        deletedAt: null,
      }
    });

    if (numeroIntereses >= 5) {
      throw new UserInputError('No se pueden agregar más intereses');
    }

    const interes = await models.Interes.findOne(
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
          id: interes_id,
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

    return models.InteresAlumno.create({
      alumno_id: usuario.alumno.id,
      interes_id: interes.id,
    });
  },
};

export default createInteresAlumno;