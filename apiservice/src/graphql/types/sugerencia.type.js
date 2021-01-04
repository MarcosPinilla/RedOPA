import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

const sugerenciaType = new GraphQLObjectType({
  name: 'sugerencia',
  description: 'Datos de una sugerencia',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de la sugerencia',
        resolve (sugerencia) {
          return sugerencia.id;
        },
      },
      titulo: {
        type: GraphQLString,
        description: 'Título de la sugerencia',
        resolve (sugerencia) {
          return sugerencia.titulo;
        },
      },
      contenido: {
        type: GraphQLString,
        description: 'Contenido de la sugerencia',
        resolve (sugerencia) {
          return sugerencia.contenido;
        },
      },
      fuente: {
        type: GraphQLString,
        description: 'Fuente de la sugerencia',
        resolve (sugerencia) {
          return sugerencia.fuente;
        },
      },
      tipo: {
        type: GraphQLString,
        description: 'Tipo de usuario al que va dirigida la sugerencia',
        resolve (sugerencia) {
          return sugerencia.tipo;
        },
      },
    };
  },
});

export default sugerenciaType;