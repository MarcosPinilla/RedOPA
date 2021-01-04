import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import Date from './Date.type';
import Institucion from './institucion.type';
import Permiso from './permiso.type';
import Genero from './genero.type';
import Funcionario from './funcionario.type';
import Alumno from './alumno.type';
import Apoderado from './apoderado.type';
import Publicacion from './publicacion.type';
import Evaluacion from './evaluacion.type';
import Alerta from './alerta.type';

const usuarioType = new GraphQLObjectType({
  name: 'usuario',
  description: 'Datos de la cuenta de un usuario',
  fields () {
    return {
      id: {
        type: GraphQLID,
        description: 'El ID del usuario',
        resolve (usuario) {
          return usuario.id;
        },
      },
      email: {
        type: GraphQLString,
        description: 'Correo electrónico del usuario',
        resolve (usuario) {
          return usuario.email;
        },
      },
      nombres: {
        type: GraphQLString,
        description: 'Nombres del usuario',
        resolve (usuario) {
          return usuario.nombres;
        },
      },
      apellidos: {
        type: GraphQLString,
        description: 'Apellidos del usuario',
        resolve (usuario) {
          return usuario.apellidos;
        },
      },
      telefono: {
        type: GraphQLString,
        description: 'Teléfono de contacto del usuario',
        resolve (usuario) {
          return usuario.telefono;
        },
      },
      rut: {
        type: GraphQLString,
        description: 'RUT del usuario',
        resolve (usuario) {
          return usuario.rut;
        },
      },
      nacimiento: {
        type: Date,
        description: 'Fecha de nacimiento del usuario',
        resolve (usuario) {
          return usuario.nacimiento;
        },
      },
      estado: {
        type: GraphQLInt,
        description: 'Estado de la cuenta del usuario',
        resolve (usuario) {
          return usuario.estado;
        },
      },
      fotoUrl: {
        type: GraphQLString,
        description: 'Dirección de la foto del usuario en el servidor',
        resolve (usuario) {
          return process.env.PROTOCOL + '://' + process.env.IP + ':' + process.env.PORT + usuario.foto_url;
        },
      },
      configuracionPassword: {
        type: GraphQLInt,
        description: 'Estado de la contraseña del usuario',
        resolve (usuario) {
          return usuario.configuracion_password;
        },
      },
      consentimiento: {
        type: Date,
        description: 'Fecha y hora en que usuario entregó consentimiento',
        resolve (usuario) {
          return usuario.consentimiento;
        },
      },
      institucion: {
        type: Institucion,
        description: 'Institución a la que pertenece el usuario',
        resolve (usuario) {
          if (usuario.hasOwnProperty('institucion')) {
            return usuario.institucion;
          };
        },
      },
      permiso: {
        type: Permiso,
        description: 'Nivel de permiso en la aplicación del usuario',
        resolve (usuario) {
          if (usuario.hasOwnProperty('permiso')) {
            return usuario.permiso;
          };
        },
      },
      genero: {
        type: Genero,
        description: 'Género con el que se identifica el usuario',
        resolve (usuario) {
          if (usuario.hasOwnProperty('genero')) {
            return usuario.genero;
          };
        },
      },
      funcionario: {
        type: Funcionario,
        description: 'Funcionario al que corresponde el usuario',
        resolve (usuario) {
          if (usuario.hasOwnProperty('funcionario')) {
            return usuario.funcionario;
          };
        },
      },
      alumno: {
        type: Alumno,
        description: 'Alumno al que le corresponde el usuario',
        resolve (usuario) {
          if (usuario.hasOwnProperty('alumno')) {
            return usuario.alumno;
          };
        },
      },
      apoderado: {
        type: Apoderado,
        description: 'Apoderado al que le corresponde el usuario',
        resolve (usuario) {
          if (usuario.hasOwnProperty('apoderado')) {
            return usuario.apoderado;
          };
        },
      },
      receptores: {
        type: new GraphQLList(usuarioType), 
        description: 'Usuarios receptores de mensajes de felicitaciones que ha enviado el usuario',
        resolve (usuario) {
          if (usuario.hasOwnProperty('receptores')) {
            return usuario.receptores;
          };
        },
      },
      emisores: {
        type: new GraphQLList(usuarioType), 
        description: 'Usuarios emisores de mensajes de felicitaciones que ha recibido el usuario',
        resolve (usuario) {
          if (usuario.hasOwnProperty('emisores')) {
            return usuario.emisores;
          };
        },
      },
      riesgosos: {
        type: new GraphQLList(Alumno), 
        description: 'Alumnos que han emitido alertas',
        resolve (usuario) {
          if (usuario.hasOwnProperty('riesgosos')) {
            return usuario.riesgosos;
          };
        },
      },
      publicaciones: {
        type: new GraphQLList(Publicacion), 
        description: 'Publicaciones de las que se han recibido notificaciones',
        resolve (usuario) {
          if (usuario.hasOwnProperty('publicaciones')) {
            return usuario.publicaciones;
          };
        },
      },
      evaluaciones: {
        type: new GraphQLList(Evaluacion),
        description: 'Evaluaciones hechas por el usuario',
        resolve (usuario) {
          if (usuario.hasOwnProperty('evaluaciones')) {
            return usuario.evaluaciones;
          };
        },
      },
      alertas: {
        type: new GraphQLList(Alerta),
        description: 'Alertas recibidas por el usuario',
        resolve (usuario) {
          if (usuario.hasOwnProperty('alertas')) {
            return usuario.alertas;
          };
        },
      },
    };
  },
});

export default usuarioType;