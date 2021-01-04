import jwt from 'jsonwebtoken';
import moment from 'moment';
var secret = process.env.SECRET;

/**
 * @method
 * @version 1.0.0
 * @param user
 * @todo Create token
 * @return Token
 */
export default async function createToken(user) {
  var cuenta = '';
  if (user.funcionario) {
    cuenta = 'funcionario';
  }  else if (user.apoderado) {
    cuenta = 'apoderado';
  } else cuenta = 'alumno';

  var payload = {
    usuario: user.id,
    rut: user.rut,
    institucion: user.institucion.id,
    permiso: user.permiso.id,
    tipo: cuenta,
  }

  return jwt.sign(payload, secret);
}