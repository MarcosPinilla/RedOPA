import {  GraphQLString,  GraphQLNonNull, GraphQLBoolean } from 'graphql';
import models from '../../../models/index.js';
const bcrypt = require('bcrypt');
import { AuthenticationError } from 'apollo-server';
import generatePassword from '../../../services/password.service';
import nodemailer from 'nodemailer';

const recoverPassword = {
  type: GraphQLBoolean,
  args: {
    rut: {
      type: new GraphQLNonNull(GraphQLString)
    },
  },
  async resolve (root, { rut }) {
    const usuario = await models.Usuario.findOne(
      {
        where: {
          rut: rut,
        },
      },
    );

    if (usuario === null) {
      throw new AuthenticationError('No se encuentra usuario con este rut');
    }

    if (typeof usuario.rut === undefined) {
      throw new Error('El usuario no cuenta con correo');
    }

    let passwordGenerado = generatePassword();

    let transport = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      logger: true,
      debug: false,
    });

    /*transport.verify(function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });*/

    let mailOptions = {
      to: usuario.email,
      from: process.env.MAIL_USER,
      subject: 'Solicitud de recuperación de contraseña',
      text: 'Tu contraseña temporal es ' + passwordGenerado + ' , úsala para ingresar a OPA donde se te pedirá configurar una nueva contraseña.',
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return false;
        //return process.exit(1);
      }

      transport.close();
    });

    await usuario.update({
      password: bcrypt.hashSync(passwordGenerado, 10),
      configuracion_password: 0,
    });

    return true;
  }
};

export default recoverPassword;