import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";
import apoderadoType from '../../types/apoderado.type';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import models from "../../../models";
const bcrypt = require('bcrypt');

const agregarApoderado = {
  type: apoderadoType,
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
    institucion_id: {
      type: GraphQLID,
    },
    alumno_id: {
      type: GraphQLNonNull(GraphQLID),
    }
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

    if (args.rut === '' || !args.rut || args.nombres === '' || !args.nombres
      || args.apellidos === '' || !args.apellidos || args.genero_id === ''
      || !args.genero_id || args.alumno_id === '' || !args.alumno_id) {
      throw new UserInputError('Datos faltantes');
    }

    let alumno = await models.Alumno.findOne({
      where: {
        id: args.alumno_id,
      },
    });

    if (alumno === null) {
      throw new UserInputError('No se encontró el alumno');
    }

    let rutApoderado = '';
    let passwordApoderado = '';
    rutApoderado = args.rut.replace(/\s/g, '').replace('-', '').replace(/\./g, '').toLowerCase();
    //console.log(rutApoderado);
    //console.log(passwordApoderado);

    let usuario = await models.Usuario.findOne({
      where: {
        rut: rutApoderado,
      },
    });

    if (usuario !== null) {
      throw new UserInputError('Ya existe el apoderado');
    }

    passwordApoderado = rutApoderado.substring(rutApoderado.length - 6, rutApoderado.length).toLowerCase();

    let nombresApoderado = '';
    let nombresArray = args.nombres.split(' ');
    for (let i = 0; i < nombresArray.length; i++) {
      nombresApoderado += nombresArray[i].charAt(0).toUpperCase() + nombresArray[i].substring(1, nombresArray[i].length).toLowerCase();
      if ((i + 1) !== nombresArray.length) nombresApoderado += ' ';
    }
    //console.log(nombresApoderado);
    
    let apellidosApoderado = '';
    let apellidosArray = args.apellidos.split(' ');
    for (let i = 0; i < apellidosArray.length; i++) {
      apellidosApoderado += apellidosArray[i].charAt(0).toUpperCase() + apellidosArray[i].substring(1, apellidosArray[i].length).toLowerCase();
      if ((i + 1) !== apellidosArray.length) apellidosApoderado += ' ';
    }
    //console.log(apellidosApoderado);

    let nacimientoApoderado = new Date();
    if (args.nacimiento !== undefined && args.nacimiento !== null && args.nacimiento !== '') {
      nacimientoApoderado = new Date(args.nacimiento);
    }

    let emailApoderado = '';
    if (args.email !== undefined && args.email !== null) {
      emailApoderado = args.email;
    }

    let telefonoApoderado = '';
    if (args.telefono !== undefined && args.telefono !== null) {
      telefonoApoderado = args.telefono;
    }

    const usuarioApoderado = await models.Usuario.create({
      email: emailApoderado,
      password: bcrypt.hashSync(passwordApoderado, 10),
      nombres: nombresApoderado,
      apellidos: apellidosApoderado,
      telefono: telefonoApoderado,
      rut: rutApoderado,
      estado: 1,
      foto_url: '/imagenes/opa_icon.png',
      configuracion_password: 0,
      institucion_id: institucion,
      permiso_id: 1,
      genero_id: args.genero_id,
      nacimiento: nacimientoApoderado,
    });

    const apoderado = await models.Apoderado.create({
      usuario_id: usuarioApoderado.id
    });

    const apoderadoAlumno = await models.ApoderadoAlumno.create({
      apoderado_id: apoderado.id,
      alumno_id: alumno.id,
    });

    return apoderado;
  }
};

export default agregarApoderado;