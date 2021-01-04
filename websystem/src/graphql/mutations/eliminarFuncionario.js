import React from 'react';
import gql from 'graphql-tag';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import { Button, Dialog, DialogActions, DialogTitle, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';

export const ELIMINAR_FUNCIONARIO = gql`
  mutation deleteFuncionario($funcionario_id: ID!) {
    deleteFuncionario(funcionario_id: $funcionario_id)
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
  texto: {
    margin: 20,
    //color: '#898989',
  },
  button: {
    marginTop: 15,
  }
}));

const EliminarFuncionario = (props) => {
  const classes = useStyles();
  const { id, eliminar, recargar } = props;
  const [open, setOpen] = React.useState(false);
  const [eliminarFuncionario, {data, loading, error}] = useMutation(
    ELIMINAR_FUNCIONARIO,
    {
      onCompleted({ eliminarFuncionario }) {
        setOpen(false);
        eliminar();
      }
    }
  );

  if (error) {
    console.log(error);
  }

  if (loading) {
    return(<CircularProgress size={23} thickness={4} />)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    recargar();
    setOpen(false);
  };

  return(
    <div>
      <DeleteIcon style={{cursor: 'pointer'}} onClick={handleClickOpen} />

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{alignSelf: 'center'}}>Eliminar Funcionario</DialogTitle>
        <div className={classes.texto} >
          <Typography variant="body1">Al apretar "Confirmar" el usuario será eliminado.</Typography>
          <Typography variant="body1">Esta acción se puede deshacer en configuración.</Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          style={{width: "50%", alignSelf: 'center'}}
          onClick={() => { eliminarFuncionario({ variables: { funcionario_id: id } }) } }
        >
          <DeleteOutlined/>  Confirmar
        </Button>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EliminarFuncionario;