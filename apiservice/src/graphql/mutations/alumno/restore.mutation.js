import { GraphQLNonNull, GraphQLBoolean, GraphQLID } from 'graphql';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import models from "../../../models";
import { Sequelize } from 'sequelize';

const restaurarAlumno = {
  type: GraphQLBoolean,
  args: {
    alumno_id: {
      type: GraphQLID,
    },
  },
  async resolve (root, { alumno_id }, { me }) {
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

    let alumno = await models.Alumno.findOne({
      paranoid: false,
      include: [
        {
          model: models.Usuario,
          as: 'cuenta',
          paranoid: false,
          where: {
            id: {
              [Op.ne]: admin.id,
            },
          },
        },
      ],
      where: {
        deletedAt: {
          [Op.ne]: null,
        },
        id: alumno_id,
      },
    });

    if (me.permiso === 2) {
      if (alumno.cuenta.institucion_id !== admin.institucion_id) {
        throw new ForbiddenError('Usuario no pertenece a su institucion');
      }
    }

    alumno.cuenta.restore();
    
    alumno.restore();
    
    return true;
  }
}

export default restaurarAlumno;