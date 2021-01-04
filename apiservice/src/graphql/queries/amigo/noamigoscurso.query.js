import { GraphQLNonNull, GraphQLList } from 'graphql';
import { ForbiddenError, AuthenticationError } from 'apollo-server';
import alumnoType from '../../types/alumno.type';
import models from '../../../models';
import { Sequelize } from 'sequelize';

const noAmigosCursoQuery = {
  type: GraphQLList(GraphQLNonNull(alumnoType)),
  args: {},
  async resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario,
        },
        include: [
          {
            model: models.Alumno,
            as: 'alumno',
            include: [
              {
                model: models.Alumno,
                as: 'amigos',
              },
              {
                model: models.Curso,
                as: 'curso'
              }
            ],
          },
        ],
      },
    );

    if (usuario.alumno === null) {
      throw new ForbiddenError('Not authorized to do this operation');
    };

    var idsAmigos = [];

    usuario.alumno.amigos.forEach(amigo => {
      idsAmigos.push(amigo.id);
    });

    const Op = Sequelize.Op;
    return models.Alumno.findAll({
      where: {
        id: {
          [Op.notIn]: idsAmigos,
        },
      },
      include: [
        {
          model: models.Usuario,
          as: 'cuenta',
          where: {
            institucion_id: me.institucion,
            id: {
              [Op.ne]: usuario.id,
            },
          },
          include: [
            {
              model: models.Institucion,
              as: 'institucion',
            },
          ],
        },
        {
          model: models.Curso,
          as: 'curso',
          where: {
            id: usuario.alumno.curso.id
          },
        },
        {
          model: models.Foto,
          as: 'fotos'
        },
      ],
      order: [
        ['cuenta', 'nombres', 'ASC'],
      ]
    })
  }
}

export default noAmigosCursoQuery;