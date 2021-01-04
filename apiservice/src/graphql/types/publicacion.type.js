import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from 'graphql';

import Usuario from './usuario.type';
import Interes from './interes.type';
import Funcionario from './funcionario.type';
import Date from './Date.type';

const publicacionType = new GraphQLObjectType({
  name: 'publicacion',
  description: 'Datos de una publicación',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de la publicación',
        resolve (publicacion) {
          return publicacion.id;
        },
      },
      titulo: {
        type: GraphQLString,
        description: 'Título de la publicación',
        resolve (publicacion) {
          return publicacion.titulo;
        },
      },
      contenido: {
        type: GraphQLString,
        description: 'Contenido de la publicación',
        resolve (publicacion) {
          return publicacion.contenido;
        },
      },
      fecha: {
        type: Date,
        description: 'Fecha del evento de la publicación',
        resolve (publicacion) {
          return publicacion.fecha;
        },
      },
      fotoUrl: {
        type: GraphQLString,
        description: 'URL de la foto de la publicación en el servidor',
        resolve (publicacion) {
          return process.env.PROTOCOL + '://' + process.env.IP + ':' + process.env.PORT + publicacion.foto_url;
        },
      },
      visibilidad: {
        type: GraphQLInt,
        description: 'Visibilidad de la publicación',
        resolve (publicacion) {
          return publicacion.visibilidad;
        },
      },
      autor: {
        type: Funcionario,
        descripcion: 'Autor de la publicación',
        resolve (publicacion) {
          if (publicacion.hasOwnProperty('autor')) {
            return publicacion.autor;
          };
        },
      },
      interes: {
        type: Interes,
        descripcion: 'Interés asociado a la publicación',
        resolve (publicacion) {
          if (publicacion.hasOwnProperty('interes')) {
            return publicacion.interes;
          };
        },
      },
      lectores: {
        type: new GraphQLList(Usuario),
        descripcion: 'Usuarios que recibirán una notificación de la publicación',
        resolve (publicacion) {
          if (publicacion.hasOwnProperty('lectores')) {
            return publicacion.lectores;
          };
        },
      },
    };
  },
});

export default publicacionType;