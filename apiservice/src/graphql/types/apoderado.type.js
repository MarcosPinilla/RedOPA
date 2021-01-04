import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList
} from 'graphql';

import Usuario from './usuario.type';
import Alumno from './alumno.type';

const apoderadoType = new GraphQLObjectType({
  name: 'apoderado',
  description: 'Datos de un apoderado',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID del apoderado',
        resolve (apoderado) {
          return apoderado.id;
        },
      },
      cuenta: {
        type: Usuario,
        description: 'Usuario que contiene la información de cuenta del apoderado',
        resolve (apoderado) {
          if (apoderado.hasOwnProperty('cuenta')) {
            return apoderado.cuenta;
          };
        },
      },
      pupilos: {
        type: new GraphQLList(Alumno),
        description: 'Alumnos de los cuales es apoderado',
        resolve (apoderado) {
          if (apoderado.hasOwnProperty('pupilos')) {
            return apoderado.pupilos;
          };
        },
      },
    };
  },
});

export default apoderadoType;
