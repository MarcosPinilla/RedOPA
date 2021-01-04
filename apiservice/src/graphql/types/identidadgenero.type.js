import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from "graphql";

import Alumno from './alumno.type';

const identidadGeneroType = new GraphQLObjectType({
  name: 'identidadGenero',
  description: 'Identidad de género con la que se identifica el alumno',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de una identidad de género',
        resolve (identidadGenero) {
          return identidadGenero.id;
        },
      },
      nombre: {
        type: GraphQLString,
        description: 'Nombre de la identidad de género',
        resolve (identidadGenero) {
          return identidadGenero.nombre;
        },
      },
      descripcion: {
        type: GraphQLString,
        description: 'Descripción de la identidad de género',
        resolve (identidadGenero) {
          return identidadGenero.descripcion;
        },
      },
      alumnos: {
        type: new GraphQLList(Alumno),
        description: 'Alumnos que se identifican con la identidad de género',
        resolve (identidadGenero) {
          if (identidadGenero.hasOwnProperty('alumnos')) {
            return identidadGenero.alumnos;
          }
        },
      },
    }
  },
});

export default identidadGeneroType;