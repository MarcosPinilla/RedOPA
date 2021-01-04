import { GraphQLNonNull } from 'graphql';
import usuarioType from '../../types/usuario.type';
import models from '../../../models';
import { AuthenticationError } from 'apollo-server';

const logueadoQuery = {
  type: GraphQLNonNull(usuarioType),
  args: {},
  resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    return models.Usuario.findOne({
      where: {
        id: me.usuario,
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
  },
};

export default logueadoQuery;