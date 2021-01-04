import { GraphQLList, GraphQLNonNull } from "graphql";
import sugerenciaType from "../../types/sugerencia.type";
import models from "../../../models";
import { Sequelize } from 'sequelize';
import { ForbiddenError, AuthenticationError } from 'apollo-server';

const sugerenciasQuery = {
  type: GraphQLList(GraphQLNonNull(sugerenciaType)),
  args: {},
  async resolve (source, args, { me }) {
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
          },
          {
            model: models.Apoderado,
            as: 'apoderado',
          },
          {
            model: models.Funcionario,
            as: 'funcionario',
          },
        ],
      },
    );

    let tipo = '';

    if (usuario.alumno !== null) {
      tipo = 'alumno';
    } else if (usuario.apoderado !== null) {
      tipo = 'apoderado';
    } else if (usuario.funcionario !== null) {
      tipo = 'funcionario';
    } else {
      throw new ForbiddenError('Not authorized to do this operation');
    }

    const Op = Sequelize.Op;

    return models.Sugerencia.findAll({
      where: {
        [Op.or]: [
          {tipo: tipo}, {tipo: null}
        ],
      },
    });
  },
};

export default sugerenciasQuery;