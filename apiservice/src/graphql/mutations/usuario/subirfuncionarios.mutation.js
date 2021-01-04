import { GraphQLBoolean, GraphQLInt, GraphQLString } from "graphql";
const XLSX = require('xlsx');
import models from "../../../models";
const bcrypt = require('bcrypt');
import { ForbiddenError, AuthenticationError, UserInputError } from 'apollo-server';
const fs = require('fs');

const subirFuncionarios = {
  type: GraphQLBoolean,
  args: {
    excel: {
      type: GraphQLString,
    },
    institucion_id: {
      type: GraphQLInt,
    },
  },
  async resolve (source, { excel, institucion_id }, { me }) {
    if (!me) throw new AuthenticationError('Debe ingresar un token de autenticación');

    if (me.permiso < 2) {
      throw new ForbiddenError('No tiene los permisos para acceder a esta función');
    }

    const usuario = await models.Usuario.findOne(
      {
        where: {
          id: me.usuario,
        },
        include: [{
          model: models.Institucion,
          as: 'institucion',
        }]
      },
    );

    /* Recibir y guardar archivo en servidor */
    let institucion = 0;
    if (usuario.permiso_id === 3) {
      if (institucion_id !== null && institucion_id !== '' && institucion_id !== 0) {
        institucion = institucion_id;
      } else throw new UserInputError('Debe proporcionar un id de institución');
    }
    else {
      institucion = usuario.institucion.id;
    }
    let dir = 'storage/documentos/' + institucion;
    let ext = '';

    if (!excel.match(/^data:application\/*/)) {
      throw new UserInputError('Archivo inválido, debe subir un excel');
    }

    if (excel.match(/\/vnd.ms-excel;base64,/) ) {
      ext = '.xls';
      excel = excel.replace(/^data:application\/vnd.ms-excel;base64,/, '');
    } else if (excel.match(/\/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,/)) {
      ext = '.xlsx';
      excel = excel.replace(/^data:application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,/, '');
    } else throw UserInputError('Formato de archivo inválido');

    var binary = new Buffer(excel, 'base64').toString('binary');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    };

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

    let archivo = dir + '/funcionarios' + hoyTexto + ext;

    fs.writeFileSync(archivo, binary, 'binary', (err) => {
      if (err) throw err;
    });

    /* Obtener datos del archivo */
    let libro = XLSX.readFile(archivo, {type: 'binary', cellDates: true});

    /* Recorrer hojas del excel */
    for (let index = 0; index < libro.SheetNames.length; index++) {
      let hoja = libro.Sheets[libro.SheetNames[index]];

      if (XLSX.utils.sheet_to_row_object_array(hoja).length !== 0) {
        let filas = XLSX.utils.sheet_to_row_object_array(hoja);

        /* Recorrer filas de la hoja */
        for (let indexx = 0; indexx < filas.length; indexx++) {

          /* Comprobar que la fila tenga datos */
          if (filas[indexx].rut !== undefined && filas[indexx].rut !== ''
           && filas[indexx].rut !== ' ' && filas[indexx].rut !== null) {

            /* Variables para el funcionario */
            let rutFuncionario = '';
            let passwordFuncionario = '';
            let nombresFuncionario = '';
            let apellidosFuncionario = '';
            let emailFuncionario = '';
            let telefonoFuncionario = '';
            let generoFuncionario = 0;
            let nacimientoFuncionario = new Date();
            let cargoFuncionario = '';

            /* Rut funcionario */
            rutFuncionario = filas[indexx].rut.toString().replace('-', '').replace(/\./g, '').replace(/\s+/g, '').toLowerCase();

            /* Se comprueba que el funcionario con ese rut no esté ya registrado */
            let func = await models.Usuario.findOne({
              where: {
                rut: rutFuncionario,
              },
            });

            if (func === null) {
              passwordFuncionario = rutFuncionario.substring(rutFuncionario.length - 6, rutFuncionario.length).toLowerCase();

              /* Email funcionario */
              if (filas[indexx].email !== undefined) {
                emailFuncionario = filas[indexx].email.toString().replace(/\s+/g, '');
              }

              /* Nombres funcionario */
              if (filas[indexx].nombres !== undefined) {
                let nombresArray = filas[indexx].nombres.split(' ');

                for (let i = 0; i < nombresArray.length; i++) {
                  if (nombresArray[i] !== '' && nombresArray[i] !== ' ') {
                    nombresFuncionario += nombresArray[i].replace(/\s+/g, '').charAt(0).toUpperCase() + nombresArray[i].substring(1, nombresArray[i].length).toLowerCase();
                    if ((i + 1) !== nombresArray.length) nombresFuncionario += ' ';
                  }
                }
              }
              
              /* Apellidos funcionario */
              if (filas[indexx].apellidos !== undefined) {
                let apellidosArray = filas[indexx].apellidos.split(' ');

                for (let i = 0; i < apellidosArray.length; i++) {
                  if (apellidosArray[i] !== '' && apellidosArray[i] !== ' ') {
                    apellidosFuncionario += apellidosArray[i].replace(/\s+/g, '').charAt(0).toUpperCase() + apellidosArray[i].substring(1, apellidosArray[i].length).toLowerCase();
                    if ((i + 1) !== apellidosArray.length) apellidosFuncionario += ' ';
                  }
                }
              }

              /* Teléfono funcionario */
              if (filas[indexx].telefono !== undefined) {
                telefonoFuncionario = filas[indexx].telefono.toString().replace(/\s+/g, '');
              }

              /* Género funcionario */
              if (filas[indexx].genero !== undefined) {
                let genero = filas[indexx].genero.toString().toLowerCase();
                if (genero === 'm' || genero === 'masculino' || genero === 'hombre') generoFuncionario = 1;
                else generoFuncionario = 2;
              } else generoFuncionario = 1;

              /* Fecha de nacimiento del funcionario */
              if (filas[indexx].fecha_nacimiento !== undefined) {
                if (filas[indexx].fecha_nacimiento !== undefined && filas[indexx].fecha_nacimiento !== null
                  && filas[indexx].fecha_nacimiento.toString() !== 'Invalid Date') {
                  let fechaArray = filas[indexx].fecha_nacimiento.toString().split('-');
                  let fechaFinal = '';
                  for (let i = 0; i < fechaArray.length; i++) {
                    if (fechaArray[i].length < 2) {
                      fechaArray[i] = '0' + fechaArray[i];
                    }
                    fechaFinal += fechaArray[i];
                    if ((i + 1) !== fechaArray.length) fechaFinal += '-';
                  }
                  nacimientoFuncionario = new Date(fechaFinal);
                }
                if (nacimientoFuncionario.toString() === 'Invalid Date') {
                  nacimientoFuncionario = new Date();
                }
              }

              /* Cargo del funcionario */
              if (filas[indexx].cargo !== undefined) {
                let cargoArray = filas[indexx].cargo.split(' ');

                for (let i = 0; i < cargoArray.length; i++) {
                  if (cargoArray[i] !== '' && cargoArray[i] !== ' ') {
                    cargoFuncionario += cargoArray[i].charAt(0).toUpperCase() + cargoArray[i].substring(1, cargoArray[i].length).toLowerCase();
                    if ((i + 1) !== cargoArray.length) cargoFuncionario += ' ';                    
                  }
                }
              }

              /* Se crea la cuenta del funcionario */
              const usuarioFuncionario = await models.Usuario.create({
                email: emailFuncionario,
                password: bcrypt.hashSync(passwordFuncionario, 10),
                nombres: nombresFuncionario,
                apellidos: apellidosFuncionario,
                telefono: telefonoFuncionario,
                rut: rutFuncionario,
                nacimiento: nacimientoFuncionario,
                estado: 1,
                foto_url: '/imagenes/opa_icon.png',
                configuracion_password: 0,
                institucion_id: institucion,
                permiso_id: 1,
                genero_id: generoFuncionario,
              });

              if (usuarioFuncionario !== null) {

                /* Se crea el registro del funcionario */
                const funcionario = await models.Funcionario.create({
                  usuario_id: usuarioFuncionario.id,
                  cargo: cargoFuncionario,
                });                    
              }
            }
          }
        }
      }
    }

    return true;
  },
};

export default subirFuncionarios;