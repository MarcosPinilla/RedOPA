import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import GroupAdd from '@material-ui/icons/GroupAdd';
import { Grid } from '@material-ui/core';

const AGREGAR_ALUMNO = gql`
  mutation createAlumno($rut: String!, $email: String, $nombres: String!, $apellidos: String!, $telefono: String, $nacimiento: String, $genero_id: ID!, $institucion_id: ID, $curso_id: ID!) {
    createAlumno(rut: $rut, email: $email, nombres: $nombres, apellidos: $apellidos, telefono: $telefono, nacimiento: $nacimiento, genero_id: $genero_id, institucion_id: $institucion_id, curso_id: $curso_id) {
      id,
    }
  }
`;

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
  errorText: {
    color: 'red',
    fontSize: 15,
    fontWeight: "fontWeightMedium"
  }
}));

const AgregarApoderado = (props) => {
  const classes = useStyles();
  const { alumno, curso_id, cerrar, institucion_id } = props;
  const institucion = localStorage.getItem("institucion");
  const permiso = localStorage.getItem('permisoid');
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [createAlumno, {data, loading, error}] = useMutation(
    AGREGAR_ALUMNO,
    {
      onCompleted({ createAlumno }) {
        cerrar();
      },
      onError(onerror) {
        let message = ''; 
        if (onerror.message.startsWith('GraphQL error:')) {
          message = onerror.message.replace('GraphQL error:', '');
        } else {
          message = 'Error del servidor';
        }
        setErrorMsg(message);
      }
    }
  );


  function requerirInputs() {
    if (alumno.rut == '' || alumno.nombres == '' || alumno.apellidos == '' || alumno.genero_id === undefined) {
      return true;
    } else return false;
  }
  
  function unformatRut(rut) {
    return rut.replace(/\s/g, '').replace('-', '').replace(/\./g, '').toLowerCase();
  }

  return(
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      { (error) &&
        <Grid item>
          <p className={classes.errorText}>{errorMsg ?? ''}</p>
        </Grid>
      }
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={requerirInputs()}
          onClick={() => { createAlumno({ variables: { rut: unformatRut(alumno.rut), email: alumno.email, nombres: alumno.nombres, apellidos: alumno.apellidos, telefono: alumno.telefono, nacimiento: alumno.nacimimento, genero_id: alumno.genero_id, institucion_id: permiso > 2 ? institucion_id : institucion, curso_id: curso_id } } )}}
        >
          <GroupAdd />Agregar Alumno
        </Button>
      </Grid>

    </Grid>
  )
}

export default AgregarApoderado;