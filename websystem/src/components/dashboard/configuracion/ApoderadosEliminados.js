import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid, Typography, Button, CssBaseline, Dialog, DialogTitle, DialogActions, TablePagination, Input, InputLabel, FormControl } from '@material-ui/core';
import { APODERADOS_ELIMINADOS } from '../../../graphql/queries/apoderadoseliminados';
import RestaurarApoderado from '../../../graphql/mutations/restaurarApoderado';
import VisibilityIcon from '@material-ui/icons/Visibility'



export default function ApoderadosEliminados(props) {
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

  const filtro = (apoderado) => {
    if (termino !== null && termino !== ''){
      let reg = new RegExp('^' + termino.toLocaleLowerCase());
      if (apoderado.cuenta.nombres.toLocaleLowerCase().match(reg) || apoderado.cuenta.apellidos.toLocaleLowerCase().match(reg)) {
        return true
      }
      return false;
    } else {
      return true;
    }
  }

  const { loading, error, data, refetch } = useQuery(APODERADOS_ELIMINADOS, 
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

  function formatRut(rut) {
    var actual = rut.replace(/^0+/, "");
    if (actual != '' && actual.length > 1) {
        var sinPuntos = actual.replace(/\./g, "");
        var actualLimpio = sinPuntos.replace(/-/g, "");
        var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
        var rutPuntos = "";
        var i = 0;
        var j = 1;
        for (i = inicio.length - 1; i >= 0; i--) {
            var letra = inicio.charAt(i);
            rutPuntos = letra + rutPuntos;
            if (j % 3 == 0 && j <= inicio.length - 1) {
                rutPuntos = "." + rutPuntos;
            }
            j++;
        }
        var dv = actualLimpio.substring(actualLimpio.length - 1);
        rutPuntos = rutPuntos + "-" + dv;
    }
    return rutPuntos;
  }  

  if (loading) return <p>Loading...</p>;

  return(
    <div className={classes.root}>
      <CssBaseline />
      { (error)
        ? <Grid container direction="column">
          <Typography variant="h5" style={{margin: 10}}>Apoderados eliminados:</Typography>

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
          <Typography variant="h5" style={{margin: 10}}>Apoderados eliminados:</Typography>
          <Typography variant="h3" style={{margin: 10}} color="primary">{data.apoderadosEliminadosQuery.length}</Typography>
          <Button variant="contained"
            color="primary"
            style={{margin: 10}}
            onClick={handleClickOpen}
          >
            <VisibilityIcon/> Ver
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-titlex" >
            <Grid container style={{paddingLeft: 20, paddingRight: 20}} justify="center">
            <DialogTitle id="form-dialog-titlex">Apoderados eliminados</DialogTitle>
              <Grid item xs={12}>
                <FormControl className={classes.buscador} style={{width: '100%'}} >
                  <InputLabel>Buscar</InputLabel>
                  <Input placeholder="Ingrese un nombre o apellido" value={termino} onChange={e => setTermino(e.target.value)} style={{width: '100%'}} />
                </FormControl>
              </Grid>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Rut</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Restaurar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {data.apoderadosEliminadosQuery &&
                  data.apoderadosEliminadosQuery.filter(filtro).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(apoderado => (
                    <TableRow key={apoderado.cuenta.rut}>
                      <TableCell component="th" scope="row">
                        {formatRut(apoderado.cuenta.rut)}
                      </TableCell>
                      <TableCell>{apoderado.cuenta.nombres} {apoderado.cuenta.apellidos}</TableCell>
                      <TableCell>
                        <RestaurarApoderado id={apoderado.id} recargar={refetch} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[6, 12, 18]}
                component="div"
                count={data.apoderadosEliminadosQuery.length}
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