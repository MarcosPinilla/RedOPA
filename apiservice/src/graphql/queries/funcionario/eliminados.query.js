import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import funcionarioType from '../../types/funcionario.type';
import models from '../../../models';
import { Sequelize } from 'sequelize';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';

const funcionariosEliminadosQuery = {
  type: GraphQLList(GraphQLNonNull(funcionarioType)),
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

    const Op = Sequelize.Op
    
    return models.Funcionario.findAll(
      {
        paranoid: false,
        include: [
          {
            model: models.Usuario,
            as: 'cuenta',
            paranoid: false,
            where: {
              institucion_id: institucion,
              id: {
                [Op.ne]: me.usuario,
              },
            },
          },
        ],
        where: {
          deletedAt: {
            [Op.ne]: null,
          },
        },
        order: [
          ['cuenta', 'nombres', 'ASC'],
        ]
      },
    );
  }
}

export default funcionariosEliminadosQuery;