import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

import Usuario from './usuario.type';

const generoType = new GraphQLObjectType({
  name: 'genero',
  description: 'Género de un usuario',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID del género',
        resolve (genero) {
          return genero.id;
        },
      },
      nombre: {
        type: GraphQLString,
        description: 'Nombre del género',
        resolve (genero) {
          return genero.nombre;
        },
      },
      descripcion: {
        type: GraphQLString,
        description: 'Descripción del género',
        resolve (genero) {
          return genero.descripcion;
        },
      },
      usuarios: {
        type: new GraphQLList(Usuario),
        description: 'Usuarios con un género',
        resolve (genero) {
          return genero.usuarios;
        },
      },
    };
  }
});

export default generoType;
