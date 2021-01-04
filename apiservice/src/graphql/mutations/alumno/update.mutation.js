import { GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLID } from "graphql";
import models from "../../../models";
import alumnoType from '../../types/alumno.type';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';

const updateAlumno = {
  type: GraphQLBoolean,
  args: {
    alumno_id: {
      type: GraphQLNonNull(GraphQLID),
    },
    alias: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    nombres: {
      type: GraphQLString,
    },
    apellidos: {
      type: GraphQLString,
    },
    telefono: {
      type: GraphQLString,
    },
    nacimiento: {
      type: GraphQLString,
    },
    genero_id: {
      type: GraphQLID,
    },
  },
  async resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso < 2) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    let alumno = await models.Alumno.findOne({
      where: {
        id: args.alumno_id,
      },
      include: [{
        model: models.Usuario,
        as: 'cuenta',
        required: true,
      }],
    });

    if (alumno === null) {
      throw new UserInputError('No se encontró el alumno');
    }

    if (me.permiso === 2) {
      if (alumno.cuenta.institucion_id !== me.institucion) {
        throw new ForbiddenError('El alumno no pertenece a su institución');
      }
    }

    let usuarioAlumno = await models.Usuario.findOne({
      where: {
        id: alumno.usuario_id,
      },
    });

    if (usuarioAlumno === null) {
      throw new UserInputError('No se encontró el usuario');
    }

    if (args.genero_id !== null && args.genero_id > 0) {
      let genero = await models.Genero.findOne({
        where: {
          id: args.genero_id,
        },
      });

      if (genero === null) {
        throw new UserInputError('No se encontró el género');
      }

      usuarioAlumno.update({
        genero_id: genero.id,
      });
    }

    if (args.alias !== null && args.alias !== '' && args.alias !== undefined) {
      alumno.update({
        alias: args.alias,
      });
    }

    if (args.email !== null && args.email !== '' && args.email !== undefined) {
      usuarioAlumno.update({
        email: args.email,
      });
    }
    
    if (args.nombres !== null && args.nombres !== '' && args.nombres !== undefined) {
      usuarioAlumno.update({
        nombres: args.nombres,
      });
    }
    
    if (args.apellidos !== null && args.apellidos !== '' && args.apellidos !== undefined) {
      usuarioAlumno.update({
        apellidos: args.apellidos,
      });
    }
    
    if (args.telefono !== null && args.telefono !== '' && args.telefono !== undefined) {
      usuarioAlumno.update({
        telefono: args.telefono,
      });
    }
    
    if (args.nacimiento !== null && args.nacimiento !== '' && args.nacimiento !== undefined) {
      usuarioAlumno.update({
        nacimiento: args.nacimiento,
      });
    }

    return true;
  }
}

export default updateAlumno;