import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList
} from 'graphql';

import Funcionario from './funcionario.type';
import Asignatura from './asignatura.type';

const profesorType = new GraphQLObjectType({
  name: 'profesor',
  description: 'Datos de un profesor',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID del profesor',
        resolve (profesor) {
          return profesor.id;
        },
      },
      funcionario: {
        type: Funcionario,
        description: 'Datos de funcionario del profesor',
        resolve (profesor) {
          if (profesor.hasOwnProperty('funcionario')) {
            return profesor.funcionario;
          };
        },
      },
      asignaturas: {
        type: new GraphQLList(Asignatura),
        description: 'Asignaturas que imparte el profesor',
        resolve (profesor) {
          if (profesor.hasOwnProperty('asignaturas')) {
            return profesor.asignaturas;
          };
        },
      },
    };
  },
});

export default profesorType;
