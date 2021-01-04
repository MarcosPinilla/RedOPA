import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import Curso from './curso.type';
import Profesor from './profesor.type';

const asignaturaType = new GraphQLObjectType({
  name: 'asignatura',
  description: 'Datos de una asignatura',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de la asignatura',
        resolve (asignatura) {
          return asignatura.id;
        },
      },
      nombre: {
        type: GraphQLString,
        description: 'Nombre de la asignatura',
        resolve (asignatura) {
          return asignatura.nombre;
        },
      },
      descripcion: {
        type: GraphQLString,
        description: 'Descripcion de la asignatura',
        resolve (asignatura) {
          return asignatura.descripcion;
        },
      },
      estado: {
        type: GraphQLInt,
        description: 'Estado de la asignatura',
        resolve (asignatura) {
          return asignatura.estado;
        },
      },
      curso: {
        type: Curso,
        description: 'Curso al que corresponde la asignatura',
        resolve (asignatura) {
          if (asignatura.hasOwnProperty('curso')) {
            return asignatura.curso;
          };
        },
      },
      profesor: {
        type: Profesor,
        description: 'Profesor que imparte la asignatura',
        resolve (asignatura) {
          if (asignatura.hasOwnProperty('profesor')) {
            return asignatura.profesor;
          };
        },
      },
    };
  },
});

export default asignaturaType;
