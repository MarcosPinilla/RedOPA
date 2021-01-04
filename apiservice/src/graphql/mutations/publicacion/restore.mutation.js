import { GraphQLNonNull, GraphQLBoolean, GraphQLID } from 'graphql';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import models from "../../../models";
import { Sequelize } from 'sequelize';

const restaurarPublicacion = {
  type: GraphQLBoolean,
  args: {
    publicacion_id: {
      type: GraphQLID,
    },
  },
  async resolve (root, { publicacion_id }, { me }) {
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
        }],
      },
    );

    if (admin === null || admin === undefined) {
      throw new ForbiddenError('Debe ser administrador para usar esta función');
    }

    const Op = Sequelize.Op;

    let publicacion = await models.Publicacion.findOne({
      paranoid: false,
      include: [
        {
          model: models.Interes,
          as: 'interes',
          required: true,
          paranoid: false,
          include: [{
            model: models.CategoriaInteres,
            as: 'categoria',
            required: true,
            paranoid: false,
          }],
        },
      ],
      where: {
        deletedAt: {
          [Op.ne]: null,
        },
        id: publicacion_id,
      },
    });

    if (me.permiso === 2) {
      if (publicacion.interes.categoria.institucion_id !== admin.institucion_id) {
        throw new ForbiddenError('Publicación no pertenece a su institucion');
      }
    }

    publicacion.restore();

    return true;
  }
}

export default restaurarPublicacion;