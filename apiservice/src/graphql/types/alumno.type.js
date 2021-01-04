import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Curso from './curso.type';
import Usuario from './usuario.type';
import Foto from './foto.type';
import ContactoExterno from './contactoexterno.type';
import Apoderado from './apoderado.type';
import Interes from './interes.type';
import Funcionario from './funcionario.type';
import Evaluacion from './evaluacion.type';
import Alerta from './alerta.type';
import RiesgoDiario from './riesgodiario.type';
import PuebloIndigena from './puebloindigena.type';
import OrientacionSexual from './orientacionsexual.type';
import IdentidadGenero from './identidadgenero.type';

const alumnoType = new GraphQLObjectType({
  name: 'alumno',
  description: 'Datos de un alumno',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'ID del alumno',
        resolve (alumno) {
          return alumno.id;
        },
      },
      alias: {
        type: GraphQLString,
        description: 'Alias del alumno para usar en las vistas de la aplicación',
        resolve (alumno) {
          return alumno.alias;
        },
      },
      riesgo: {
        type: GraphQLInt,
        description: 'Nivel de riesgo que presenta el alumno',
        resolve (alumno) {
          return alumno.riesgo;
        },
      },
      configuracionPerfil: {
        type: GraphQLInt,
        description: 'Estado de la configuración del perfil del alumno',
        resolve (alumno) {
          return alumno.configuracion_perfil;
        },
      },
      cuenta: {
        type: Usuario,
        description: 'Usuario que contiene la información de cuenta del alumno',
        resolve (alumno) {
          if (alumno.hasOwnProperty('cuenta')) {
            return alumno.cuenta;
          };
        },
      },
      curso: {
        type: Curso,
        description: 'Curso que cursa el alumno',
        resolve (alumno) {
          if (alumno.hasOwnProperty('curso')) {
            return alumno.curso;
          };
        },
      },
      puebloIndigena: {
        type: PuebloIndigena,
        description: 'Pueblo indígena al que pertenece el alumno',
        resolve (alumno) {
          if (alumno.hasOwnProperty('puebloIndigena')) {
            return alumno.puebloIndigena;
          }
        },
      },
      orientacionSexual: {
        type: OrientacionSexual,
        description: 'Orientación sexual del alumno',
        resolve (alumno) {
          if (alumno.hasOwnProperty('orientacionSexual')) {
            return alumno.orientacionSexual;
          }
        },
      },
      identidadGenero: {
        type: IdentidadGenero,
        description: 'Identidad de género con la que se identifica el alumno',
        resolve (alumno) {
          if (alumno.hasOwnProperty('identidadGenero')) {
            return alumno.identidadGenero;
          }
        },
      },
      fotos: {
        type: new GraphQLList(Foto),
        description: 'Fotos que ha subido el alumno',
        resolve (alumno) {
          if (alumno.hasOwnProperty('fotos')) {
            return alumno.fotos;
          };
        },
      },
      contactosExternos: {
        type: new GraphQLList(ContactoExterno),
        description: 'Contactos externos que ha agregado el alumno',
        resolve (alumno) {
          if (alumno.hasOwnProperty('contactosExternos')) {
            return alumno.contactosExternos;
          };
        },
      },
      contactos: {
        type: new GraphQLList(Funcionario),
        description: 'Contactos que indicó el alumno',
        resolve (alumno) {
          if (alumno.hasOwnProperty('contactos')) {
            return alumno.contactos;
          };
        },
      },
      receptores: {
        type: new GraphQLList(Usuario),
        description: 'Usuarios que recibieron una alerta del alumno',
        resolve (alumno) {
          if (alumno.hasOwnProperty('receptores')) {
            return alumno.receptores;
          };
        },
      },
      apoderados: {
        type: new GraphQLList(Apoderado),
        description: 'Apoderados del alumno',
        resolve (alumno) {
          if (alumno.hasOwnProperty('apoderados')) {
            return alumno.apoderados;
          };
        },
      },
      intereses: {
        type: new GraphQLList(Interes),
        description: 'Intereses del alumno',
        resolve (alumno) {
          if (alumno.hasOwnProperty('intereses')) {
            return alumno.intereses;
          };
        },
      },
      amigos: {
        type: new GraphQLList(alumnoType),
        description: 'Amigos indicados por el alumno',
        resolve (alumno) {
          if (alumno.hasOwnProperty('amigos')) {
            return alumno.amigos;
          };
        },
      },
      evaluaciones: {
        type: new GraphQLList(Evaluacion),
        description: 'Evaluaciones del alumno hechas por otros usuarios',
        resolve (alumno) {
          if (alumno.hasOwnProperty('evaluaciones')) {
            return alumno.evaluaciones;
          };
        },
      },
      alertas: {
        type: new GraphQLList(Alerta),
        description: 'Alertas recibidas por el usuario',
        resolve (alumno) {
          if (alumno.hasOwnProperty('alertas')) {
            return alumno.alertas;
          };
        },
      },
      riesgosDiarios: {
        type: new GraphQLList(RiesgoDiario),
        description: 'Registro de nivel de riesgo que presentó el alumno por día ',
        resolve (alumno) {
          if (alumno.hasOwnProperty('riesgosDiarios')) {
            return alumno.riesgosDiarios;
          };
        },
      },
    };
  },
});

export default alumnoType;