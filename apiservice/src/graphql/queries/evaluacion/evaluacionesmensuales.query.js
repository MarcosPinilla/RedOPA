import { GraphQLList, GraphQLNonNull, GraphQLID } from "graphql";
import { AuthenticationError, ForbiddenError } from 'apollo-server';
import cantidadDatosType from "../../types/cantidaddatos.type";
import models from "../../../models";
import { Sequelize } from 'sequelize';

const historialApoderado = {
  type: GraphQLList(cantidadDatosType),
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

    let institucion = 0;
    if (admin.permiso_id === 3) {
      if (institucion_id !== null && institucion_id !== '' && institucion_id !== 0) {
        institucion = institucion_id;
      } else throw new UserInputError('Debe proporcionar un id de institución');      
    }
    else {
      institucion = admin.institucion.id;
    }

    const Op = Sequelize.Op;

    var hoy = new Date();
    var inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

    let evaluacionesAlumnos = await models.Evaluacion.count({
      where: {
        fecha: {
          [Op.gt]: inicioMes,
        },
      },
      include: [
        {
          model: models.Usuario,
          as: 'evaluador',
          include: [
            {
              model: models.Alumno,
              as: 'alumno',
              where: {
                id: {
                  [Op.not]: null
                },
              },
            },
          ],
          where: {
            institucion_id: institucion,
          },
        },
      ],
    });

    let evaluacionesApoderados = await models.Evaluacion.count({
      where: {
        fecha: {
          [Op.gt]: inicioMes,
        },
      },
      include: [
        {
          model: models.Usuario,
          as: 'evaluador',
          include: [
            {
              model: models.Apoderado,
              as: 'apoderado',
              where: {
                id: {
                  [Op.not]: null
                },
              },
            },
          ],
          where: {
            institucion_id: institucion,
          },
        },
      ],
    });

    let evaluacionesFuncionarios = await models.Evaluacion.count({
      where: {
        fecha: {
          [Op.gt]: inicioMes,
        },
      },
      include: [
        {
          model: models.Usuario,
          as: 'evaluador',
          include: [
            {
              model: models.Funcionario,
              as: 'funcionario',
              where: {
                id: {
                  [Op.not]: null
                },
              },
            },
          ],
          where: {
            institucion_id: institucion,
          },
        },
      ],
    });

    let cantidadesEvaluaciones = [
      {
        nombre: 'alumno',
        cantidad: evaluacionesAlumnos,
      },
      {
        nombre: 'apoderado',
        cantidad: evaluacionesApoderados,
      },
      {
        nombre: 'funcionario',
        cantidad: evaluacionesFuncionarios,
      },
    ];

    return cantidadesEvaluaciones;
  }
}

export default historialApoderado;