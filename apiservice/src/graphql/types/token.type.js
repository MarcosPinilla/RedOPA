import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

import Usuario from './usuario.type';

export default new GraphQLObjectType({
  name: 'token',
  description: 'Token de usuario',
  fields() {
    return {
      hash: {
        type: GraphQLString,
        description: 'Hash del token',
        resolve (token) {
          return token.hash;
        }
      },
      tipo: {
        type: GraphQLString,
        description: 'Tipo de usuario',
        resolve (token) {
          return token.tipo;
        },
      },
      idTipo: {
        type: GraphQLInt,
        description: 'Id del tipo de cuenta',
        resolve (token) {
          return token.idTipo;
        },
      },
      perfilConfigurado: {
        type: GraphQLBoolean,
        description: 'Estado de configuración del perfil de alumno',
        resolve (token) {
          return token.perfilConfigurado;
        },
      },
      configuracionPassword: {
        type: GraphQLBoolean,
        description: 'Estado de configuración de la contraseña del alumno',
        resolve (token) {
          return token.configuracionPassword;
        },
      },
      permiso: {
        type: GraphQLInt,
        description: 'Nivel de permiso del usuario',
        resolve (token) {
          return token.permiso;
        },
      },
      usuario: {
        type: Usuario,
        description: 'Usuario que inicia sesión',
        resolve (token) {
          return token.usuario;
        },
      },
    };
  }
});