import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import Alumno from './alumno.type';
import Date from './Date.type';

const fotoType = new GraphQLObjectType({
  name: 'foto',
  description: 'Datos de una foto',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID de la foto',
        resolve (foto) {
          return foto.id;
        },
      },
      nombre: {
        type: GraphQLString,
        description: 'Nombre de la foto',
        resolve (foto) {
          return foto.nombre;
        },
      },
      perfil: {
        type: GraphQLInt,
        description: 'Indica si es foto de perfil o no',
        resolve (foto) {
          return foto.perfil;
        },
      },
      fecha: {
        type: Date,
        description: 'Fecha de la foto',
        resolve (foto) {
          return foto.fecha;
        },
      },
      fotoUrl: {
        type: GraphQLString,
        description: 'URL de la foto en el servidor',
        resolve (foto) {
          return process.env.PROTOCOL + '://' + process.env.IP + ':' + process.env.PORT + foto.foto_url;
        },
      },
      alumno: {
        type: Alumno,
        descripcion: 'Alumno que subió la foto',
        resolve (foto) {
          if (foto.hasOwnProperty('alumno')) {
            return foto.alumno;
          };
        },
      },
    };
  },
});

export default fotoType;