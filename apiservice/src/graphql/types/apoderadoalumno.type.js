import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from 'graphql';

import Apoderado from './apoderado.type';
import Alumno from './alumno.type';

const apoderadoAlumnoType = new GraphQLObjectType({
  name: 'apoderadoAlumno',
  description: 'Datos de una relación de apoderado-alumno',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de la relación de apoderado-alumno',
        resolve (apoderadoAlumno) {
          return apoderadoAlumno.id;
        },
      },
      parentesco: {
        type: GraphQLString,
        description: 'Parentesco entre el apoderado y el alumno',
        resolve (apoderadoAlumno) {
          return apoderadoAlumno.parentesco;
        },
      },
      apoderado: {
        type: Apoderado,
        description: 'Apoderado de la relación',
        resolve (apoderadoAlumno) {
          if (apoderadoAlumno.hasOwnProperty('apoderado')) {
            return apoderadoAlumno.apoderado;
          };
        },
      },
      alumno: {
        type: Alumno,
        description: 'Alumno de la relación',
        resolve (apoderadoAlumno) {
          if (apoderadoAlumno.hasOwnProperty('alumno')) {
            return apoderadoAlumno.alumno;
          };
        },
      },
    };
  },
});

export default apoderadoAlumnoType;
