import { GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLID } from "graphql";
import models from "../../../models";
import funcionarioType from '../../types/funcionario.type';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
const bcrypt = require('bcrypt');

const createFuncionario = {
  type: funcionarioType,
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
    cargo: {
      type: GraphQLNonNull(GraphQLString),
    },
    profesor: {
      type: GraphQLBoolean,
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
    if (admin.permiso_id > 2) {
      if (args.institucion_id !== null && args.institucion_id !== '' && args.institucion_id !== 0 && args.institucion_id) {
        institucion = args.institucion_id;
      } else throw new UserInputError('Debe proporcionar un id de institución');      
    }
    else {
      institucion = admin.institucion.id;
    }

    if (args.rut === '' || !args.rut || args.nombres === '' || !args.nombres
      || args.apellidos === '' || !args.apellidos || args.genero_id === '' || !args.genero_id
      || args.institucion_id === '' || !args.institucion_id || args.cargo === '' || !args.cargo) {
      throw new UserInputError('Datos faltantes');
    }

    
    let rutFuncionario = '';
    let passwordFuncionario = '';
    rutFuncionario = args.rut.replace(/\s/g, '').replace('-', '').replace(/\./g, '').toLowerCase();
    //console.log(rutFuncionario);
    //console.log(passwordFuncionario);

    let usuario = await models.Usuario.findOne({
      where: {
        rut: rutFuncionario,
      },
    });

    if (usuario != null) {
      throw new UserInputError('Ya existe el funcionario');
    }

    passwordFuncionario = rutFuncionario.substring(rutFuncionario.length - 6, rutFuncionario.length).toLowerCase();

    let nombresFuncionario = '';
    let nombresArray = args.nombres.split(' ');
    for (let i = 0; i < nombresArray.length; i++) {
      nombresFuncionario += nombresArray[i].charAt(0).toUpperCase() + nombresArray[i].substring(1, nombresArray[i].length).toLowerCase();
      if ((i + 1) !== nombresArray.length) nombresFuncionario += ' ';
    }
    //console.log(nombresApoderado);
    
    let apellidosFuncionario = '';
    let apellidosArray = args.apellidos.split(' ');
    for (let i = 0; i < apellidosArray.length; i++) {
      apellidosFuncionario += apellidosArray[i].charAt(0).toUpperCase() + apellidosArray[i].substring(1, apellidosArray[i].length).toLowerCase();
      if ((i + 1) !== apellidosArray.length) apellidosFuncionario += ' ';
    }
    //console.log(apellidosApoderado);

    let emailFuncionario = '';
    if (args.email !== '' && args.email !== ' ' && args.email !== null && args.email !== undefined) {
      emailFuncionario = args.email;
    }
    
    let telefonoFuncionario= '';
    if (args.telefono !== '' && args.telefono !== ' ' && args.telefono !== null && args.telefono !== undefined) {
      telefonoFuncionario = args.telefono;
    }

    let nacimientoFuncionario = new Date();
    if (args.nacimiento !== '' && args.nacimiento !== undefined && args.nacimiento !== null) {
      nacimientoFuncionario = args.nacimiento
    }

    const usuarioFuncionario = await models.Usuario.create({
      email: emailFuncionario,
      password: bcrypt.hashSync(passwordFuncionario, 10),
      nombres: nombresFuncionario,
      apellidos: apellidosFuncionario,
      telefono: telefonoFuncionario,
      rut: rutFuncionario,
      estado: 1,
      foto_url: '/imagenes/opa_icon.png',
      configuracion_password: 0,
      institucion_id: institucion,
      permiso_id: 1,
      genero_id: args.genero_id,
      nacimiento: nacimientoFuncionario,
    });

    const funcionario = await models.Funcionario.create({
      usuario_id: usuarioFuncionario.id,
      cargo: args.cargo,
    });

    if (args.profesor !== null && args.profesor) {
      await models.Profesor.create({
        funcionario_id: funcionario.id,
      });
    }

    return funcionario;
  }
}

export default createFuncionario;