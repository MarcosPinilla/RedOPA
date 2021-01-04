import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt
} from 'graphql';

import Alumno from './alumno.type';
import Usuario from './usuario.type';

const contactoType = new GraphQLObjectType({
  name: 'contacto',
  description: 'Datos de una relación de contacto',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de un contacto',
        resolve (contacto) {
          return contacto.id;
        },
      },
      tipo: {
        type: GraphQLInt,
        description: 'Tipo del contacto',
        resolve (contacto) {
          return contacto.tipo_contacto;
        },
      },
      alumno: {
        type: Alumno,
        description: 'Alumno que señaló el contacto',
        resolve (contacto) {
          if (contacto.hasOwnProperty('alumno')) {
            return contacto.alumno;
          };
        },
      },
      contacto: {
        type: Usuario,
        description: 'Usuario señalado como contacto por el alumno',
        resolve (contacto) {
          if (contacto.hasOwnProperty('contacto')) {
            return contacto.contacto;
          };
        },
      },
    };
  },
});

export default contactoType;