import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GroupAdd from '@material-ui/icons/GroupAdd';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility'
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TablePagination, Button, Grid, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, Input, Select, MenuItem } from '@material-ui/core';

import { ALUMNOS_SEARCH } from '../../../graphql/queries/estudiantessearch';
import { CURSOS } from '../../../graphql/queries/cursos';
import { ALUMNOS } from '../../../graphql/queries/estudiantes';

import SubirAlumnos from '../../../graphql/mutations/subirAlumnos';
import EliminarAlumno from '../../../graphql/mutations/eliminarAlumno';
import AddEstudiante from './AddEstudiante';
import EditEstudiante from './EditEstudiante';
import { useQuery } from '@apollo/react-hooks';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  cellLoading: {
    width: 500,
    height: 80,
    display: 'flex',
    backgroundColor: 'gold',
  },
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
  },
  icon: {

  },
}));

export default function Estudiantes(props) {
  const classes = useStyles();
  const { alumno, handleChange, curso_id, institutionId } = props;

  
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
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [alumnoEditar, setAlumnoEditar] = React.useState({});
  const [offset, setOffset] = React.useState(0);
  const [alumnoTextSearch, setAlumnoTextSearch] = React.useState(''); 
  const [cursoFiltro, setCursoFiltro] = React.useState(0);
  
  const permiso = localStorage.getItem('permisoid');
  
  const { loading, error, data, refetch } = useQuery(ALUMNOS,
    {
      fetchPolicy: "cache-and-network",
      variables: { institucion_id: institutionId, course_id: cursoFiltro, offset, limit: rowsPerPage },
      onError() {
        console.log(error)
      }
    }
  );

  const { loading: alumnosSearchLoading, data: alumnosDataSearch, refetch: refetchAlumnosDataSearch} = useQuery(ALUMNOS_SEARCH,
    {
      fetchPolicy: "network-only",
      variables: { textSearch: alumnoTextSearch , institucion_id: institutionId, course_id: cursoFiltro },
      onError() {
        console.log(error)
      }
    }
  );

  const { loading: cursosLoading, error: cursosError, data: cursosData } = useQuery(CURSOS,
    {
      fetchPolicy: "cache-and-network",
      variables: { institucion_id: institutionId },
      onError() {
        console.log(error)
      }
    }
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onRefresh();
    setOpen(false);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    onRefresh();
    setOpenAdd(false);
  };

  const handleClickOpenEdit = (alumno) => {
    setOpenEdit(true);
    setAlumnoEditar(alumno);
  };

  const handleCloseEdit = () => {
    onRefresh();
    setOpenEdit(false);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      if (alumnosDataSearch != '') {
        refetchAlumnosDataSearch().then(() => setRefreshing(false));
      }
      setRefreshing(false);
    });
  }, [refreshing, alumnosDataSearch]);

  const handleChangePage = (event, newPage) => {
    let _offset = newPage * rowsPerPage;
    setOffset(_offset);
    setPage(newPage);
  };

  const handleChangeCourse = (event) => {
    setCursoFiltro(+event.target.value);
    setOffset(0);
    setPage(0);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setOffset(0);
    setPage(0);
  };

  if (cursosLoading) return <p>Loading...</p>;
  if (error || cursosError) {
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

  let data_alumnos = (alumnoTextSearch != '') ? alumnosDataSearch.searchAlumno : data?.alumnos?.items;
  
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
              <Grid item xs={9}>
                <FormControl className={classes.buscador}>
                  <InputLabel>Buscar</InputLabel>
                  <Input placeholder="Ingrese un nombre o apellido" 
                    value={alumnoTextSearch} 
                    onChange={e => setAlumnoTextSearch(e.target.value)} 
                    style={{ margin: 25 }} />
                </FormControl>
              </Grid>
              { ((institutionId !== '0' && permiso === '3') || permiso !== '3') &&
                <Grid item xs={3}>
                  <FormControl>
                    <InputLabel>Curso</InputLabel>
                    <Select
                      value={cursoFiltro}
                      onChange={handleChangeCourse}
                      style={{ marginTop: 25 }}
                    >
                    <MenuItem key="curso-0" value={0}>Todos</MenuItem>
                      {cursosData.cursosInstitucionQuery && cursosData.cursosInstitucionQuery.map(curso => (
                        <MenuItem key={curso.id} value={curso.id}>{curso.nivel}°{curso.letra}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              }
            </Grid>
          </Grid>
          <Grid
            className={classes.botonera}
            direction="row"
            justify="flex-end"
            alignItems="center"
            item xs={6}
            container
            >
            { 
              ((institutionId !== '0' && permiso === '3') || permiso !== '3') &&
              <Grid
                item
                container
                spacing={1}
                justify="flex-end"
                >
                <Grid
                  item xs={6}
                >
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleClickOpen}
                    >
                      <GroupAdd />Subir Excel
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                      <Grid container justify="center">
                        <DialogTitle>Subir archivo</DialogTitle>
                      </Grid>
                      <SubirAlumnos />
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cerrar
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>

                  <Grid
                    item xs={6}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleClickOpenAdd}
                    >
                      <GroupAdd />Agregar Alumno
                    </Button>
                    <Dialog open={openAdd} onClose={handleCloseAdd} aria-labelledby="form-dialog-titlex">
                      <Grid container justify="center">
                        <DialogTitle id="form-dialog-titlex">Agregar Alumno</DialogTitle>
                      </Grid> 
                      {
                        (permiso == 2) 
                        ? <AddEstudiante formatRut={formatRut} alumno={alumno} handleChange={handleChange} cerrar={handleCloseAdd} curso_id={curso_id} />
                        : <AddEstudiante institutionId={institutionId} formatRut={formatRut} alumno={alumno} handleChange={handleChange} cerrar={handleCloseAdd} curso_id={curso_id} />
                      }
                      <DialogActions>
                        <Button onClick={handleCloseAdd} color="primary">
                          Cerrar  
                          </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid> 
              </Grid>
            }
            <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-titlex">
              <Grid container justify="center">
                <DialogTitle id="form-dialog-titlex">Editar Estudiante</DialogTitle>
              </Grid>
              <EditEstudiante formatRut={formatRut} alumnoEditar={alumnoEditar} cerrar={handleCloseEdit} />
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
              <TableCell>Curso</TableCell>
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
              : (data_alumnos?.length > 0) 
                ? data_alumnos.map(alumno => (
                  <TableRow key={alumno.cuenta.id}>
                    <TableCell component="th" scope="row">
                      {formatRut(alumno.cuenta.rut)}
                    </TableCell>
                    <TableCell>{alumno.cuenta.nombres} {alumno.cuenta.apellidos}</TableCell>
                    <TableCell>{alumno.curso.nivel}° {alumno.curso.letra}</TableCell>
                    <TableCell>
                      <Link to={`/dashboard/alumno/${alumno.id}`}>
                        <VisibilityIcon 
                          style={{cursor: 'pointer'}} 
                          htmlColor='black'
                          className={classes.icon}
                        />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <EditIcon style={{cursor: 'pointer'}} onClick={() => handleClickOpenEdit(alumno)} />
                    </TableCell>
                    <TableCell><EliminarAlumno className={classes.icon} id={alumno.id} eliminar={eliminar} recargar={refetch} /></TableCell>
                  </TableRow>
                )) 
                : <TableRow key={'students-0'} style={{height: 450}}>
                  <TableCell align="center" colSpan={6}>
                    <span>No se encontraron {(alumnoTextSearch != '') ? 'resultados': 'registros'}</span>
                  </TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={[8, 16, 25]}
            component="div"
            count={(alumnoTextSearch != '') ? (alumnosDataSearch?.searchAlumno?.length ?? 0) : (data?.alumnos?.totalItems ?? 0) }
            rowsPerPage={rowsPerPage}
            page={(alumnoTextSearch != '') ? 0 : page}
            
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
      </Paper>
    </div>
  );
}