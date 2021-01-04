import { GraphQLNonNull, GraphQLList } from 'graphql';
import { AuthenticationError, ForbiddenError } from 'apollo-server';
import alumnoType from "../../types/alumno.type";
import models from "../../../models";
import { Sequelize } from 'sequelize';

const companerosQuery = {
  type: GraphQLList(GraphQLNonNull(alumnoType)),
  args: {},
  async resolve (root, args, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario
        },
        include: [
          {
            model: models.Alumno,
            as: 'alumno',
            include: [{
              model: models.Curso,
              as: 'curso',
            }],
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

    const Op = Sequelize.Op;
    return models.Alumno.findAll({
      where: {
        curso_id: usuario.alumno.curso.id,
      },
      include: [
        {
          model: models.Usuario,
          as: 'cuenta',
          where: {
            institucion_id: usuario.institucion.id,
            id: {
              [Op.ne]: usuario.id,
            },
          },
        },
        {
          model: models.Curso,
          as: 'curso',
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
      ],
      order: [
        ['cuenta', 'nombres', 'ASC'],
      ]
    })
  }
}

export default companerosQuery;