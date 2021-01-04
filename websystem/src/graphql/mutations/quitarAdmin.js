import React from 'react';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Dialog, DialogActions, DialogTitle, Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined';

const QUITAR_ADMIN = gql`
  mutation quitarAdmin ($funcionario_id: ID!) {
    quitarAdmin (funcionario_id: $funcionario_id)
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

const QuitarAdmin = (props) => {
  const classes = useStyles();
  const { funcionario_id, recargar } = props;
  const [open, setOpen] = React.useState(false);
  const [quitarAdmin, {data, loading, error}] = useMutation(
    QUITAR_ADMIN,
    {
      onCompleted({ quitarAdmin }) {
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
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={handleClickOpen}
      >
        Quitar
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <Grid container justify="center">
          <DialogTitle id="form-dialog-title" alignSelf='center'>Quitar Administrador</DialogTitle>
        </Grid>
        <div className={classes.texto}>
          <Typography>Al apretar "Confirmar" el funcionario dejará de ser administrador de su institución.</Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          style={{width: "50%", alignSelf: 'center'}}
          onClick={() => quitarAdmin({ variables: { funcionario_id: funcionario_id } })}
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

export default QuitarAdmin;