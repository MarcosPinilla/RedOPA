import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from "graphql";

import Alumno from './alumno.type';

const puebloIndigenaType = new GraphQLObjectType({
  name: 'puebloIndigena',
  description: 'Pueblo indígena al que pertenece un alumno',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de un pueblo indígena',
        resolve (puebloIndigena) {
          return puebloIndigena.id;
        },
      },
      nombre: {
        type: GraphQLString,
        description: 'Nombre del pueblo indígena',
        resolve (puebloIndigena) {
          return puebloIndigena.nombre;
        },
      },
      descripcion: {
        type: GraphQLString,
        description: 'Descripción del pueblo indígena',
        resolve (puebloIndigena) {
          return puebloIndigena.descripcion;
        },
      },
      alumnos: {
        type: new GraphQLList(Alumno),
        description: 'Alumnos que pertenecen al pueblo indígena',
        resolve (puebloIndigena) {
          if (puebloIndigena.hasOwnProperty('alumnos')) {
            return puebloIndigena.alumnos;
          }
        },
      },
    }
  },
});

export default puebloIndigenaType;