import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";
import alumnoType from '../../types/alumno.type';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import models from "../../../models";
const bcrypt = require('bcrypt');

const agregarAlumno = {
  type: alumnoType,
  args: {
    email: {
      type: GraphQLString,
    },
    rut: {
      type: GraphQLNonNull(GraphQLString),
    },
    nombres: {
      type: GraphQLNonNull(GraphQLString),
    },
    apellidos: {
      type: GraphQLNonNull(GraphQLString),
    },
    telefono: {
      type: GraphQLString,
    },
    nacimiento: {
      type: GraphQLString,
    },
    genero_id: {
      type: GraphQLNonNull(GraphQLID),
    },
    curso_id: {
      type: GraphQLNonNull(GraphQLID),
    },
    institucion_id: {
      type: GraphQLID,
    },
  },
  async resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso < 2) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    const admin = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario,
        },
        include: [{
          model: models.Institucion,
          as: 'institucion',
        }]
      },
    );

    let institucion = 0;
    if (admin.permiso_id === 3) {
      if (args.institucion_id !== null && args.institucion_id !== '' && args.institucion_id !== 0 && args.institucion_id) {
        institucion = args.institucion_id;
      } else throw new UserInputError('Debe proporcionar un id de institución');      
    }
    else {
      institucion = admin.institucion.id;
    }

    if (args.rut === '' || !args.rut || args.nombres === '' || !args.nombres || args.apellidos === ''
      || !args.apellidos || args.genero_id === '' || !args.genero_id) {
      throw new UserInputError('Datos faltantes');
    }

    let rutAlumno = '';
    let passwordAlumno = '';
    rutAlumno = args.rut.replace(/\s/g, '').replace('-', '').replace(/\./g, '').replace(/\s+/g, '').toLowerCase();
    //console.log(rutAlumno);
    //console.log(passwordAlumno);

    let usuario = await models.Usuario.findOne({
      where: {
        rut: rutAlumno,
      },
    });

    if (usuario !== null) {
      throw new UserInputError('Ya existe el alumno');
    }

    passwordAlumno = rutAlumno.substring(rutAlumno.length - 6, rutAlumno.length).toLowerCase();

    let nombresAlumno = '';
    let nombresArray = args.nombres.split(' ');
    for (let i = 0; i < nombresArray.length; i++) {
      nombresAlumno += nombresArray[i].replace(/\s+/g, '').charAt(0).toUpperCase() + nombresArray[i].substring(1, nombresArray[i].length).toLowerCase();
      if ((i + 1) !== nombresArray.length) nombresAlumno += ' ';
    }
    //console.log(nombresAlumno);
    
    let apellidosAlumno = '';
    let apellidosArray = args.apellidos.split(' ');
    for (let i = 0; i < apellidosArray.length; i++) {
      apellidosAlumno += apellidosArray[i].replace(/\s+/g, '').charAt(0).toUpperCase() + apellidosArray[i].substring(1, apellidosArray[i].length).toLowerCase();
      if ((i + 1) !== apellidosArray.length) apellidosAlumno += ' ';
    }
    //console.log(apellidosAlumno);

    let emailAlumno = '';
    if (args.email !== '' && args.email !== ' ' && args.email !== null && args.email !== undefined) {
      emailAlumno = args.email;
    }
    
    let telefonoAlumno = '';
    if (args.telefono !== '' && args.telefono !== ' ' && args.telefono !== null && args.telefono !== undefined) {
      telefonoAlumno = args.telefono;
    }

    let nacimientoAlumno = new Date();
    if (args.nacimiento !== '' && args.nacimiento !== undefined && args.nacimiento !== null) {
      nacimientoAlumno = new Date(args.nacimiento);
    }

    const usuarioAlumno = await models.Usuario.create({
      email: emailAlumno,
      password: bcrypt.hashSync(passwordAlumno, 10),
      nombres: nombresAlumno,
      apellidos: apellidosAlumno,
      telefono: telefonoAlumno,
      rut: rutAlumno,
      estado: 1,
      foto_url: '/imagenes/opa_icon.png',
      configuracion_password: 0,
      institucion_id: institucion,
      permiso_id: 1,
      genero_id: args.genero_id,
      nacimiento: nacimientoAlumno,
    });

    const alumno = await models.Alumno.create({
      usuario_id: usuarioAlumno.id,
      curso_id: args.curso_id
    });

    return alumno;
  }
};

export default agregarAlumno;