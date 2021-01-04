import { GraphQLNonNull, GraphQLID, GraphQLBoolean } from "graphql"
import models from "../../../models";
import { ForbiddenError, AuthenticationError, UserInputError } from 'apollo-server';
const fs = require('fs');

const deleteAlumno = {
  type: GraphQLBoolean,
  args: {
    alumno_id: {
      type: GraphQLNonNull(GraphQLID),
    }
  },
  async resolve (root, { alumno_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso < 2) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    let alumno = await models.Alumno.findOne({
      where: {
        id: alumno_id,
      },
      include: [{
        model: models.Usuario,
        as: 'cuenta',
        required: true,
      }],
    });

    if (alumno === null) {
      throw new UserInputError('No se encontró el alumno');
    }

    if (me.permiso === 2) {
      if (alumno.cuenta.institucion_id !== me.institucion) {
        throw new ForbiddenError('El alumno no pertenece a su institución');
      }
    }

    let usuarioAlumno = await models.Usuario.findOne({
      where: {
        id: alumno.usuario_id,
      },
    });

    if (usuarioAlumno === null) {
      throw new UserInputError('No se encontró el usuario');
    }

    alumno.destroy();
    usuarioAlumno.destroy();

    return true;
  },
};

export default deleteAlumno;