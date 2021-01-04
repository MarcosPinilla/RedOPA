import {
  GraphQLObjectType,
  GraphQLID
} from 'graphql';

import Usuario from './usuario.type';
import Mensaje from './mensaje.type';

const felicitacionType = new GraphQLObjectType({
  name: 'felicitacion',
  description: 'Datos de una felicitación',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de la felicitación',
        resolve (felicitacion) {
          return felicitacion.id;
        },
      },
      fecha: {
        type: Date,
        description: 'Fecha en que se envió la publicación',
        resolve (felicitacion) {
          return felicitacion.fecha;
        },
      },
      emisor: {
        type: Usuario,
        description: 'Usuario que envió la felicitación',
        resolve (felicitacion) {
          if (felicitacion.hasOwnProperty('emisor')) {
            return felicitacion.emisor;
          };
        },
      },
      receptor: {
        type: Usuario,
        description: 'Usuario que recibió la felicitación',
        resolve (felicitacion) {
          if (felicitacion.hasOwnProperty('receptor')) {
            return felicitacion.receptor;
          };
        },
      },
      mensaje: {
        type: Mensaje,
        description: 'Mensaje usado en la felicitación',
        resolve (felicitacion) {
          if (felicitacion.hasOwnProperty('mensaje')) {
            return felicitacion.mensaje;
          };
        },
      },
    };
  },
});

export default felicitacionType;
