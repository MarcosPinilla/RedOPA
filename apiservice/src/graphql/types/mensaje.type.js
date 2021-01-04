import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

import Felicitacion from './institucion.type';

const mensajeType = new GraphQLObjectType({
  name: 'mensaje',
  description: 'Datos de un mensaje',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID del mensaje',
        resolve (mensaje) {
          return mensaje.id;
        },
      },
      mensaje: {
        type: GraphQLString,
        description: 'Texto del mensaje',
        resolve (mensaje) {
          return mensaje.mensaje;
        },
      },
      felicitaciones: {
        type: new GraphQLList(Felicitacion),
        description: 'Felicitaciones que usan el mensaje',
        resolve (mensaje) {
          if (mensaje.hasOwnProperty('felicitaciones')) {
            return mensaje.felicitaciones;
          };
        },
      },
    };
  },
});

export default mensajeType;
