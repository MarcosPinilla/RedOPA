import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Usuario from './usuario.type';
import Profesor from './profesor.type';
import Publicacion from './publicacion.type';
import Alumno from './alumno.type';

const funcionarioType = new GraphQLObjectType({
  name: 'funcionario',
  description: 'Datos de un funcionario',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID del funcionario',
        resolve (funcionario) {
          return funcionario.id;
        },
      },
      cargo: {
        type: GraphQLString,
        description: 'Cargo que cumple el funcionario',
        resolve (funcionario) {
          return funcionario.cargo;
        },
      },
      cuenta: {
        type: Usuario,
        description: 'Cuenta correspondiente al funcionario',
        resolve (funcionario) {
          if (funcionario.hasOwnProperty('cuenta')) {
            return funcionario.cuenta;
          };
        },
      },
      profesor: {
        type: Profesor,
        description: 'Datos de profesor del funcionario',
        resolve (funcionario) {
          if (funcionario.hasOwnProperty('profesor')) {
            return funcionario.profesor;
          };
        },
      },
      publicaciones: {
        type: new GraphQLList(Publicacion),
        description: 'Publicaciones hechas por el funcionario',
        resolve (funcionario) {
          if (funcionario.hasOwnProperty('publicaciones')) {
            return funcionario.publicaciones;
          };
        },
      },
      contactos: {
        type: new GraphQLList(Alumno), 
        description: 'Alumnos que indicaron al funcionario como contacto de confianza',
        resolve (funcionario) {
          if (funcionario.hasOwnProperty('contactos')) {
            return funcionario.contactos;
          };
        },
      },
    };
  },
});

export default funcionarioType;
