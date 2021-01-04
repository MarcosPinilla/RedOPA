import React from 'react';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Dialog, DialogActions, DialogTitle, Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined';

const AGREGAR_ADMIN = gql`
  mutation agregarAdmin ($funcionario_id: ID!) {
    agregarAdmin (funcionario_id: $funcionario_id)
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

const AgregarAdmin = (props) => {
  const classes = useStyles();
  const { funcionario_id, recargar } = props;
  const [open, setOpen] = React.useState(false);
  const [agregarAdmin, {data, loading, error}] = useMutation(
    AGREGAR_ADMIN,
    {
      onCompleted({ agregarAdmin }) {
        handleClose();
      }
    }
  )

  if (error) {
    console.log(error);
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    recargar();
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClickOpen}
      >
        <VerifiedUserOutlined/>  Agregar Admin
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <Grid container justify="center">
          <DialogTitle id="form-dialog-title" alignSelf='center'>Agregar Administrador</DialogTitle>
        </Grid>
        <div className={classes.texto}>
          <Typography>Al apretar "Confirmar" el funcionario pasará a ser administrador de la plataforma.</Typography>
          <Typography>Esta acción solo puede ser desecha por un Súper Administrador.</Typography>
          <Typography>Para más información contacte al Centro OPA.</Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          style={{width: "50%", alignSelf: 'center'}}
          onClick={() => agregarAdmin({ variables: { funcionario_id: funcionario_id } })}
        >
          <VerifiedUserOutlined/>  Confirmar
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

export default AgregarAdmin;