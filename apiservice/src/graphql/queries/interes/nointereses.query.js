import { GraphQLList, GraphQLNonNull } from 'graphql';
import interesType from '../../types/interes.type';
import models from '../../../models';
import { ForbiddenError, AuthenticationError } from 'apollo-server';
import { Sequelize } from 'sequelize';

const interesesQuery = {
  type: GraphQLList(GraphQLNonNull(interesType)),
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
                model: models.Interes,
                as: 'intereses',
              },
            ],
          },
          {
            model: models.Institucion,
            as: 'institucion',
          },
        ],
      },
    );

    if (usuario.alumno === null) {
      throw new ForbiddenError('Not authorized to do this operation');
    };

    var idsIntereses = [];

    usuario.alumno.intereses.forEach(interes => {
      idsIntereses.push(interes.id);
    });

    const Op = Sequelize.Op;

    return models.Interes.findAll({
      where:{
        id: {
          [Op.notIn]: idsIntereses,
        },
        '$categoria.institucion_id$': usuario.institucion.id
      },
      include: [{
        model: models.CategoriaInteres,
        as: 'categoria',
        include: [{
          model: models.Institucion,
          as: 'institucion',
          where: {
            id: usuario.institucion.id, 
          },
        }],
      }],
    });
  },
};

export default interesesQuery;