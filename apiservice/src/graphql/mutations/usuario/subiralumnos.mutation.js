import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLNonNull, File, GraphQLString } from "graphql";
const XLSX = require('xlsx');
import models from "../../../models";
const bcrypt = require('bcrypt');
import { ForbiddenError, AuthenticationError, UserInputError } from 'apollo-server';
const fs = require('fs');

const subirAlumnos = {
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

    let archivo = dir + '/alumnos' + hoyTexto + ext;

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

             /* Variables para el alumno y el apoderado */
            let rutAlumno = '';
            let passwordAlumno = '';
            let nombresAlumno = '';
            let apellidosAlumno = '';
            let telefonoAlumno = '';
            let generoAlumno = 0;
            let nacimientoAlumno = new Date();
            let rutApoderado = '';
            let passwordApoderado = '';
            let nombresApoderado = '';
            let apellidosApoderado = '';
            let telefonoApoderado = '';
            let generoApoderado = 0;

            /* Rut alumno */
            rutAlumno = filas[indexx].rut.toString().replace('-', '').replace(/\./g, '').replace(/\s+/g, '').toLowerCase();
            
            /* Se comprueba que el alumno con ese rut no está ya registrado */
            let alm = await models.Usuario.findOne({
              where: {
                rut: rutAlumno,
              }
            });

            if (alm === null) {
              passwordAlumno = rutAlumno.substring(rutAlumno.length - 6, rutAlumno.length).toLowerCase();

              /* Nombres alumno */
              if (filas[indexx].nombres !== undefined) {
                let nombresArray = filas[indexx].nombres.split(' ');

                for (let i = 0; i < nombresArray.length; i++) {
                  if (nombresArray[i] !== '' && nombresArray[i] !== ' ') {
                    nombresAlumno += nombresArray[i].replace(/\s+/g, '').charAt(0).toUpperCase() + nombresArray[i].substring(1, nombresArray[i].length).toLowerCase();
                    if ((i + 1) !== nombresArray.length) nombresAlumno += ' ';
                  }
                }
              }
              
              /* Apellidos alumno */
              if (filas[indexx].apellidos !== undefined) {
                let apellidosArray = filas[indexx].apellidos.split(' ');

                for (let i = 0; i < apellidosArray.length; i++) {
                  if (apellidosArray[i] !== '' && apellidosArray[i] !== ' ') {
                    apellidosAlumno += apellidosArray[i].replace(/\s+/g, '').charAt(0).toUpperCase() + apellidosArray[i].substring(1, apellidosArray[i].length).toLowerCase();
                    if ((i + 1) !== apellidosArray.length) apellidosAlumno += ' ';
                  }
                }
              }

              /* Teléfono alumno */
              if (filas[indexx].telefono !== undefined) {
                telefonoAlumno = filas[indexx].telefono.toString().replace(/\s+/g, '');
              }

              /* Género alumno */
              if (filas[indexx].genero !== undefined) {
                let genero = filas[indexx].genero.toString().toLowerCase();
                if (genero === 'm' || genero === 'masculino' || genero === 'hombre') generoAlumno = 1;
                else generoAlumno = 2;
              } else generoAlumno = 1;

              /* Fecha de nacimiento del alumno */
              if (filas[indexx].fecha_nacimiento !== undefined) {
                if (filas[indexx].fecha_nacimiento !== undefined && filas[indexx].fecha_nacimiento !== null
                  && filas[indexx].fecha_nacimiento.toString() !== 'Invalid Date') {

                  nacimientoAlumno = new Date(filas[indexx].fecha_nacimiento);
                }
              }

              /* Curso del alumno */
              let cursoAlumno = {};
              if (filas[indexx].curso !== undefined) {
                let nivelCurso = '' + filas[indexx].curso.charAt(0);
                let letraCurso = '' + filas[indexx].curso.charAt(filas[indexx].curso.length - 1);

                /* Comprobación de si el curso es de enseñanza media o básica */
                let etapaCurso = 2;
                if (filas[indexx].etapa_curso !== undefined && filas[indexx].etapa_curso !== null) {
                  let etapa = filas[indexx].etapa_curso.toString().toLowerCase().replace(/\s+/g, '');
                  if (etapa === 'básica' || etapa === 'basica' || etapa === 'b' || etapa === '1') {
                    etapaCurso = 1;
                  }
                }

                /* Se comprueba que el curso no esté ya registrado en la base */
                cursoAlumno = await models.Curso.findOne({
                  where: {
                    nivel: nivelCurso,
                    letra: letraCurso,
                    etapa: etapaCurso,
                    institucion_id: institucion,
                  }
                });

                /* Si no existe, se crea el curso */
                if (cursoAlumno === null) {
                  cursoAlumno = await models.Curso.create({
                    nivel: nivelCurso,
                    letra: letraCurso,
                    etapa: etapaCurso,
                    institucion_id: institucion,
                  });
                }
              }

              /* Se crea la cuenta del alumno */
              const usuarioAlumno = await models.Usuario.create({
                email: '',
                password: bcrypt.hashSync(passwordAlumno, 10),
                nombres: nombresAlumno,
                apellidos: apellidosAlumno,
                telefono: telefonoAlumno,
                rut: rutAlumno,
                nacimiento: nacimientoAlumno,
                estado: 1,
                foto_url: '/imagenes/opa_icon.png',
                configuracion_password: 0,
                institucion_id: institucion,
                permiso_id: 1,
                genero_id: generoAlumno,
              });

              if (usuarioAlumno !== null) {

                /* Se crea el registro del alumno */
                const alumno = await models.Alumno.create({
                  curso_id: cursoAlumno.id,
                  usuario_id: usuarioAlumno.id,
                  riesgo: 1,
                  minoria_id: 5,
                  alias: usuarioAlumno.nombres.split(' ')[0],
                });

                /* Se comprueba que estén los datos del apoderado */
                if (filas[indexx].rut_apoderado !== undefined && filas[indexx].rut_apoderado !== '' 
                  && filas[indexx].rut_apoderado !== ' ' && filas[indexx].rut_apoderado !== null) {
                  
                  /* Rut del apoderado */
                  rutApoderado = filas[indexx].rut_apoderado.toString().replace('-', '').replace(/\./g, '').replace(/\s+/g, '').toLowerCase();

                  /* Se comprueba que el apoderado no esté ya registrado en el sistema */
                  let apd = await models.Usuario.findOne({
                    where: {
                      rut: rutApoderado,
                    }
                  });

                  if (apd === null) {
                    /* Contraseña del apoderado */
                    passwordApoderado = rutApoderado.substring(rutApoderado.length - 6, rutApoderado.length).toLowerCase();

                    /* Nombres apoderado */
                    if (filas[indexx].nombres_apoderado !== undefined) {
                      let nombresArray = filas[indexx].nombres_apoderado.split(' ');
                      for (let i = 0; i < nombresArray.length; i++) {
                        nombresApoderado += nombresArray[i].charAt(0).toUpperCase() + nombresArray[i].substring(1, nombresArray[i].length).toLowerCase();
                        if ((i + 1) !== nombresArray.length) nombresApoderado += ' ';
                      }
                    }
                    
                    /* Apellidos apoderado */
                    if (filas[indexx].apellidos_apoderado !== undefined) {
                      let apellidosArray = filas[indexx].apellidos_apoderado.split(' ');
                      for (let i = 0; i < apellidosArray.length; i++) {
                        apellidosApoderado += apellidosArray[i].charAt(0).toUpperCase() + apellidosArray[i].substring(1, apellidosArray[i].length).toLowerCase();
                        if ((i + 1) !== apellidosArray.length) apellidosApoderado += ' ';
                      }
                    }

                    /* Teléfono apoderado */
                    if (filas[indexx].telefono_apoderado !== undefined) {
                      telefonoApoderado = filas[indexx].telefono_apoderado;
                    }

                    /* Género apoderado */
                    if (filas[indexx].genero_apoderado !== undefined) {
                      let genero = filas[indexx].genero_apoderado.toString().toLowerCase();
                      if (genero === 'm' || genero === 'masculino' || genero === 'hombre') generoApoderado = 1;
                      else generoApoderado = 2;
                    } else generoApoderado = 1;

                    /* Se crea cuenta del apoderado */
                    const usuarioApoderado = await models.Usuario.create({
                      email: '',
                      password: bcrypt.hashSync(passwordApoderado, 10),
                      nombres: nombresApoderado,
                      apellidos: apellidosApoderado,
                      telefono: telefonoApoderado,
                      rut: rutApoderado,
                      estado: 1,
                      foto_url: '/imagenes/opa_icon.png',
                      configuracion_password: 0,
                      institucion_id: institucion,
                      permiso_id: 1,
                      genero_id: generoApoderado,
                    });

                    if (usuarioApoderado !== null) {

                      /* Se crea registro del apoderado */
                      const apoderado = await models.Apoderado.create({
                        usuario_id: usuarioApoderado.id,
                      });

                      /* Se vincula apoderado a alumno */
                      const apoderadoAlumno = await models.ApoderadoAlumno.create({
                        apoderado_id: apoderado.id,
                        alumno_id: alumno.id,
                      });
                    } else throw new Error ('Error en los datos del apoderado');
                  }
                }
              } else throw new Error('Error en los datos del alumno');
            }
          }
        }
      }
    }
    
    return true;
  },
};

export default subirAlumnos;