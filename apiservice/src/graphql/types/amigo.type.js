import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt
} from 'graphql';

import Alumno from './alumno.type';

const amigoType = new GraphQLObjectType({
  name: 'amigo',
  description: 'Datos de relación de amistad',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de la amistad',
        resolve (amigo) {
          return amigo.id;
        },
      },
      estado: {
        type: GraphQLInt,
        description: 'Estado de la amistad',
        resolve (amigo) {
          return amigo.estado;
        },
      },
      alumno: {
        type: Alumno,
        description: 'Alumno que registra la amistad',
        resolve (amigo) {
          if (amigo.hasOwnProperty('alumno')) {
            return amigo.alumno;
          };
        },
      },
      amigo: {
        type: Alumno,
        description: 'Alumno que es señalado como amigo',
        resolve (amigo) {
          if (amigo.hasOwnProperty('amigo')) {
            return amigo.amigo;
          };
        },
      },
    };
  },
});

export default amigoType;
