import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";

const cantidadDatosType = new GraphQLObjectType({
  name: 'cantidadDatos',
  description: 'Para crear gráficos clave-valor en el sistema de administración',
  fields() {
    return {
      nombre: {
        type: GraphQLString,
        description: 'Dato a evaluar',
        resolve (cantidadDatosType) {
          return cantidadDatosType.nombre;
        }
      },
      cantidad: {
        type: GraphQLInt,
        description: 'Cantidad del datos',
        resolve (cantidadDatosType) {
          return cantidadDatosType.cantidad;
        }
      },
    };
  },
});

export default cantidadDatosType;