import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

import Usuario from './usuario.type';

const permisoType = new GraphQLObjectType({
  name: 'permiso',
  description: 'Nivel de acceso que tiene un usuario en el sistema',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'El ID del permiso',
        resolve (permiso) {
          return permiso.id;
        },
      },
      nombre: {
        type: GraphQLString,
        description: 'El nombre del permiso',
        resolve (permiso) {
          return permiso.nombre;
        },
      },
      descripcion: {
        type: GraphQLString,
        description: 'Descripción del permiso',
        resolve (permiso) {
          return permiso.descripcion;
        },
      },
      usuarios: {
        type: new GraphQLList(Usuario),
        description: 'Usuarios con un permiso',
        resolve (permiso) {
          return permiso.usuarios;
        },
      },
    };
  },
});

export default permisoType;
