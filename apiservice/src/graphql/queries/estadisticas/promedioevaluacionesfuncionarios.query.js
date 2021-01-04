import { GraphQLID, GraphQLList, GraphQLString, GraphQLInt, GraphQLFloat } from 'graphql';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import models from "../../../models";
import { Sequelize } from 'sequelize';
import cantidadDatosType from '../../types/cantidaddatos.type';

const promedioEvaluacionesFuncionariosQuery = {
  type: GraphQLFloat,
  args: {
    institucion_id: {
      type: GraphQLID,
    },
    periodo: {
      type: GraphQLString,
    }
  },
  async resolve (root, { institucion_id, periodo }, { me }) {
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
    hoy.setHours(hoy.getHours() - (new Date().getTimezoneOffset() / 60));

    if (periodo === 'dia') {
      var comienzoPeriodo = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 1,
        (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);
    } else if (periodo === 'semana') {
      var comienzoPeriodo = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 8,
        (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);
    } else if (periodo === 'mes') {
      var comienzoPeriodo = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 31,
        (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);
    } else {
      var comienzoPeriodo = new Date(hoy.getFullYear() - 1, hoy.getMonth(), hoy.getDate(),
        (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);
    }

    let porcentajesUso = [];
    let cantidadEvaluaciones = 0;

    let funcionariosConfigurados = await models.Funcionario.findAll({
      distinct: true,
      include: [
        {
          model: models.Usuario,
          as: 'cuenta',
          where: {
            configuracion_password: 1,
            institucion_id: institucion,
          },
          required: true,
        },
      ],
    });

    for (let i = 0; i < funcionariosConfigurados.length; i++) {
      cantidadEvaluaciones += await models.Evaluacion.count({
        where: {
          evaluador_id: funcionariosConfigurados[i].cuenta.id,
          fecha: { [Op.gt]: comienzoPeriodo },
        },
      });
    }

    let promedioEvaluaciones = (cantidadEvaluaciones / funcionariosConfigurados.length);

    if (funcionariosConfigurados.length > 0) {
      return promedioEvaluaciones;
    }

    return 0; 
  }
}

export default promedioEvaluacionesFuncionariosQuery;