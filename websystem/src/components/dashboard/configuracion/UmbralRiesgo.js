import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Typography, Button, CssBaseline, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { UMBRAL_RIESGO } from '../../../graphql/queries/umbralRiesgo';
import EditOutlined from '@material-ui/icons/EditOutlined';
import EditUmbralRiesgo from '../../../graphql/mutations/editarUmbralRiesgo';


export default function UmbralRiesgo(props) {
  const { institutionId } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onRefresh();
    setOpen(false);
  };

  const { loading, error, data, refetch } = useQuery(UMBRAL_RIESGO, 
    {
      variables: { institucion_id: institutionId },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
      errorPolicy: 'all'
    }
  );
  
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refreshing]);

  if (loading) return <p>Loading...</p>;

  return(
    <div className={classes.root}>
      <CssBaseline />
      { (error)
        ? <Grid container direction="column">
          <Typography variant="h5" style={{margin: 10}}>Umbral de Riesgo:</Typography>

          <Typography variant="body1" className={classes.errorText}>Se produjo un error. Inténtalo de nuevo más tarde.</Typography>
          <Button variant="contained"
            color="primary"
            className={classes.buttonRefetch}
            onClick={() => onRefresh()}
          >
            Reintentar
          </Button>
        </Grid>
        : <Grid container direction="column">
          <Typography variant="h5" style={{margin: 10}}>Umbral de Riesgo:</Typography>
          <Typography variant="h3" style={{margin: 10}} color="primary">{data.umbralRiesgoQuery}</Typography>
          <Button variant="contained"
            color="primary"
            style={{margin: 10}}
            onClick={handleClickOpen}
          >
            <EditOutlined/> Cambiar
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-titlex">
            <DialogTitle id="form-dialog-titlex">Cambiar umbral de riesgo</DialogTitle>
            <EditUmbralRiesgo institutionId={institutionId} actual={data.umbralRiesgoQuery} cerrar={handleClose} />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      }
    </div>
  );
}

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
  buttonRefetch: {
    marginTop: 25,
    marginBottom: 5
  },
  errorText: {
    marginTop: 10
  }
}));