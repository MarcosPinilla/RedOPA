import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

import Alumno from './alumno.type';

const minoriaType = new GraphQLObjectType({
  name: 'minoria',
  description: 'Minorías',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'El ID de la minoría',
        resolve (minoria) {
          return minoria.id;
        },
      },
      nombre: {
        type: GraphQLString,
        description: 'El nombre de la minoría',
        resolve (minoria) {
          return minoria.nombre;
        },
      },
      descripcion: {
        type: GraphQLString,
        description: 'Descripción de la minoría',
        resolve (minoria) {
          return minoria.descripcion;
        },
      },
      alumnos: {
        type: new GraphQLList(Alumno),
        description: 'Alumnos de una minoría',
        resolve (minoria) {
          return minoria.alumnos;
        },
      },
    };
  },
});

export default minoriaType;
