import { GraphQLNonNull, GraphQLID } from 'graphql';
import usuarioType from '../../types/usuario.type';
import models from '../../../models';
import { UserInputError, AuthenticationError } from 'apollo-server';

const usuarioQuery = {
  type: GraphQLNonNull(usuarioType),
  args: {
    id: { 
      type: GraphQLID
    }
  },
  async resolve (root, { id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    let usuario = await models.Usuario.findOne({
      where: {
        id,
        institucion_id: me.institucion,
      },
      include: [
        {
          model: models.Institucion,
          as: 'institucion'
        },
        {
          model: models.Permiso,
          as: 'permiso'
        },
        {
          model: models.Genero,
          as: 'genero'
        },
        {
          model: models.Funcionario,
          as: 'funcionario'
        },
        {
          model: models.Alumno,
          as: 'alumno',
          include: [
            {
              model: models.Minoria,
              as: 'minoria',
            },
          ],
        },
        {
          model: models.Apoderado,
          as: 'apoderado'
        },
      ]
    });

    if (usuario === null) {
      throw new UserInputError('No se encontró el usuario o no pertenece a la misma institución');
    }

    return usuario;
  },
};

export default usuarioQuery;