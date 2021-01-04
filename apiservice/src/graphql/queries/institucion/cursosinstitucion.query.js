import { GraphQLID, GraphQLNonNull, GraphQLList } from 'graphql';
import cursoType from '../../types/curso.type';
import models from '../../../models';
import { UserInputError, AuthenticationError } from 'apollo-server';

const cursosInstitucionQuery = {
  type: GraphQLList(cursoType),
  args: {
    institucion_id: {
      type: GraphQLID,
    },
  },
  async resolve(root, { institucion_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

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
      if (institucion_id !== null && institucion_id !== '' && institucion_id !== 0 && institucion_id) {
        institucion = institucion_id;
      } else throw new UserInputError('Debe proporcionar un id de institución');      
    }
    else {
      institucion = admin.institucion.id;
    }

    return models.Curso.findAll({
      where: {
        institucion_id: institucion,
      }
    });
  }
}

export default cursosInstitucionQuery;