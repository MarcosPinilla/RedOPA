import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import WcIcon from '@material-ui/icons/WcOutlined';
import { Grid } from '@material-ui/core';

const AGREGAR_APODERADO = gql`
  mutation createApoderado($rut: String!, $email: String, $nombres: String!, $apellidos: String!, $telefono: String, $nacimiento: String, $genero_id: ID!, $institucion_id: ID, $alumno_id: ID!) {
    createApoderado(rut: $rut, email: $email, nombres: $nombres, apellidos: $apellidos, telefono: $telefono, nacimiento: $nacimiento, genero_id: $genero_id, institucion_id: $institucion_id, alumno_id: $alumno_id) {
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
  const { apoderado, alumno_id, cerrar, institutionId } = props;
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [createApoderado, {data, loading, error}] = useMutation(
    AGREGAR_APODERADO,
    {
      onCompleted({ createApoderado }) {
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
    if (apoderado.rut == '' || apoderado.nombres == '' || apoderado.apellidos == '' || apoderado.genero_id === 0) {
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
          onClick={() => { createApoderado({ variables: { rut: unformatRut(apoderado.rut), email: apoderado.email, nombres: apoderado.nombres, apellidos: apoderado.apellidos, telefono: apoderado.telefono, nacimiento: apoderado.nacimimento, genero_id: apoderado.genero_id, institucion_id: institutionId, alumno_id: alumno_id } } )}}
        >
          <WcIcon/> Agregar Apoderado
        </Button>
      </Grid>
    </Grid>
  )
}

export default AgregarApoderado;