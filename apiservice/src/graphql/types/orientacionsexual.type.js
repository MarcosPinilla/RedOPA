import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from "graphql";

import Alumno from './alumno.type';

const orientacionSexualType = new GraphQLObjectType({
  name: 'orientacionSexual',
  description: 'Orientación sexual del alumno',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de una orientación sexual',
        resolve (orientacionSexual) {
          return orientacionSexual.id;
        },
      },
      nombre: {
        type: GraphQLString,
        description: 'Nombre de la orientación sexual',
        resolve (orientacionSexual) {
          return orientacionSexual.nombre;
        },
      },
      descripcion: {
        type: GraphQLString,
        description: 'Descripción de la orientación sexual',
        resolve (orientacionSexual) {
          return orientacionSexual.descripcion;
        },
      },
      alumnos: {
        type: new GraphQLList(Alumno),
        description: 'Alumnos que tienen la orientación sexual',
        resolve (orientacionSexual) {
          if (orientacionSexual.hasOwnProperty('alumnos')) {
            return orientacionSexual.alumnos;
          }
        },
      },
    }
  },
});

export default orientacionSexualType;