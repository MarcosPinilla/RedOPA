import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/react-hooks';
import { TablePagination, Button, Grid, Dialog, DialogActions, DialogTitle, Input, InputLabel, FormControl } from '@material-ui/core';

import EliminarApoderado from '../../../graphql/mutations/eliminarApoderado';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditApoderado from './EditApoderado';

import { APODERADOS } from '../../../graphql/queries/apoderados'
import { APODERADOS_SEARCH } from '../../../graphql/queries/apoderadossearch';
import { Link } from "react-router-dom";

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
  button: {
    margin: 15
  },
  buscador: {
    width: '100%',
    marginLeft: 20,
  }
}));

function createData(rut, name, type, institucion, active) {
  return { rut, name, type, institucion, active };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export default function Apoderados(props) {
  const { institutionId } = props;
  const classes = useStyles();
  function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }

  const eliminar = () => {
    onRefresh();
  }

  resolveAfter2Seconds();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [apoderadoEditar, setApoderadoEditar] = React.useState({});
  const [apoderadoTextSearch, setApoderadoTextSearch] = React.useState('');
  const [offset, setOffset] = React.useState(0);

  const { loading, error, data, refetch } = useQuery(APODERADOS, 
    {
      fetchPolicy: "cache-and-network",
      variables: {
        institucion_id: institutionId,
        offset,
        limit: rowsPerPage,
      },
      onError(){
        console.log(error.message)
      }
    }
  );

  const { loading: apoderadosSearchLoading, apoderadosSearchError, data: apoderadosDataSearch, refetch: apoderadosSearchRefetch} = useQuery(APODERADOS_SEARCH,
    {
      fetchPolicy: "network-only",
      variables: { textSearch: apoderadoTextSearch , institucion_id: institutionId },
      onError() {
        console.log(error)
      }
    }
  );


  const handleClickOpenEdit = (apoderado) => {
    setOpenEdit(true);
    setApoderadoEditar(apoderado);
  };

  const handleCloseEdit = () => {
    onRefresh();
    setOpenEdit(false);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      if (apoderadoTextSearch != '') {
        apoderadosSearchRefetch().then(() => setRefreshing(false));
      } else {
        setRefreshing(false);
      }
    });
  }, [refreshing, apoderadoTextSearch]);


  const handleChangePage = (event, newPage) => {
    let _offset = (newPage * rowsPerPage);
    setOffset(_offset);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setOffset(0);
    setPage(0);
  };

  if (error) {
    // window.location.reload();
  }

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

  
  let data_apoderados = (apoderadoTextSearch != '') ? apoderadosDataSearch.searchApoderadosInstitucion : data?.apoderadosInstitucion?.items;
  
  return (
    <div className={classes.root}>
      <CssBaseline />
        <Paper className={classes.root2}>
          <Grid container spacing={1}>
            <Grid
              container
              className={classes.botonera}
              direction="row"
              justify="flex-end"
              alignItems="center"
              item xs={6}
            >
              <FormControl className={classes.buscador}>
                <InputLabel>Buscar</InputLabel>
                <Input placeholder="Ingrese un nombre o apellido" 
                  value={apoderadoTextSearch} 
                  onChange={e => setApoderadoTextSearch(e.target.value)} 
                  style={{margin:25}} 
                />
              </FormControl>
            </Grid>
          </Grid>
          <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-titlex">
            <Grid container justify="center">
              <DialogTitle id="form-dialog-titlex">Editar Apoderado</DialogTitle>
            </Grid>
            <EditApoderado formatRut={formatRut} apoderadoEditar={apoderadoEditar} cerrar={handleCloseEdit}/>
            <DialogActions>
              <Button onClick={handleCloseEdit} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Rut</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>email</TableCell>
                <TableCell>Ver</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { (loading) 
                ? <TableRow key={'loading'} style={{height: 450}}>
                  <TableCell align="center" colSpan={6}>
                      <CircularProgress></CircularProgress>
                  </TableCell>
                </TableRow> 
                : (data_apoderados?.length > 0) 
                ? data_apoderados.map(apoderado => (
                  <TableRow key={apoderado.cuenta.id}>
                    <TableCell component="th" scope="row">
                      {formatRut(apoderado.cuenta.rut)}
                    </TableCell>
                    <TableCell>{apoderado.cuenta.nombres} {apoderado.cuenta.apellidos}</TableCell>
                    <TableCell>{apoderado.cuenta.email}</TableCell>
                    <TableCell>
                      <Link to={`/dashboard/apoderado/${apoderado.id}`}>
                        <VisibilityIcon 
                          style={{cursor: 'pointer'}} 
                          htmlColor='black'
                          className={classes.icon}
                        />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <EditIcon style={{cursor: 'pointer'}} onClick={() => handleClickOpenEdit(apoderado)} />
                    </TableCell>
                    <TableCell><EliminarApoderado id={apoderado.id} eliminar={eliminar} recargar={refetch} /></TableCell>
                </TableRow>
                )) 
                : <TableRow key={'students-0'} style={{height: 450}}>
                  <TableCell align="center" colSpan={6}>
                    <span>No se encontraron {(apoderadoTextSearch != '') ? 'resultados': 'registros'}</span>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[8, 16, 25]}
            component="div"
            count={(apoderadoTextSearch != '') ? (apoderadosDataSearch?.searchApoderadosInstitucion?.length ?? 0) : (data?.apoderadosInstitucion?.totalItems ?? 0)}
            rowsPerPage={rowsPerPage}
            page={(apoderadoTextSearch != '') ? 0 : page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
    </div>
  );
  
}