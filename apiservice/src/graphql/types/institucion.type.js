import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import Usuario from './usuario.type';
import CategoriaInteres from './categoriainteres.type';
import Curso from './curso.type';

const institucionType = new GraphQLObjectType({
  name: 'institucion',
  description: 'Datos de una institución educacional',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'El ID de la institución',
        resolve (institucion) {
          return institucion.id;
        },
      },
      nombre: {
        type: GraphQLString,
        description: 'El nombre de la institución',
        resolve (institucion) {
          return institucion.nombre;
        },
      },
      rut: {
        type: GraphQLString,
        description: 'El RUT de la institución',
        resolve (institucion) {
          return institucion.rut;
        },
      },
      direccion: {
        type: GraphQLString,
        description: 'La dirección de la institución',
        resolve (institucion) {
          return institucion.direccion;
        },
      },
      telefono: {
        type: GraphQLString,
        description: 'El teléfono de contacto de la institución',
        resolve (institucion) {
          return institucion.telefono;
        },
      },
      fotoUrl: {
        type: GraphQLString,
        description: 'Foto de la institución',
        resolve (institucion) {
          return process.env.PROTOCOL + '://' + process.env.IP + ':' + process.env.PORT + institucion.foto_url;
        },
      },
      alertas: {
        type: GraphQLString,
        description: 'Controla si se envían alertas de riesgo a los administradores',
        resolve (institucion) {
          return institucion.alertas;
        },
      },
      umbral_riesgo: {
        type: GraphQLInt,
        description: 'Valor mínimo que un riesgo diario debe tener para enviar una alerta',
        resolve (institucion) {
          return institucion.umbral_riesgo;
        }
      },
      usuarios: {
        type: new GraphQLList(Usuario),
        description: 'Los usuarios asociados a la institución',
        resolve (institucion) {
          if (institucion.hasOwnProperty('usuarios')) {
            return institucion.usuarios;
          }
        },
      },
      categorias: {
        type: new GraphQLList(CategoriaInteres),
        description: 'Las categorías de intereses publicados por la institución',
        resolve (institucion) {
          if (institucion.hasOwnProperty('categorias')) {
            return institucion.categorias;
          }
        },
      },
      cursos: {
        type: new GraphQLList(Curso),
        description: 'Cursos de la institución',
        resolve (institucion) {
          if (institucion.hasOwnProperty('cursos')) {
            return institucion.cursos;
          }
        },
      },
    };
  },
});

export default institucionType;
