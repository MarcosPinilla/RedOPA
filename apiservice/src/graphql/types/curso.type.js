import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Asignatura from './asignatura.type';
import Alumno from './alumno.type';
import Institucion from './institucion.type';

const cursoType = new GraphQLObjectType({
  name: 'curso',
  description: 'Datos de un curso',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID del curso',
        resolve (curso) {
          return curso.id;
        },
      },
      nivel: {
        type: GraphQLInt,
        description: 'Nivel del curso',
        resolve (curso) {
          return curso.nivel;
        },
      },
      letra: {
        type: GraphQLString,
        description: 'Letra del curso',
        resolve (curso) {
          return curso.letra;
        },
      },
      etapa: {
        type: GraphQLString,
        description: 'Etapa del curso (Media = 2, básica = 1)',
        resolve (curso) {
          return curso.etapa;
        },
      },
      institucion: {
        type: Institucion,
        description: 'Institución a la que pertenece el curso',
        resolve (curso) {
          if (curso.hasOwnProperty('institucion')) {
            return curso.institucion;
          }
        },
      },
      asignaturas: {
        type: new GraphQLList(Asignatura),
        description: 'Asignaturas que da el curso',
        resolve (curso) {
          if (curso.hasOwnProperty('asignaturas')) {
            return curso.asignaturas;
          };
        },
      },
      alumnos: {
        type: new GraphQLList(Alumno),
        description: 'Alumnos que componen el curso',
        resolve (curso) {
          if (curso.hasOwnProperty('alumnos')) {
            return curso.alumnos;
          };
        },
      },
    };
  },
});

export default cursoType;
