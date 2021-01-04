import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
  } from 'graphql';
import alumnoType from './../types/alumno.type';
  
export default new GraphQLObjectType({
    name: 'pgalumno',
    fields() {
        return {
            totalItems: {
                type: GraphQLInt
            },
            items: {
                type: GraphQLList(GraphQLNonNull(alumnoType))
            }
        };
    }
});