import { GraphQLID, GraphQLList, GraphQLString, GraphQLInt, GraphQLFloat } from 'graphql';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import models from "../../../models";
import { Sequelize } from 'sequelize';

const usuariosActivosQuery = {
  type: GraphQLFloat,
  args: {
    institucion_id: {
      type: GraphQLID,
    },
  },
  async resolve (root, { institucion_id }, { me }) {
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
      if (institucion_id !== null && institucion_id !== '' && institucion_id !== 0) {
        institucion = institucion_id;
      } else throw new UserInputError('Debe proporcionar un id de institución');      
    }
    else {
      institucion = admin.institucion.id;
    }
    
    let usuariosInstitucion = await models.Usuario.count({
      where: {
        institucion_id: institucion,
      }
    });

    let usuariosActivos = await models.Usuario.count({
      where: {
        institucion_id: institucion,
        configuracion_password: 1,
      }
    });

    let porcentajeActivos = (usuariosActivos / usuariosInstitucion) * 100;

    if (usuariosActivos > 0) {
      return porcentajeActivos;
    }

    return 0; 
  }
}

export default usuariosActivosQuery;