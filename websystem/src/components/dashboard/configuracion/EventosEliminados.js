import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid, Typography, Button, CssBaseline, Dialog, DialogTitle, DialogActions, TablePagination, Input, InputLabel, FormControl } from '@material-ui/core';
import { EVENTOS_ELIMINADOS } from '../../../graphql/queries/eventoseliminados';
import RestaurarEvento from '../../../graphql/mutations/restaurarEvento';
import VisibilityIcon from '@material-ui/icons/Visibility'

export default function EventosEliminados(props) {
  const { institutionId } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [termino, setTermino] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onRefresh();
    setOpen(false);
  };

  const filtro = (evento) => {
    if (termino !== null && termino !== ''){
      let reg = new RegExp('^' + termino.toLocaleLowerCase());
      if (evento.titulo.toLocaleLowerCase().match(reg) || evento.titulo.toLocaleLowerCase().match(reg)) {
        return true
      }
      return false;
    } else {
      return true;
    }
  }

  const { loading, error, data, refetch } = useQuery(EVENTOS_ELIMINADOS, 
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return <p>Loading...</p>;

  return(
    <div className={classes.root}>
      <CssBaseline />
      { (error)
        ? <Grid container direction="column">
          <Typography variant="h5" style={{margin: 10}}>Eventos eliminados:</Typography>

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
          <Typography variant="h5" style={{margin: 10}}>Eventos eliminados:</Typography>
          <Typography variant="h3" style={{margin: 10}} color="primary">{data.publicacionesEliminadasQuery.length}</Typography>
          <Button variant="contained"
            color="primary"
            style={{margin: 10}}
            onClick={handleClickOpen}
          >
            <VisibilityIcon/> Ver
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-titlex" >
            <Grid container style={{paddingLeft: 20, paddingRight: 20}} justify="center">
            <DialogTitle id="form-dialog-titlex">Eventos eliminados</DialogTitle>
              <Grid item xs={12}>
                <FormControl className={classes.buscador} style={{width: '100%'}} >
                  <InputLabel>Buscar</InputLabel>
                  <Input placeholder="Ingrese un título" value={termino} onChange={e => setTermino(e.target.value)} style={{width: '100%'}} />
                </FormControl>
              </Grid>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Título</TableCell>
                    <TableCell>Interés</TableCell>
                    <TableCell>Restaurar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {data.publicacionesEliminadasQuery &&
                  data.publicacionesEliminadasQuery.filter(filtro).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(evento => (
                    <TableRow key={evento.id}>
                      <TableCell component="th" scope="row">
                        {evento.titulo}
                      </TableCell>
                      <TableCell>{evento.interes.nombre}</TableCell>
                      <TableCell>
                        <RestaurarEvento id={evento.id} recargar={refetch} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[6, 12, 18]}
                component="div"
                count={data.publicacionesEliminadasQuery.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Grid>
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
  dialogo: {
    minHeight: 900,
  },
  table: {
    minWidth: 550,
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