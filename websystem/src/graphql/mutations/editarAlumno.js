import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveOutlined from '@material-ui/icons/SaveOutlined'

const EDITAR_ALUMNO = gql`
  mutation updateAlumno($alumno_id: ID!, $alias: String, $email: String, $nombres: String, $apellidos: String, $telefono: String, $nacimiento: String, $genero_id: ID) {
    updateAlumno(alumno_id: $alumno_id, alias: $alias email: $email, nombres: $nombres, apellidos: $apellidos, telefono: $telefono, nacimiento: $nacimiento, genero_id: $genero_id)
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
}));

const EditarAlumno = (props) => {
  const classes = useStyles();
  const { alumno_id, nombres, apellidos, email, telefono, nacimiento, cerrar } = props;
  const [updateAlumno, {data, loading, error}] = useMutation(
    EDITAR_ALUMNO,
    {
      onCompleted({ updateAlumno }) {
        cerrar();
      }
    }
  );

  if(error){
    console.log(error)
  }

  return(
    
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={() => { updateAlumno({ variables: { alumno_id: alumno_id, email: email, nombres: nombres, apellidos: apellidos, telefono: telefono, nacimiento: nacimiento } } )}}
    >
      <SaveOutlined />Guardar Cambios
    </Button>
  )
}

export default EditarAlumno;