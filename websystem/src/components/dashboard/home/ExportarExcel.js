import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import { Button, Grid, FormControl, InputLabel, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import SaveOutlined from '@material-ui/icons/SaveOutlined'
import { ALUMNOS } from '../../../graphql/queries/datosexceladmin';
import { CURSOS } from '../../../graphql/queries/cursos';
import { INTERES_CURSOS } from '../../../graphql/queries/interescursos';
import { INTERESES } from '../../../graphql/queries/intereses';
import { saveAs } from 'file-saver';
import Moment from 'moment';
import 'moment/locale/es'
const XLSX = require('xlsx');

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root2: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

const ExportarExcel = (props) => {
  const classes = useStyles();

  const { institucion_id } = props;

  const [checkedEvaluaciones, setCheckedEvaluaciones] = React.useState(true);
  const [checkedActivos, setCheckedActivos] = React.useState(true);
  const [checkedAutoevaluaciones, setCheckedAutoevaluaciones] = React.useState(true);
  const [checkedCoevaluaciones, setCheckedCoevaluaciones] = React.useState(true);
  const [checkedApoderados, setCheckedApoderados] = React.useState(true);

  const handleCheckboxEvaluaciones = (event) => {
    setCheckedEvaluaciones(event.target.checked);
  }

  const handleCheckboxActivos = (event) => {
    setCheckedActivos(event.target.checked);
  }

  const handleCheckboxAutoevaluaciones = (event) => {
    setCheckedAutoevaluaciones(event.target.checked);
  }

  const handleCheckboxCoevaluaciones = (event) => {
    setCheckedCoevaluaciones(event.target.checked);
  }

  const handleCheckboxApoderados = (event) => {
    setCheckedApoderados(event.target.checked);
  }

  const { loading, error, data, refetch } = useQuery(ALUMNOS, 
    {
      variables: {institucion_id},
      onError(error){
        console.log(error.message)
      }
    }
  );

  const { loading: loadingCursos, error: errorCursos, data: dataCursos, refetch: refetchCursos } = useQuery(CURSOS, {
    variables: {institucion_id},
    onError(error){
      console.log(error.message)
    }
  });

  const { loading: loadingInteres, error: errorInteres, data: dataInteres, refetch: refetchInteres } = useQuery(INTERES_CURSOS, {
    variables: {institucion_id},
    onError(error){
      console.log(error.message)
    }
  });

  function formatRut(rut) {
    var actual = rut.replace(/^0+/, "");
    if (actual != '' && actual.length > 1) {
        var sinPuntos = actual.replace(/\./g, "");
        var actualLimpio = sinPuntos.replace(/-/g, "");
        var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
        var rutPuntos = "";
        var i = 0;
        var j = 1;
        for (i = inicio.length - 1; i >= 0; i--) {
            var letra = inicio.charAt(i);
            rutPuntos = letra + rutPuntos;
            if (j % 3 == 0 && j <= inicio.length - 1) {
                rutPuntos = "." + rutPuntos;
            }
            j++;
        }
        var dv = actualLimpio.substring(actualLimpio.length - 1);
        rutPuntos = rutPuntos + "-" + dv;
    }
    return rutPuntos;
  }

  const exportar = () => {
    let libro = XLSX.utils.book_new();
    libro.props = {
      Title: "Estadísticas",
      Author: "Centro OPA",
      CreatedDate: new Date(),
    };

    libro.SheetNames.push("Evaluaciones por sujeto");

    let hoja = XLSX.utils.json_to_sheet([
      {
        A: "Identificación",
        H: "Perfil Sociodemográfico",
        L: "Información Confianza App",
        P: "Intereses",
        S: "Promedio puntajes en",
        U: "Autoevaluaciones Negativas",
        V: "Autoevaluaciones Positivas",
        W: "Evaluaciones Compañeros Negativas",
        X: "Evaluaciones Compañeros Positivas",
        Y: "Evaluaciones Apoderados Negativas",
        Z: "Evaluaciones Apoderados Positivas",
        AA: "Evaluaciones Funcionarios Positivas",
        AB: "Evaluaciones Funcionarios Negativas"
      }
    ], {header: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "AB"], skipHeader: true});

    XLSX.utils.sheet_add_json(hoja, [
      {
        A: 'Nombre',
        B: 'Rut',
        C: 'Nivel',
        D: 'Subgrupo',
        E: 'Consentimiento',
        F: 'Fecha activación App',
        G: 'Fecha último uso App',
        H: 'Sexo',
        I: 'Etnia',
        J: 'Identificación de género',
        K: 'Orientación de género',
        L: 'N° alumnos de confianza',
        M: 'N° funcionarios de confianza',
        N: 'Número apoderados',
        O: 'N° otros estudiantes que lo ingresan de confianza',
        P: 'Interés 1',
        Q: 'Interés 2',
        R: 'Interés 3',
        S: 'Puntaje día anterior',
        T: 'Últimos 7 días',
        U: 'N° autoevaluaciones negativas últimos 7 días',
        V: 'N° autoevaluaciones positivas últimos 7 días',
        W: 'N° evaluaciones negativas últimos 7 días',
        X: 'N° evaluaciones positivas últimos 7 días',
        Y: 'N° evaluaciones negativas últimos 7 días',
        Z: 'N° evaluaciones positivas últimos 7 días',
        AA: 'N° evaluaciones negativas últimos 7 días',
        AB: 'N° evaluaciones positivas últimos 7 días'
      }
    ], {skipHeader: true, origin: -1});

    data.alumnosExcelQuery.forEach(alumno => {
      let promedioRiesgo = 0;
      if (alumno.riesgosDiarios.length > 0) {
        alumno.riesgosDiarios.forEach(riesgoDiario => {
          promedioRiesgo += riesgoDiario.riesgo;
        });
        promedioRiesgo = promedioRiesgo / alumno.riesgosDiarios.length;
      }

      let autoevaluacionesPositivas = 0;
      let autoevaluacionesNegativas = 0;
      let coevaluacionesPositivas = 0;
      let coevaluacionesNegativas = 0;
      let evaluacionesApoderadosPositivas = 0;
      let evaluacionesApoderadosNegativas = 0;
      let evaluacionesFuncionariosPositivas = 0;
      let evaluacionesFuncionariosNegativas = 0;

      if (alumno.evaluaciones.length > 0) {
        alumno.evaluaciones.forEach(evaluacion => {
          if (evaluacion.evaluador.funcionario !== null) {
            if (evaluacion.emocion.id > 4) evaluacionesFuncionariosNegativas++;
            else evaluacionesFuncionariosPositivas++;
          } else if (evaluacion.evaluador.apoderado !== null) {
            if (evaluacion.emocion.id > 4) evaluacionesApoderadosNegativas++;
            else evaluacionesApoderadosPositivas++;
          } else if (evaluacion.evaluador.alumno !== null) {
            if (evaluacion.evaluador.alumno.id === alumno.id) {
              if (evaluacion.emocion.id > 4) autoevaluacionesNegativas++;
              else autoevaluacionesPositivas++;
            } else {
              // Coevaluación
              if (evaluacion.emocion.id > 4) coevaluacionesNegativas++;
              else coevaluacionesPositivas++;
            }
          }
        });
      }

      XLSX.utils.sheet_add_json(hoja, [
        {
          A: alumno.cuenta.nombres.split(' ')[0] + ' ' + alumno.cuenta.apellidos.split(' ')[0],
          B: formatRut(alumno.cuenta.rut),
          C: alumno.curso.nivel + '°',
          D: alumno.curso.letra,
          E: alumno.cuenta.consentimiento ? 'SI' : 'NO',
          F: alumno.cuenta.consentimiento ? Moment(alumno.cuenta.consentimiento).parseZone().format('DD MMMM YYYY HH:mm') : '',
          G: alumno.evaluaciones[alumno.evaluaciones.length - 1] ? Moment(alumno.evaluaciones[alumno.evaluaciones.length - 1].fecha).parseZone().format('DD MMMM YYYY HH:mm') : '',
          H: alumno.cuenta.genero.nombre,
          I: alumno.cuenta.puebloIndigena ? alumno.cuenta.puebloIndigena.nombre : 'Ninguna',
          J: alumno.cuenta.identidadGenero ? alumno.cuenta.identidadGenero.nombre : 'Hetero',
          K: alumno.cuenta.orientacionSexual ? alumno.cuenta.orientacionSexual.nombre : 'Hetero',
          L: alumno.amigos.length,
          M: alumno.contactos.length,
          N: alumno.apoderados.length,
          O: 0,
          P: alumno.intereses.length > 0 ? alumno.intereses[0].nombre : '',
          Q: alumno.intereses.length > 1 ? alumno.intereses[1].nombre : '',
          R: alumno.intereses.length > 2 ? alumno.intereses[2].nombre : '',
          S: alumno.riesgosDiarios.length > 0 ? alumno.riesgosDiarios[0].riesgo : 0,
          T: promedioRiesgo,
          U: autoevaluacionesNegativas,
          V: autoevaluacionesPositivas,
          W: coevaluacionesNegativas,
          X: coevaluacionesPositivas,
          Y: evaluacionesApoderadosNegativas,
          Z: evaluacionesApoderadosPositivas,
          AA: evaluacionesFuncionariosNegativas,
          AB: evaluacionesFuncionariosPositivas,
        }
      ], {skipHeader: true, origin: -1});
    });
    
    libro.Sheets["Evaluaciones por sujeto"] = hoja;

    libro.SheetNames.push("Intereses");

    let header = ["Interés"];

    dataCursos.cursosInstitucionQuery.forEach(curso => {
      header.push(curso.nivel + '°' + curso.letra);
    });
    
    let hoja2 = XLSX.utils.aoa_to_sheet([header], {header: ["A", "B", "C", "D", "E", "F", "G"], skipHeader: true});

    dataInteres.interesesCursoQuery.forEach(datosInteres => {
      let fila = [];

      fila.push(datosInteres.nombre);
      datosInteres.cantidades.forEach(cantidad => {
        fila.push(cantidad.cantidad);
      })

      XLSX.utils.sheet_add_aoa(hoja2, [fila], {skipHeader: true, origin: -1});
    });

    libro.Sheets["Intereses"] = hoja2;

    let libroSalida = XLSX.write(libro, {bookType: 'xlsx', type: 'binary'});

    let fecha = new Date();

    saveAs(new Blob([s2ab(libroSalida)], {type: "application/octet-stream"}), 'estadisticas-' + Moment(fecha).parseZone().format('DD-MM-YYYY-HH-mm') + '.xlsx');
  }

  function s2ab(s) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (var i=0; i<s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf
  }

  //https://github.com/SheetJS/sheetjs/issues/1400
  //https://github.com/protobi/js-xlsx

  if (loading || loadingCursos || loadingInteres) return(
    <Grid container
      direction="column"
      justify="center"
      alignItems="center"
      style={{width: '100%'}}
    >
      <Grid item xs={12}>
        <Button
          disabled
          variant="contained"
          color="primary"
          className={classes.button}
        >
          <SaveOutlined />Descargar Excel
        </Button>
      </Grid>
    </Grid>
  );

  return(
    <Grid container
      direction="column"
      justify="center"
      alignItems="center"
      style={{width: '100%'}}
    >
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => exportar()}
        >
          <SaveOutlined />Descargar Excel
        </Button>
      </Grid>
    </Grid>
  )
}

export default ExportarExcel;