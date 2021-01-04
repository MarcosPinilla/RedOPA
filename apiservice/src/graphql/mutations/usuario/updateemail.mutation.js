import { GraphQLBoolean, GraphQLInt, GraphQLString } from 'graphql';
import models from '../../../models';
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server';
import nodemailer from 'nodemailer';

const updateEmail = {
  type: GraphQLBoolean,
  args: {
    correo: {
      type: GraphQLString,
    },
    numero: {
      type: GraphQLString,
    }
  },
  async resolve (root, { correo, numero }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario,
        },
      },
    );

    /* Comprobar que correo no esté en uso */
    const user = await models.Usuario.findOne({
      where: {
        email: correo,
      },
    });

    if (user !== null && user.id !== usuario.id) {
      throw new Error('El correo ya está en uso, seleccione otro');
    }

    if (numero !== null && numero !== '') {
      usuario.update({
        telefono: '+569' + numero,
      });
    }

    let transport = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      logger: true,
      debug: false,
    });

    let mailOptions = {
      to: correo,
      from: process.env.MAIL_USER,
      subject:'no reply',
      text: 'Te enviamos este mensaje para comprobar que tu correo fue configurado' +
      ' correctamente.\n¡Ahora puedes ingresar a OPA usando tu correo!',
    };

    let response = await transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return false;
      } else {
        usuario.update({
          email: correo,
        });
        return true;
      }
    });

    return true;
  }
};

export default updateEmail;