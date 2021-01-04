import React, { useEffect, useContext } from 'react';
import { TablePagination, Button, Grid, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, Input, Typography, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';

import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility'
import CircularProgress from '@material-ui/core/CircularProgress';

import GroupAdd from '@material-ui/icons/GroupAdd';
import PersonAdd from '@material-ui/icons/PersonAdd';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import SubirFuncionarios from '../../../graphql/mutations/subirFuncionarios';
import AddFuncionario from './AddFuncionario';
import EditFuncionario from './EditFuncionario';
import EliminarFuncionario from '../../../graphql/mutations/eliminarFuncionario';

import { FUNCIONARIOS } from '../../../graphql/queries/funcionarios';
import { FUNCIONARIO_SEARCH } from '../../../graphql/queries/funcionariosearch';
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
  buscador: {
    width: '100%',
    marginLeft: 20,
  },
  instituciones: {
    width: '70%',
    margin: 20
  }
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export default function Funcionarios(props) {
  const { institutionId } = props;

  const classes = useStyles();

  const { funcionario, handleChange } = props;

  const [page, setPage] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [funcionarioEditar, setFuncionarioEditar] = React.useState({});
  const [funcionarioTextSearch, setFuncionarioTextSearch] = React.useState('');

  const permiso = localStorage.getItem('permisoid');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onRefresh();
    setOpen(false);
  };

  const eliminar = () => {
    onRefresh();
  }

  const { loading, error, data, refetch } = useQuery(FUNCIONARIOS,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        institucion_id: institutionId,
        offset,
        limit: rowsPerPage,
      }
    });

  const { loading: loadingSearchFuncionario, data: funcionarioDataSearch, refetch: refetchFuncionarioDataSearch } = useQuery(FUNCIONARIO_SEARCH,
    {
      fetchPolicy: "network-only",
      variables: {
        textSearch: funcionarioTextSearch,
        institucion_id: institutionId
      }
    });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      if (funcionarioTextSearch != '') {
        refetchFuncionarioDataSearch().then(() => setRefreshing(false));
      } else {
        setRefreshing(false);
      }
    });
  }, [refreshing, funcionarioTextSearch]);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    onRefresh();
    setOpenAdd(false);
  };

  const handleClickOpenEdit = (funcionario) => {
    setOpenEdit(true);
    setFuncionarioEditar(funcionario);
  };

  const handleCloseEdit = () => {
    onRefresh();
    setOpenEdit(false);
    //setFuncionarioEditar({});
  };

  const handleChangePage = (event, newPage) => {
    let _offset = newPage * rowsPerPage;
    setOffset(_offset);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setOffset(0);
    setPage(0);
  };

  if (error) return <p>Error :(</p>;

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

  function isAdmin(funcionario) {
    if (funcionario.cuenta.permiso.id > 1) {
      return (
        <VerifiedUser style={{ marginLeft: 10, marginBottom: -5 }} color="disabled" />
      )
    }
  }
  var data_funcionarios = (funcionarioTextSearch != '') ? funcionarioDataSearch.searchFuncionario : data?.funcionarios?.items;

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
            <Grid container>
              <Grid item xs={12}>
                <FormControl className={classes.buscador}>
                  <InputLabel>Buscar</InputLabel>
                  <Input placeholder="Ingrese un nombre o apellido"
                    value={funcionarioTextSearch}
                    onChange={e => setFuncionarioTextSearch(e.target.value)}
                    style={{ margin: 25 }} />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            className={classes.botonera}
            direction="row"
            justify="flex-end"
            alignItems="center"
            item xs={6}
          >
            {((institutionId !== '0' && permiso === '3') || permiso !== '3') &&
              <Grid
                container
                spacing={1}
                justify="flex-end"
              >
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleClickOpen}
                  >

                    <GroupAdd />  Subir Excel
                    </Button>
                  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <Grid container justify="center">
                      <DialogTitle id="form-dialog-title">Subir archivo</DialogTitle>
                    </Grid>
                    <SubirFuncionarios />
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cerrar
                        </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={handleClickOpenAdd}
                >
                  <PersonAdd />  Agregar Funcionario
                </Button>
              </Grid>
            }
            <Dialog open={openAdd} onClose={handleCloseAdd} aria-labelledby="form-dialog-titlex">
              <Grid container justify="center">
                <DialogTitle id="form-dialog-titlex">Agregar Funcionario</DialogTitle>
              </Grid>
              {(permiso == 2)
                ? <AddFuncionario funcionario={funcionario} handleChange={handleChange} cerrar={handleCloseAdd} formatRut={formatRut} />
                : <AddFuncionario institutionId={institutionId} funcionario={funcionario} handleChange={handleChange} cerrar={handleCloseAdd} formatRut={formatRut} />
              }
              <DialogActions>
                <Button onClick={handleCloseAdd} color="primary">
                  Cerrar
                  </Button>
              </DialogActions>
            </Dialog>
            <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-titlex">
              <Grid container justify="center">
                <DialogTitle id="form-dialog-titlex">Editar Funcionario</DialogTitle>
              </Grid>
              <EditFuncionario formatRut={formatRut} funcionarioEditar={funcionarioEditar} cerrar={handleCloseEdit} />
              <DialogActions>
                <Button onClick={handleCloseEdit} color="primary">
                  Cerrar
                  </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Rut</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Ver</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(loading)
              ? <TableRow key={'loading'} style={{ height: 450 }}>
                <TableCell align="center" colSpan={6}>
                  <CircularProgress></CircularProgress>
                </TableCell>
              </TableRow>
              : (data_funcionarios?.length > 0)
                ? data_funcionarios.map(funcionario => (
                  <TableRow key={funcionario.cuenta.id}>
                    <TableCell component="th" scope="row">
                      {formatRut(funcionario.cuenta.rut)}
                    </TableCell>
                    <TableCell >{funcionario.cuenta.nombres} {funcionario.cuenta.apellidos} {isAdmin(funcionario)}</TableCell>
                    <TableCell >{funcionario.cargo}</TableCell>
                    <TableCell>
                      <Link to={`/dashboard/funcionario/${funcionario.id}`}>
                        <VisibilityIcon
                          style={{ cursor: 'pointer' }}
                          htmlColor='black'
                          className={classes.icon}
                        />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <EditIcon style={{ cursor: 'pointer' }} onClick={() => handleClickOpenEdit(funcionario)} />
                    </TableCell>
                    <TableCell>
                      {funcionario.cuenta.permiso.id < 2 ? <EliminarFuncionario id={funcionario.id} eliminar={eliminar} recargar={refetch} /> : <DeleteIcon color="disabled" />}
                    </TableCell>
                  </TableRow>
                ))
                : <TableRow key={'students-0'} style={{ height: 450 }}>
                  <TableCell align="center" colSpan={6}>
                    <span>No se encontraron {(funcionarioTextSearch != '') ? 'resultados' : 'registros'}</span>
                  </TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[8, 16, 25]}
          component="div"
          count={(funcionarioTextSearch != '') ? (funcionarioDataSearch?.searchFuncionario?.length ?? 0) : (data?.funcionarios?.totalItems ?? 0)}
          rowsPerPage={rowsPerPage}
          page={(funcionarioTextSearch != '') ? 0 : page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}