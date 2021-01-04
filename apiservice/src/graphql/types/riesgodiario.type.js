import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
} from 'graphql';

import Alumno from './alumno.type';
import Date from './Date.type';

const riesgoDiarioType = new GraphQLObjectType({
  name: 'riesgoDiario',
  description: 'Registro diario del nivel de riesgo suicida de un alumno',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de un registro de riesgo',
        resolve (riesgoDiario) {
          return riesgoDiario.id;
        },
      },
      fecha: {
        type: Date,
        description: 'Fecha del registro',
        resolve (riesgoDiario) {
          return riesgoDiario.fecha;
        },
      },
      riesgo: {
        type: GraphQLInt,
        description: 'Nivel de riesgo suicida',
        resolve (riesgoDiario) {
          return riesgoDiario.riesgo;
        },
      },
      alumno: {
        type: Alumno,
        description: 'Alumno al que corresponde el registro',
        resolve (riesgoDiario) {
          if (riesgoDiario.hasOwnProperty('alumno')) {
            return riesgoDiario.alumno;
          };
        },
      },
    };
  },
});

export default riesgoDiarioType;