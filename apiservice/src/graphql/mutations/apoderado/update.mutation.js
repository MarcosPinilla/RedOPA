import { GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLID } from "graphql";
import models from "../../../models";
import apoderadoType from '../../types/apoderado.type';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';

const updateApoderado = {
  type: GraphQLBoolean,
  args: {
    apoderado_id: {
      type: GraphQLNonNull(GraphQLID),
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

    let apoderado = await models.Apoderado.findOne({
      where: {
        id: args.apoderado_id,
      },
    });

    if (apoderado === null) {
      throw new UserInputError('No se encontró el apoderado');
    }

    let usuarioApoderado = await models.Usuario.findOne({
      where: {
        id: apoderado.usuario_id,
      },
    });

    if (usuarioApoderado === null) {
      throw new UserInputError('No se encontró el usuario');
    }

    if (me.permiso === 2) {
      if (usuarioApoderado.institucion_id !== me.institucion) {
        throw new ForbiddenError('El apoderado no pertenece a su institución');
      }
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

      usuarioApoderado.update({
        genero_id: genero.id,
      });
    }

    if (args.email !== null && args.email !== '' && args.email !== undefined) {
      usuarioApoderado.update({
        email: args.email,
      });
    }
    
    if (args.nombres !== null && args.nombres !== '' && args.nombres !== undefined) {
      usuarioApoderado.update({
        nombres: args.nombres,
      });
    }
    
    if (args.apellidos !== null && args.apellidos !== '' && args.apellidos !== undefined) {
      usuarioApoderado.update({
        apellidos: args.apellidos,
      });
    }
    
    if (args.telefono !== null && args.telefono !== '' && args.telefono !== undefined) {
      usuarioApoderado.update({
        telefono: args.telefono,
      });
    }
    
    if (args.nacimiento !== null && args.nacimiento !== '' && args.nacimiento !== undefined) {
      usuarioApoderado.update({
        nacimiento: args.nacimiento,
      });
    }

    return true;
  }
}

export default updateApoderado;