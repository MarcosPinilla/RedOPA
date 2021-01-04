import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveOutlined from '@material-ui/icons/SaveOutlined'

const EDITAR_PUBLICACION = gql`
  mutation updatePublicacion($publicacion_id: ID!, $titulo: String, $contenido: String, $fecha: String, $foto: String, $interes_id: ID, $visibilidad: Boolean) {
    updatePublicacion(publicacion_id: $publicacion_id, titulo: $titulo, contenido: $contenido, fecha: $fecha, foto: $foto, interes_id: $interes_id, visibilidad: $visibilidad)
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

const EditarEvento = (props) => {
  const classes = useStyles();
  const { evento_id, titulo, contenido, fecha, foto, interes_id, visibilidad, cerrar } = props;
  const [updatePublicacion, {data, loading, error}] = useMutation(
    EDITAR_PUBLICACION,
    {
      onCompleted({ updatePublicacion }) {
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
      onClick={() => { updatePublicacion({ variables: { publicacion_id: evento_id, titulo: titulo, contenido: contenido, fecha: fecha, foto: foto, interes_id: interes_id, visibilidad: visibilidad } } )}}
    >
      <SaveOutlined />Guardar Cambios
    </Button>
  )
}

export default EditarEvento;