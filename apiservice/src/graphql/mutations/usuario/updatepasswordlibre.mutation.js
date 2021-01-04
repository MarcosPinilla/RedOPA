import {  GraphQLString,  GraphQLNonNull, GraphQLBoolean } from 'graphql';
import models from '../../../models/index.js';
const bcrypt = require('bcrypt');
import { AuthenticationError, UserInputError } from 'apollo-server';

const updatePasswordLibre = {
  type: GraphQLBoolean,
  args: {
    passwordActual: {
      type: new GraphQLNonNull(GraphQLString)
    },
    passwordNuevo: {
      type: new GraphQLNonNull(GraphQLString)
    },
    passwordRepetido: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, { passwordActual, passwordNuevo, passwordRepetido }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario,
        },
      },
    );

    if (usuario === null) {
      throw new AuthenticationError('El usuario no existe');
    }

    const valid = await bcrypt.compare(passwordActual, usuario.password);

    if (!valid) {
      throw new AuthenticationError('Contraseña inválida');
    }

    if (usuario.configuracion_password !== 1) {
      throw new Error('Debe configurar su contraseña para poder cambiarla');
    }

    if (passwordNuevo === '' || passwordNuevo === null) {
      throw new UserInputError('Debe ingresar un nuevo password');
    }

    if (await bcrypt.compare(passwordNuevo, usuario.password)) {
      throw new UserInputError('El nuevo password debe ser distinto al anterior');
    }

    if (passwordNuevo !== passwordRepetido) {
      throw new UserInputError('Contraseña nueva incorrectamente confirmada');
    }

    usuario.update({
      password: bcrypt.hashSync(passwordNuevo, 10),
    });

    if (await bcrypt.compare(passwordNuevo, usuario.password)) {
      return true;
    }

    return false;
  }
};

export default updatePasswordLibre;