import {
  GraphQLObjectType,
  GraphQLID,
} from 'graphql';

import Interes from './interes.type';
import Alumno from './alumno.type';

const interesAlumnoType = new GraphQLObjectType({
  name: 'interesAlumno',
  description: 'Datos de una relación de interés-alumno',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de la relación de interés-alumno',
        resolve (interesAlumno) {
          return interesAlumno.id;
        },
      },
      interes: {
        type: Interes,
        description: 'Interés de la relación',
        resolve (interesAlumno) {
          if (interesAlumno.hasOwnProperty('interes')) {
            return interesAlumno.interes;
          };
        },
      },
      alumno: {
        type: Alumno,
        description: 'Alumno de la relación',
        resolve (interesAlumno) {
          if (interesAlumno.hasOwnProperty('alumno')) {
            return interesAlumno.alumno;
          };
        },
      },
    };
  },
});

export default interesAlumnoType;
