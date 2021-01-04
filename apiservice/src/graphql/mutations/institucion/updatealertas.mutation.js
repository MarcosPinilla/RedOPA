import { GraphQLBoolean, GraphQLID } from 'graphql';
import models from '../../../models';
import { ForbiddenError, AuthenticationError, UserInputError } from 'apollo-server';

const updateAlertas = {
  type: GraphQLBoolean,
  args: {
    recibirAlertas: {
      type: GraphQLBoolean,
    },
    institucion_id: {
      type: GraphQLID,
    },
  },
  async resolve (root, { recibirAlertas, institucion_id }, { me }) {
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

    if (admin.permiso_id === 3) {
      if (institucion_id !== null && institucion_id !== '' && institucion_id !== 0) {
        let institucion = await models.Institucion.findOne({
          where: {
            id: institucion_id,
          },
        });

        if (Institucion !== null) {
          institucion.update({
            alertas: recibirAlertas,
          });
        } else throw new UserInputError('Institución no encontrada');
      } else throw new UserInputError('Debe proporcionar un id de institución');      
    }
    else {
      admin.institucion.update({
        alertas: recibirAlertas,
      });
    }

    return true;
  }
};

export default updateAlertas;