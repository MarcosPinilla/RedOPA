import {  GraphQLString,  GraphQLNonNull, GraphQLBoolean } from 'graphql';
import models from '../../../models/index.js';
const bcrypt = require('bcrypt');
import { AuthenticationError, UserInputError, ForbiddenError } from 'apollo-server';

const updatePassword = {
  type: GraphQLBoolean,
  args: {
    password_defecto: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password_nuevo: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password_repetido: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, { password_defecto, password_nuevo, password_repetido }, { me }) {
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

    if (usuario.consentimiento === null) {
      throw new ForbiddenError('El usuario no ha aceptado el acuerdo de confidencialidad');
    }

    const valid = await bcrypt.compare(password_defecto, usuario.password);

    if (!valid) {
      throw new AuthenticationError('Contraseña asignada inválida');
    }

    if (usuario.configuracion_password === 1) {
      throw new Error('Su contraseña ya fue configurada');
    }

    if (password_nuevo === '' || password_nuevo === null) {
      throw new UserInputError('Debe ingresar un nuevo password');
    }

    if (await bcrypt.compare(password_nuevo, usuario.password)) {
      throw new UserInputError('El nuevo password debe ser distinto al anterior');
    }

    if (password_nuevo !== password_repetido) {
      throw new UserInputError('Contraseña nueva incorrectamente confirmada');
    }

    usuario.update({
      password: bcrypt.hashSync(password_nuevo, 10),
      configuracion_password: 1,
    });

    if (await bcrypt.compare(password_nuevo, usuario.password)) {
      return true;
    }

    return false;
  }
};

export default updatePassword;