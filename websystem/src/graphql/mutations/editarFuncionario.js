import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveOutlined from '@material-ui/icons/SaveOutlined'

const EDITAR_FUNCIONARIO = gql`
  mutation updateFuncionario($funcionario_id: ID!, $email: String, $nombres: String, $apellidos: String, $telefono: String, $nacimiento: String, $genero_id: ID, $cargo: String, $profesor: Boolean) {
    updateFuncionario(funcionario_id: $funcionario_id, email: $email, nombres: $nombres, apellidos: $apellidos, telefono: $telefono, nacimiento: $nacimiento, genero_id: $genero_id, cargo: $cargo, profesor: $profesor)
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

const EditarFuncionario = (props) => {
  const classes = useStyles();
  const { funcionario_id, nombres, apellidos, email, telefono, nacimiento, cargo, cerrar } = props;
  const [updateFuncionario, {data, loading, error}] = useMutation(
    EDITAR_FUNCIONARIO,
    {
      onCompleted({ updateFuncionario }) {
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
      onClick={() => { updateFuncionario({ variables: { funcionario_id: funcionario_id, email: email, nombres: nombres, apellidos: apellidos, telefono: telefono, nacimiento: nacimiento, cargo: cargo } } )}}
    >
      <SaveOutlined />Guardar Cambios
    </Button>
  )
}

export default EditarFuncionario;