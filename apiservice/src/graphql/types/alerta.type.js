import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} from 'graphql';

import Alumno from './alumno.type';
import Usuario from './usuario.type';
import Date from './Date.type';

const alertaType = new GraphQLObjectType({
  name: 'alerta',
  description: 'Datos de una alerta',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de la alerta',
        resolve (alerta) {
          return alerta.id;
        },
      },
      fecha: {
        type: Date,
        description: 'Fecha de una alerta',
        resolve (alerta) {
          return alerta.fecha;
        },
      },
      mensaje: {
        type: GraphQLString,
        description: 'Mensaje de una alerta',
        resolve (alerta) {
          return alerta.mensaje;
        },
      },
      tipo: {
        type: GraphQLInt,
        description: 'Tipo de alerta',
        resolve (alerta) {
          return alerta.tipo;
        },
      },
      leida: {
        type: GraphQLInt,
        description: 'Estadp de lectura de la alerta',
        resolve (alerta) {
          return alerta.leida;
        },
      },
      alumno: {
        type: Alumno,
        description: 'Alumno que envió la alerta',
        resolve (alerta) {
          if (alerta.hasOwnProperty('alumno')) {
            return alerta.alumno;
          };
        },
      },
      receptor: {
        type: Usuario,
        description: 'Usuario receptor de la alerta',
        resolve (alerta) {
          if (alerta.hasOwnProperty('receptor')) {
            return alerta.receptor;
          };
        },
      },
    };
  },
});

export default alertaType;
