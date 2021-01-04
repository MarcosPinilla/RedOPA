import models from '../../../models';
import { ForbiddenError, UserInputError, AuthenticationError } from 'apollo-server';
import { GraphQLID, GraphQLBoolean } from 'graphql';

const deleteContacto = {
  type: GraphQLBoolean,
  args: {
    funcionario_id: {
      type: GraphQLID,
    },
  },
  async resolve (source, { funcionario_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    var usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario
        },
        include: [
          {
            model: models.Alumno,
            as: 'alumno'
          }
        ]
      }
    );
    
    if (usuario.alumno === null) {
      throw new ForbiddenError('Not authorized to do this operation');
    }

    var funcionario = await models.Funcionario.findOne(
      {
        where: {
          id: funcionario_id
        }
      }
    );

    if (funcionario === null) {
      throw new UserInputError('Debe elegir un funcionario válido');
    }

    var confianza = await models.Contacto.findOne(
      {
        where: {
          alumno_id: usuario.alumno.id,
          contacto_id: funcionario.id,
        }
      }
    );

    if (confianza === null) {
      throw new Error('Contacto indefinido');
    }

    return models.Contacto.destroy({
      where: {
        alumno_id: usuario.alumno.id,
        contacto_id: funcionario.id,
      },
    });
  }
}

export default deleteContacto;