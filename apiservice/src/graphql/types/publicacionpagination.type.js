import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
  } from 'graphql';
import publicacionType from './../types/publicacion.type';
  
export default new GraphQLObjectType({
    name: 'pgpublicacion',
    fields() {
        return {
            totalItems: {
                type: GraphQLInt
            },
            items: {
                type: GraphQLList(GraphQLNonNull(publicacionType))
            }
        };
    }
});