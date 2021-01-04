import { GraphQLNonNull, GraphQLList, GraphQLID, GraphQLInt } from 'graphql';
import { AuthenticationError } from 'apollo-server';
import alumnoType from "../../types/alumno.type";
import models from "../../../models";
import { Sequelize } from 'sequelize';

const alumnosExcelQuery = {
  type: GraphQLList(GraphQLNonNull(alumnoType)),
  args: {
    institucion_id: {
      type: GraphQLID,
    }
  },
  resolve (root, { institucion_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const Op = Sequelize.Op;
    var hoy = new Date();
    hoy.setHours(hoy.getHours() - (new Date().getTimezoneOffset() / 60));
    var comienzoSemana = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 8,
      (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);

    if (me.permiso > 2) {
      if (institucion_id === undefined || institucion_id < 1) {
        // Código súper admin

        return models.Alumno.findAll({
          include: [
            {
              model: models.Usuario,
              as: 'cuenta',
              where: {
                id: {
                  [Op.ne]: me.usuario,
                },
              },
              include: [
                {
                  model: models.Institucion,
                  as: 'institucion',
                },
                {
                  model: models.Genero,
                  as: 'genero',
                }
              ],
            },
            {
              model: models.RiesgoDiario,
              as: 'riesgosDiarios',
              where: {
                fecha: {
                  [Op.gt]: comienzoSemana,
                }
              },
              required: false,
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
              model: models.Evaluacion,
              as: 'evaluaciones',
              where: {
                fecha: {
                  [Op.gt]: comienzoSemana,
                }
              },
              required: false,
              include: [
                {
                  model: models.Emocion,
                  as: 'emocion'
                },
                {
                  model: models.Usuario,
                  as: 'evaluador',
                  include: [
                    {
                      model:models.Funcionario,
                      as: 'funcionario',
                    },
                    {
                      model: models.Alumno,
                      as: 'alumno',
                    },
                    {
                      model: models.Apoderado,
                      as: 'apoderado',
                    }
                  ]
                }
              ]
            },
          ],
          order: [
            ['cuenta', 'nombres', 'ASC'],
          ],
        });
      } else {
        // Código admin

        return models.Alumno.findAll({
          include: [
            {
              model: models.Usuario,
              as: 'cuenta',
              where: {
                institucion_id: institucion_id,
                id: {
                  [Op.ne]: me.usuario,
                },
              },
              include: [
                {
                  model: models.Institucion,
                  as: 'institucion',
                },
                {
                  model: models.Genero,
                  as: 'genero',
                }
              ],
            },
            {
              model: models.RiesgoDiario,
              as: 'riesgosDiarios',
              where: {
                fecha: {
                  [Op.gt]: comienzoSemana,
                }
              },
              required: false,
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
              model: models.Evaluacion,
              as: 'evaluaciones',
              where: {
                fecha: {
                  [Op.gt]: comienzoSemana,
                }
              },
              required: false,
              include: [
                {
                  model: models.Emocion,
                  as: 'emocion'
                },
                {
                  model: models.Usuario,
                  as: 'evaluador',
                  include: [
                    {
                      model:models.Funcionario,
                      as: 'funcionario',
                    },
                    {
                      model: models.Alumno,
                      as: 'alumno',
                    },
                    {
                      model: models.Apoderado,
                      as: 'apoderado',
                    }
                  ]
                }
              ]
            },
          ],
          order: [
            ['cuenta', 'nombres', 'ASC'],
          ],
        });
      }
    } else {
      return models.Alumno.findAll({
        include: [
          {
            model: models.Usuario,
            as: 'cuenta',
            where: {
              institucion_id: me.institucion,
              id: {
                [Op.ne]: me.usuario,
              },
            },
            include: [
              {
                model: models.Institucion,
                as: 'institucion',
              },
              {
                model: models.Genero,
                as: 'genero',
              }
            ],
          },
          {
            model: models.RiesgoDiario,
            as: 'riesgosDiarios',
            where: {
              fecha: {
                [Op.gt]: comienzoSemana,
              }
            },
            required: false,
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
            model: models.Evaluacion,
            as: 'evaluaciones',
            where: {
              fecha: {
                [Op.gt]: comienzoSemana,
              }
            },
            required: false,
            include: [
              {
                model: models.Emocion,
                as: 'emocion'
              },
              {
                model: models.Usuario,
                as: 'evaluador',
                include: [
                  {
                    model:models.Funcionario,
                    as: 'funcionario',
                  },
                  {
                    model: models.Alumno,
                    as: 'alumno',
                  },
                  {
                    model: models.Apoderado,
                    as: 'apoderado',
                  }
                ]
              }
            ]
          },
        ],
        order: [
          ['cuenta', 'nombres', 'ASC'],
        ],
      });
    }
  }
}

export default alumnosExcelQuery;
