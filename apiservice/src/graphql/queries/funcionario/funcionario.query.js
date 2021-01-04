import { GraphQLNonNull, GraphQLID } from 'graphql';
import funcionarioType from '../../types/funcionario.type';
import models from '../../../models';
import { UserInputError, AuthenticationError } from 'apollo-server';
import permisoType from '../../types/permiso.type';

const funcionarioQuery = {
  type: funcionarioType,
  args: {
    id: {
      type: GraphQLID,
    },
    institucion_id: {
      type: GraphQLID,
    },
  },
  async resolve (root, { id, institucion_id }, { me }) {
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
      var funcionario = await models.Funcionario.findOne({
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
                model: models.Permiso,
                as: 'permiso',
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
        ]
      });
    } else {
      var funcionario = await models.Funcionario.findOne({
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
                model: models.Permiso,
                as: 'permiso',
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
        ]
      });
    }

    if (funcionario === null) {
      throw new UserInputError('No se encontró el funcionario o no pertenece a la misma institución');
    }

    return funcionario;
  },
};

export default funcionarioQuery;