import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveOutlined from '@material-ui/icons/SaveOutlined'

const EDITAR_APODERADO = gql`
  mutation updateApoderado($apoderado_id: ID!, $email: String, $nombres: String, $apellidos: String, $telefono: String, $nacimiento: String, $genero_id: ID) {
    updateApoderado(apoderado_id: $apoderado_id, email: $email, nombres: $nombres, apellidos: $apellidos, telefono: $telefono, nacimiento: $nacimiento, genero_id: $genero_id)
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

const EditarApoderado = (props) => {
  const classes = useStyles();
  const { apoderado_id, nombres, apellidos, email, telefono, nacimiento, cerrar } = props;
  const [updateApoderado, {data, loading, error}] = useMutation(
    EDITAR_APODERADO,
    {
      onCompleted({ updateApoderado }) {
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
      onClick={() => { updateApoderado({ variables: { apoderado_id: apoderado_id, email: email, nombres: nombres, apellidos: apellidos, telefono: telefono, nacimiento: nacimiento } } )}}
    >
      <SaveOutlined />Guardar Cambios
    </Button>
  )
}

export default EditarApoderado;