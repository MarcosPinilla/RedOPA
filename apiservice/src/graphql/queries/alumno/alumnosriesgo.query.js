import { GraphQLNonNull, GraphQLList, GraphQLID } from 'graphql';
import { AuthenticationError, ForbiddenError } from 'apollo-server';
import alumnoType from "../../types/alumno.type";
import models from "../../../models";
import { Sequelize } from 'sequelize';

const alumnosRiesgoQuery = {
  type: GraphQLList(GraphQLNonNull(alumnoType)),
  args: {
    institucion_id: {
      type: GraphQLID,
    },
  },
  async resolve (root, { institucion_id }, { me }) {
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

    const limit = 24;

    var hoy = new Date();
    hoy.setHours(hoy.getHours() - (new Date().getTimezoneOffset() / 60));
    var comienzoHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 1,
      (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);

    const Op = Sequelize.Op;

    let institucion = 0;
    if (admin.permiso_id === 3) {
      if (institucion_id !== null && institucion_id !== '' && institucion_id !== 0 && institucion_id) {
        institucion = institucion_id;
      } else throw new UserInputError('Debe proporcionar un id de institución');      
    }
    else {
      institucion = admin.institucion.id;
    }

    if (me.permiso === 2) {
      return models.Alumno.findAll({
        limit,
        include: [
          {
            model: models.Usuario,
            as: 'cuenta',
            where: {
              institucion_id: institucion,
            },
            required: true,
          },
          {
            model: models.Curso,
            as: 'curso'
          },
          {
            model: models.Minoria,
            as: 'minoria'
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
          },
          {
            model: models.Apoderado,
            as: 'apoderados'
          },
          {
            model: models.Interes,
            as: 'intereses'
          },
          {
            model: models.Alumno,
            as: 'amigos'
          },
          {
            model: models.RiesgoDiario,
            as: 'riesgosDiarios',
            where: {
              fecha: {
                [Op.gt]: comienzoHoy,
              }
            },
            required: true,
          }
        ],
        order: [
          ['riesgosDiarios', 'riesgo', 'DESC'],
        ]
      });
    }

    return models.Alumno.findAll({
      limit,
      include: [
        {
          model: models.Usuario,
          as: 'cuenta',
          required: true,
        },
        {
          model: models.Curso,
          as: 'curso'
        },
        {
          model: models.Minoria,
          as: 'minoria'
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
        },
        {
          model: models.Apoderado,
          as: 'apoderados'
        },
        {
          model: models.Interes,
          as: 'intereses'
        },
        {
          model: models.Alumno,
          as: 'amigos'
        },
        {
          model: models.RiesgoDiario,
          as: 'riesgosDiarios',
          where: {
            fecha: {
              [Op.gt]: comienzoHoy,
            }
          },
          required: true,
        }
      ],
      order: [
        ['riesgosDiarios', 'riesgo', 'DESC'],
      ]
    });
  }
}

export default alumnosRiesgoQuery;