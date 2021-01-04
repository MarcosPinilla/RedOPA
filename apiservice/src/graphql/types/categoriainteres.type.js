import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

import Interes from './interes.type';
import Institucion from './institucion.type';

const categoriaInteresType = new GraphQLObjectType({
  name: 'categoria',
  description: 'Datos de una categoría',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de la categoría',
        resolve (categoriaInteresType) {
          return categoriaInteresType.id;
        },
      },
      nombre: {
        type: GraphQLString,
        description: 'Nombre de la categoría',
        resolve (categoriaInteresType) {
          return categoriaInteresType.nombre;
        },
      },
      descripcion: {
        type: GraphQLString,
        description: 'Descripción de la categoría',
        resolve (categoriaInteresType) {
          return categoriaInteresType.descripcion;
        },
      },
      icono_url: {
        type: GraphQLString,
        description: 'Ícono de la categoría',
        resolve (categoriaInteresType) {
          return process.env.PROTOCOL + '://' + process.env.IP + ':' + process.env.PORT + categoriaInteresType.icono_url;
        },
      },
      intereses: {
        type: new GraphQLList(Interes),
        descripcion: 'Intereses correspondientes a la categoría',
        resolve (categoriaInteresType) {
          if (categoriaInteresType.hasOwnProperty('intereses')) {
            return categoriaInteresType.publicaciones;
          };
        },
      },
      institucion: {
        type: Institucion,
        descripcion: 'Institución que publicó el interés',
        resolve (categoriaInteresType) {
          if (categoriaInteresType.hasOwnProperty('institucion')) {
            return categoriaInteresType.institucion;
          };
        },
      },
    };
  },
});

export default categoriaInteresType;
