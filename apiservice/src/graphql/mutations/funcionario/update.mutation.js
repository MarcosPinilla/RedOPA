import { GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLID } from "graphql";
import models from "../../../models";
import funcionarioType from '../../types/funcionario.type';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';

const updateFuncionario = {
  type: GraphQLBoolean,
  args: {
    funcionario_id: {
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
    cargo: {
      type: GraphQLString,
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

    let funcionario = await models.Funcionario.findOne({
      where: {
        id: args.funcionario_id,
      },
    });

    if (funcionario === null) {
      throw new UserInputError('No se encontró el funcionario');
    }

    let usuarioFuncionario = await models.Usuario.findOne({
      where: {
        id: funcionario.usuario_id,
      },
    });

    if (usuarioFuncionario === null) {
      throw new UserInputError('No se encontró el usuario');
    }

    if (me.permiso === 2) {
      if (usuarioFuncionario.institucion_id !== me.institucion) {
        throw new ForbiddenError('El funcionario no pertenece a su institución');
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

      usuarioFuncionario.update({
        genero_id: genero.id,
      });
    }

    if (args.email !== null && args.email !== '' && args.email !== undefined) {
      usuarioFuncionario.update({
        email: args.email,
      });
    }
    
    if (args.nombres !== null && args.nombres !== '' && args.nombres !== undefined) {
      usuarioFuncionario.update({
        nombres: args.nombres,
      });
    }
    
    if (args.apellidos !== null && args.apellidos !== '' && args.apellidos !== undefined) {
      usuarioFuncionario.update({
        apellidos: args.apellidos,
      });
    }
    
    if (args.telefono !== null && args.telefono !== '' && args.telefono !== undefined) {
      usuarioFuncionario.update({
        telefono: args.telefono,
      });
    }
    
    if (args.nacimiento !== null && args.nacimiento !== '' && args.nacimiento !== undefined) {
      usuarioFuncionario.update({
        nacimiento: args.nacimiento,
      });
    }
    
    if (args.cargo !== null && args.cargo !== '' && args.cargo !== undefined) {
      funcionario.update({
        cargo: args.cargo,
      });
    }
    
    if (args.profesor !== null && args.profesor !== undefined) {
      let profesor = await models.Profesor.findOne({
        where: {
          funcionario_id: funcionario.id,
        }
      });
      if (!args.profesor) {
        if (profesor !== null) {
          profesor.update({
            funcionario_id: 0,
          });

          profesor.destroy();
        }
      } else {
        if (profesor === null) {
          await models.Profesor.create({
            funcionario_id: funcionario.id,
          });
        }
      }
    }

    return true;
  }
}

export default updateFuncionario;