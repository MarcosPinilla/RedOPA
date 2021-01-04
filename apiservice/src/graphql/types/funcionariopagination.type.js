import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
  } from 'graphql';

import funcionarioType from './../types/funcionario.type';
  
export default new GraphQLObjectType({
    name: 'pgfuncionario',
    fields() {
        return {
            totalItems: {
                type: GraphQLInt
            },
            items: {
                type: GraphQLList(GraphQLNonNull(funcionarioType))
            }
        };
    }
});