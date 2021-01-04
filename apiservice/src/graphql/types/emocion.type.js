import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

import Evaluacion from './evaluacion.type';

const emocionType = new GraphQLObjectType({
  name: 'emocion',
  description: 'Datos de una emoción',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de un emoción',
        resolve (emocion) {
          return emocion.id;
        },
      },
      nombre: {
        type: GraphQLString,
        description: 'Nombre de una emoción',
        resolve (emocion) {
          return emocion.nombre;
        },
      },
      descripcion: {
        type: GraphQLString,
        description: 'Descripción de una emoción',
        resolve (emocion) {
          return emocion.descripcion;
        },
      },
      evaluaciones: {
        type: new GraphQLList(Evaluacion),
        description: 'Evaluaciones donde se indicó la emoción',
        resolve (emocion) {
          if (emocion.hasOwnProperty('evaluaciones')) {
            return emocion.evaluaciones;
          };
        },
      },
    };
  },
});

export default emocionType;