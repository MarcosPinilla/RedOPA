import {  GraphQLString,  GraphQLNonNull } from 'graphql';
import models from '../../../models/index.js';
import Token from '../../types/token.type';
const bcrypt = require('bcrypt');
import jwt from '../../../services/jwt.service';
import { AuthenticationError, UserInputError } from 'apollo-server';

const login = {
  type: Token,
  args: {
    access: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },

  
  async resolve (source, args) {
    let user = await models.Usuario.findOne({
      where: {
        rut: args.access,
      },
      include: [
        {
          model: models.Institucion,
          as: 'institucion'
        },
        {
          model: models.Permiso,
          as: 'permiso'
        },
        {
          model: models.Funcionario,
          as: 'funcionario'
        },
        {
          model: models.Alumno,
          as: 'alumno',
          include: [
            {
              model: models.PuebloIndigena,
              as: 'puebloIndigena'
            },
            {
              model: models.OrientacionSexual,
              as: 'orientacionSexual'
            }
          ]
        },
        {
          model: models.Apoderado,
          as: 'apoderado'
        }
      ]
    });

    if (!user) {
      user = await models.Usuario.findOne({
        where: {
          email: args.access,
        },
        include: [
          {
            model: models.Institucion,
            as: 'institucion'
          },
          {
            model: models.Permiso,
            as: 'permiso'
          },
          {
            model: models.Funcionario,
            as: 'funcionario'
          },
          {
            model: models.Alumno,
            as: 'alumno',
            include: [
              {
                model: models.PuebloIndigena,
                as: 'puebloIndigena'
              },
              {
                model: models.OrientacionSexual,
                as: 'orientacionSexual'
              }
            ]
          },
          {
            model: models.Apoderado,
            as: 'apoderado'
          },
          {
            model: models.Genero,
            as: 'genero'
          }
        ]
      });
      if (!user) {
        throw new UserInputError('No user found with the provided login credentials');
      }
    }

    const valid = await bcrypt.compare(args.password, user.password);

    if (!valid) {
      throw new AuthenticationError('Invalid password');
    }

    var cuenta = '';
    var tipo_id = 0;
    var conf_per = false;
    var conf_pass = false;
    var permiso_id = 0;

    if (user.funcionario) {
      cuenta = 'funcionario';
      tipo_id = user.funcionario.id;
    }  else if (user.apoderado) {
      cuenta = 'apoderado';
      tipo_id = user.apoderado.id;
    } else if (user.alumno) {
      cuenta = 'alumno';
      tipo_id = user.alumno.id;
      if (user.alumno.configuracion_perfil === 1) {
        conf_per = true;
      }
    }
    
    if (user.configuracion_password === 1) {
      conf_pass = true;
    }

    permiso_id = user.permiso_id;

    var token = {
      hash: jwt(user),
      tipo: cuenta,
      idTipo: tipo_id,
      perfilConfigurado: conf_per,
      configuracionPassword: conf_pass,
      usuario: user,
      permiso: permiso_id,
    };

    return token;
  }
};

export default login;