import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from 'graphql';

import Emocion from './emocion.type';
import Date from './Date.type';
import Usuario from './usuario.type';
import Alumno from './alumno.type';

const evaluacionType = new GraphQLObjectType({
  name: 'evaluacion',
  description: 'Datos de una evaluación',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de un evaluación',
        resolve (evaluacion) {
          return evaluacion.id;
        },
      },
      fecha: {
        type: Date,
        description: 'Fecha de la evaluación',
        resolve (evaluacion) {
          return evaluacion.fecha;
        },
      },
      nivel: {
        type: GraphQLInt,
        description: 'Nivel de gravedad de la evaluación',
        resolve (evaluacion) {
          return evaluacion.nivel;
        },
      },
      emocion: {
        type: Emocion,
        description: 'Emoción de la evaluación',
        resolve (evaluacion) {
          if (evaluacion.hasOwnProperty('emocion')) {
            return evaluacion.emocion;
          };
        },
      },
      alumno: {
        type: Alumno,
        description: 'Alumno sujeto de evaluación',
        resolve (evaluacion) {
          if (evaluacion.hasOwnProperty('alumno')) {
            return evaluacion.alumno;
          };
        },
      },
      evaluador: {
        type: Usuario,
        description: 'Usuario que realiza la evaluación',
        resolve (evaluacion) {
          if (evaluacion.hasOwnProperty('evaluador')) {
            return evaluacion.evaluador;
          };
        },
      },
    };
  },
});

export default evaluacionType;