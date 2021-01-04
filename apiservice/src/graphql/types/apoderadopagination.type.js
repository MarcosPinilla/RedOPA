import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
  } from 'graphql';
import apoderadoType from './../types/apoderado.type';
  
export default new GraphQLObjectType({
    name: 'pgapoderado',
    fields() {
        return {
            totalItems: {
                type: GraphQLInt
            },
            items: {
                type: GraphQLList(GraphQLNonNull(apoderadoType))
            }
        };
    }
});