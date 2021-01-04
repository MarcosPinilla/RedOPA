import { GraphQLNonNull, GraphQLID } from 'graphql';
import apoderadoType from '../../types/apoderado.type';
import models from '../../../models';
import { UserInputError, AuthenticationError } from 'apollo-server';

const apoderadoQuery = {
  type: apoderadoType,
  args: {
    id: {
      type: GraphQLID,
    },
    institucion_id: {
      type: GraphQLID,
    },
  },
  async resolve (root, { id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario
        },
        include: [
          {
            model: models.Institucion,
            as: 'institucion',
          },
        ],
      },
    );

    if (usuario.permiso_id === 3) {
      var apoderado = await models.Apoderado.findOne({
        where: {
          id
        },
        include: [
          {
            model: models.Usuario,
            as: 'cuenta',
            required: true,
            include: [
              {
                model: models.Genero,
                as: 'genero',
              },
              {
                model: models.Evaluacion,
                as: 'evaluaciones',
                include: [
                  {
                    model: models.Emocion,
                    as: 'emocion'
                  },
                  {
                    model: models.Usuario,
                    as: 'evaluador'
                  },
                  {
                    model: models.Alumno,
                    as: 'alumno',
                    include: [
                      {
                        model: models.Usuario,
                        as: 'cuenta',
                      }
                    ]
                  }
                ]
              }
            ],
          },
          {
            model: models.Alumno,
            as: 'pupilos',
            include: [
              {
                model: models.Usuario,
                as: 'cuenta',
              },
            ],
          },
        ]
      });
    } else {
      var apoderado = await models.Apoderado.findOne({
        where: {
          id
        },
        include: [
          {
            model: models.Usuario,
            as: 'cuenta',
            where: {
              institucion_id: usuario.institucion.id,
            },
            required: true,
            include: [
              {
                model: models.Genero,
                as: 'genero',
              },
              {
                model: models.Evaluacion,
                as: 'evaluaciones',
                include: [
                  {
                    model: models.Emocion,
                    as: 'emocion'
                  },
                  {
                    model: models.Usuario,
                    as: 'evaluador'
                  },
                  {
                    model: models.Alumno,
                    as: 'alumno',
                    include: [
                      {
                        model: models.Usuario,
                        as: 'cuenta',
                      }
                    ]
                  }
                ]
              }
            ],
          },
          {
            model: models.Alumno,
            as: 'pupilos',
            include: [
              {
                model: models.Usuario,
                as: 'cuenta',
              },
            ],
          },
        ]
      });
    }

    if (apoderado === null) {
      throw new UserInputError('No se encontró el apoderado o no pertenece a la misma institución');
    }

    return apoderado;
  },
};

export default apoderadoQuery;