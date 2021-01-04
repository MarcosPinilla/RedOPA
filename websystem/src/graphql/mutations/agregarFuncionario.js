import React from 'react';
import gql from 'graphql-tag';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const AGREGAR_FUNCIONARIO = gql`
  mutation createFuncionario($rut: String!, $email: String, $nombres: String!, $apellidos: String!, $telefono: String, $nacimiento: String, $genero_id: ID!, $institucion_id: ID, $cargo: String!, $profesor: Boolean) {
    createFuncionario(rut: $rut, email: $email, nombres: $nombres, apellidos: $apellidos, telefono: $telefono, nacimiento: $nacimiento, genero_id: $genero_id, institucion_id: $institucion_id, cargo: $cargo, profesor: $profesor) {
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

const AgregarFuncionario = (props) => {
  const classes = useStyles();
  const { funcionario, cerrar, profesor, institucion_id } = props;
  const institucion = localStorage.getItem("institucion");
  const permiso = localStorage.getItem('permisoid');
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [createFuncionario, {data, loading, error}] = useMutation(
    AGREGAR_FUNCIONARIO,
    {
      onCompleted({ createFuncionario }) {
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
    if (funcionario.rut == '' || funcionario.nombres == '' || funcionario.apellidos == '' || funcionario.genero_id === 0 || funcionario.cargo == '') {
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
    { (error && errorMsg != '') &&
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
        onClick={() => { createFuncionario({ variables: { rut: unformatRut(funcionario.rut), email: funcionario.email, nombres: funcionario.nombres, apellidos: funcionario.apellidos, telefono: funcionario.telefono, nacimiento: funcionario.nacimiento, genero_id: funcionario.genero_id, institucion_id: permiso > 2 ? institucion_id : institucion, cargo: funcionario.cargo, profesor: profesor } } )}}
      >
        <PeopleIcon /> Agregar Funcionario
      </Button>
    </Grid>

  </Grid>

  )
}

export default AgregarFuncionario;