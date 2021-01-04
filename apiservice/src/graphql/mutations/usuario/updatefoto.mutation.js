import { GraphQLString, GraphQLNonNull } from 'graphql';
import models from '../../../models';
import usuarioType from '../../types/usuario.type';
import { ForbiddenError, AuthenticationError } from 'apollo-server';
const fs = require('fs');

const updateFoto = {
  type: GraphQLNonNull(usuarioType),
  args: {
    foto: {
      type: GraphQLString,
    },
  },
  async resolve (root, { foto }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    const usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario,
        },
      },
    );

    if (foto && foto !== '') {
      const dir = 'storage/usuarios/' + usuario.rut;
      var ext = '';

      if (!foto.match(/^data:image\/*/)) {
        throw new Error('Archivo inválido, debe subir una imagen');
      }

      if (foto.match(/\/jpeg;base64,/)) {
        ext = '.jpg';
        var img = foto.replace(/^data:image\/jpeg;base64,/, '');
      } else if (foto.match(/\/png;base64,/)) {
        ext = '.png';
        var img = foto.replace(/^data:image\/png;base64,/, '');
      } else throw Error('Formato de imagen inválido');

      var binary = new Buffer(img, 'base64').toString('binary');

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      };

      /*console.log(usuario.foto_url.split('/')[4]);

      if (fs.existsSync(dir + '/perfil.jpg')) {
        fs.unlinkSync(dir + '/perfil.jpg');
      } else if (fs.existsSync(dir + '/perfil.png')) {
        fs.unlinkSync(dir + '/perfil.png');
      };*/

      let hoy = new Date();
      let anho = hoy.getFullYear();
      let mes = hoy.getMonth() + 1;
      if (mes < 10) mes = '0' + mes;
      let fecha = hoy.getDate();
      if (fecha < 10) fecha = '0' + fecha;
      let hora = hoy.getHours();
      if (hora < 10) hora = '0' + hora;
      let minutos = hoy.getMinutes();
      if (minutos < 10) minutos = '0' + minutos;
      let segundos = hoy.getSeconds();
      if (segundos < 10) segundos = '0' + segundos;
      let hoyTexto = '-' + anho + mes + fecha + hora + minutos + segundos;

      fs.writeFileSync(dir + '/perfil' + hoyTexto + ext, binary, 'binary', (err) => {
        if (err) throw err;
      });

      usuario.update({
        foto_url: '/imagenes/usuarios/' + usuario.rut + '/perfil' + hoyTexto + ext,
      })
    }

    return usuario;
  },
};

export default updateFoto;