import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from 'graphql';

import Alumno from './alumno.type';

const contactoExternoType = new GraphQLObjectType({
  name: 'contactoExterno',
  description: 'Datos de un contacto externo',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID del contacto externo',
        resolve (contactoExterno) {
          return contactoExterno.id;
        },
      },
      nombre: {
        type: GraphQLString,
        description: 'Nombre del contacto externo',
        resolve (contactoExterno) {
          return contactoExterno.nombre;
        },
      },
      telefono: {
        type: GraphQLString,
        description: 'Teléfono del contacto externo',
        resolve (contactoExterno) {
          return contactoExterno.telefono;
        },
      },
      correo: {
        type: GraphQLString,
        description: 'Correo del contacto externo',
        resolve (contactoExterno) {
          return contactoExterno.correo;
        },
      },
      alumno: {
        type: Alumno,
        descripcion: 'Alumno que subió el contacto externo',
        resolve (contactoExterno) {
          if (contactoExterno.hasOwnProperty('alumno')) {
            return contactoExterno.alumno;
          };
        },
      },
    };
  },
});

export default contactoExternoType;
