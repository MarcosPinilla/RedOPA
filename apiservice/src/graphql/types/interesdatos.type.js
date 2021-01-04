import { GraphQLObjectType, GraphQLList, GraphQLString } from "graphql";
import cantidadDatosType from "./cantidaddatos.type";

const interesDatosType = new GraphQLObjectType({
  name: 'interesDatos',
  description: 'Para crear gráficos clave-valor en el sistema de administración',
  fields() {
    return {
      nombre: {
        type: GraphQLString,
        description: 'Nombre del interés',
        resolve (interesDatosType) {
          return interesDatosType.nombre;
        }
      },
      id: {
        type: GraphQLString,
        description: 'Id del interés',
        resolve (interesDatosType) {
          return interesDatosType.id;
        }
      },
      cantidades: {
        type: GraphQLList(cantidadDatosType),
        description: 'Cantidad de alumnos con el interés por curso',
        resolve (interesDatosType) {
          if (interesDatosType.hasOwnProperty('cantidades')) {
            return interesDatosType.cantidades;
          }
        }
      },
    };
  },
});

export default interesDatosType;