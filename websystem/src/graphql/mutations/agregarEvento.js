import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const AGREGAR_EVENTO = gql`
  mutation createPublicacion($titulo: String!, $contenido: String!, $fecha: Date, $interes_id: ID!, $foto: String, $visibilidad: Boolean) {
    createPublicacion(titulo: $titulo, contenido: $contenido, fecha: $fecha, interes_id: $interes_id, foto: $foto, visibilidad: $visibilidad) {
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
}));

const AgregarEvento = (props) => {
  const classes = useStyles();
  const { evento, foto, visibilidad, interes_id, cerrar, resetEventForm } = props;
  const institucion = localStorage.getItem("institucion");
  const [createPublicacion, {data, loading, error}] = useMutation(
    AGREGAR_EVENTO,
    {
      onCompleted({ createPublicacion }) {
        resetEventForm();
        cerrar();
      }
    }
  );

  function requerirInputs() {
    if (evento.titulo == '' || evento.contenido == '' || evento.interes_id === undefined) {
      return true;
    } else return false;
  }
  
  if(error){
    console.log(error)
  }

  return(
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      disabled={requerirInputs()}
      style={{alignSelf: 'center'}}
      onClick={() => { createPublicacion({ variables: { titulo: evento.titulo, contenido: evento.contenido, fecha: evento.fecha, interes_id: interes_id, foto: foto, visibilidad: visibilidad } } )}}
    >
      Agregar Evento
    </Button>
  )
}

export default AgregarEvento;