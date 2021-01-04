import { GraphQLNonNull, GraphQLID } from 'graphql';
import alumnoType from '../../types/alumno.type';
import models from '../../../models';
import { UserInputError, AuthenticationError } from 'apollo-server';
import { Sequelize } from 'sequelize';

const alumnoQuery = {
  type: alumnoType,
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

    var hoy = new Date();
    hoy.setHours(hoy.getHours() - (new Date().getTimezoneOffset() / 60));
    var comienzoHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 1,
      (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);

    const Op = Sequelize.Op;

    if (usuario.permiso_id === 3) {
      var alumno = await models.Alumno.findOne({
        where: {
          id
        },
        include: [
          {
            model: models.Usuario,
            as: 'cuenta',
            include: [
              {
                model: models.Genero,
                as: 'genero',
              },
            ],
          },
          {
            model: models.Curso,
            as: 'curso'
          },
          {
            model: models.PuebloIndigena,
            as: 'puebloIndigena'
          },
          {
            model: models.IdentidadGenero,
            as: 'identidadGenero'
          },
          {
            model: models.OrientacionSexual,
            as: 'orientacionSexual'
          },
          {
            model: models.Foto,
            as: 'fotos'
          },
          {
            model: models.ContactoExterno,
            as: 'contactosExternos'
          },
          {
            model: models.Funcionario,
            as: 'contactos',
            include: [
              {
                model: models.Usuario,
                as: 'cuenta',
              },
            ],
          },
          {
            model: models.Apoderado,
            as: 'apoderados',
            include: [
              {
                model: models.Usuario,
                as: 'cuenta',
              },
            ],
          },
          {
            model: models.Interes,
            as: 'intereses'
          },
          {
            model: models.Alumno,
            as: 'amigos',
            include: [
              {
                model: models.Usuario,
                as: 'cuenta',
              },
            ],
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
              }
            ]
          },
          {
            model: models.RiesgoDiario,
            as: 'riesgosDiarios',
            where: {
              fecha: {
                [Op.gt]: comienzoHoy,
              }
            },
            required: false,
          }
        ]
      });
    } else {
      var alumno = await models.Alumno.findOne({
        where: {
          id
        },
        include: [
          {
            model: models.Usuario,
            as: 'cuenta',
            where: {
              institucion_id: me.institucion,
            },
            include: [
              {
                model: models.Genero,
                as: 'genero',
              },
            ],
          },
          {
            model: models.Curso,
            as: 'curso'
          },
          {
            model: models.PuebloIndigena,
            as: 'puebloIndigena'
          },
          {
            model: models.IdentidadGenero,
            as: 'identidadGenero'
          },
          {
            model: models.OrientacionSexual,
            as: 'orientacionSexual'
          },
          {
            model: models.Foto,
            as: 'fotos'
          },
          {
            model: models.ContactoExterno,
            as: 'contactosExternos'
          },
          {
            model: models.Funcionario,
            as: 'contactos',
            include: [
              {
                model: models.Usuario,
                as: 'cuenta',
              },
            ],
          },
          {
            model: models.Apoderado,
            as: 'apoderados',
            include: [
              {
                model: models.Usuario,
                as: 'cuenta',
              },
            ],
          },
          {
            model: models.Interes,
            as: 'intereses'
          },
          {
            model: models.Alumno,
            as: 'amigos',
            include: [
              {
                model: models.Usuario,
                as: 'cuenta',
              },
            ],
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
              }
            ]
          },
          {
            model: models.RiesgoDiario,
            as: 'riesgosDiarios',
            where: {
              fecha: {
                [Op.gt]: comienzoHoy,
              }
            },
            required: false,
          }
        ]
      });
    }

    if (alumno === null) {
      throw new UserInputError('No se encontró el alumno o no pertenece a la misma institución');
    }

    return alumno;
  },
};

export default alumnoQuery;