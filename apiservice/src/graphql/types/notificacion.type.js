import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from "graphql";

import Usuario from './usuario.type';
import Date from './Date.type';

const notificacionType = new GraphQLObjectType({
  name: 'notificacion',
  description: 'Datos de una notificación',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de la notificación',
        resolve (notificacion) {
          return notificacion.id;
        },
      },
      mensaje: {
        type: GraphQLString,
        description: 'Mensaje de la notificación',
        resolve (notificacion) {
          return notificacion.mensaje;
        },
      },
      fecha: {
        type: Date,
        description: 'Fecha de la notificación',
        resolve (notificacion) {
          return notificacion.fecha;
        },
      },
      publicacion: {
        type: Publicacion,
        description: 'Publicacion de la que se origina la notificación',
        resolve (notificacion) {
          if (notificacion.hasOwnProperty('publicacion')) {
            return notificacion.publicacion;
          };
        },
      },
      receptor: {
        type: Usuario,
        description: 'Usuario que recibe la notificación',
        resolve (notificacion) {
          if (notificacion.hasOwnProperty('receptor')) {
            return notificacion.receptor;
          };
        },
      },
    };
  },
});

export default notificacionType;
