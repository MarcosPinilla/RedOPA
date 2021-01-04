import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

import Publicacion from './publicacion.type';
import Alumno from './alumno.type';
import CategoriaInteres from './categoriainteres.type';

const interesType = new GraphQLObjectType({
  name: 'interes',
  description: 'Datos de un interés',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID del interés',
        resolve (interes) {
          return interes.id;
        },
      },
      nombre: {
        type: GraphQLString,
        description: 'Nombre del interés',
        resolve (interes) {
          return interes.nombre;
        },
      },
      descripcion: {
        type: GraphQLString,
        description: 'Descripción del interés',
        resolve (interes) {
          return interes.descripcion;
        },
      },
      icono_url: {
        type: GraphQLString,
        description: 'Ícono del interés',
        resolve (interes) {
          return process.env.PROTOCOL + '://' + process.env.IP + ':' + process.env.PORT + interes.icono_url;
        },
      },
      publicaciones: {
        type: new GraphQLList(Publicacion),
        descripcion: 'Publicaciones correspondientes al interés',
        resolve (interes) {
          if (interes.hasOwnProperty('publicaciones')) {
            return interes.publicaciones;
          };
        },
      },
      alumnos: {
        type: new GraphQLList(Alumno),
        descripcion: 'Alumnos que indicaron el interés',
        resolve (interes) {
          if (interes.hasOwnProperty('alumnos')) {
            return interes.alumnos;
          };
        },
      },
      categoria: {
        type: CategoriaInteres,
        descripcion: 'Categoría a la que pertenece el interés',
        resolve (interes) {
          if (interes.hasOwnProperty('categoria')) {
            return interes.categoria;
          };
        },
      },
    };
  },
});

export default interesType;
