import { GraphQLString, graphql, GraphQLNonNull, GraphQLID, GraphQLBoolean } from "graphql"
import { GraphQLDate } from "graphql-iso-date"
import models from "../../../models";
import publicacionType from '../../types/publicacion.type';
import { ForbiddenError, AuthenticationError, UserInputError } from 'apollo-server';
const fs = require('fs');

const createPublicacion = {
  type: publicacionType,
  args: {
    titulo: {
      type: GraphQLNonNull(GraphQLString),
    },
    contenido: {
      type: GraphQLNonNull(GraphQLString),
    },
    fecha: {
      type: GraphQLDate,
    },
    foto: {
      type: GraphQLString,
    },
    interes_id: {
      type: GraphQLID,
    },
    visibilidad: {
      type: GraphQLBoolean,
    }
  },
  async resolve (root, { titulo, contenido, fecha, foto, interes_id, visibilidad }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso <= 1) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }
    
    let usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario
        },
        include: [
          {
            model: models.Funcionario,
            as: 'funcionario',
          },
        ],
      },
    );

    let interes = await models.Interes.findOne({
      where: {
        id: interes_id,
      },
    });

    if (interes === null) {
      throw new UserInputError('No se encontró el interés');
    }

    let foto_url = '/imagenes/publicacion.png';
    let hoy = new Date();

    if (foto && foto !== '') {
      const dir = 'storage/publicaciones/' + usuario.rut;
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

      fs.writeFileSync(dir + '/publicacion' + hoyTexto + ext, binary, 'binary', (err) => {
        if (err) throw err;
      });

      foto_url = '/imagenes/publicaciones/' + usuario.rut + '/publicacion' + hoyTexto + ext;
    }

    let visible = true;
    if (visibilidad !== null && visibilidad !== undefined) {
      visible = visibilidad;
    }

    return models.Publicacion.create({
      titulo: titulo,
      contenido: contenido,
      fecha: fecha,
      foto_url: foto_url,
      funcionario_id: usuario.funcionario.id,
      interes_id: interes_id,
      visibilidad: visible,
    });
  },
};

export default createPublicacion