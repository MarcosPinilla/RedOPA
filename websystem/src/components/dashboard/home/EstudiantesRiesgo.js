import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import { ALUMNOS } from '../../../graphql/queries/estudiantesRiesgo';
import { CURSOS } from '../../../graphql/queries/cursos';
import { TablePagination, Button, Grid, Avatar, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Input, Select, MenuItem } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility'


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
  },
  icon: {
    
  },
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

export default function Estudiantes(props) {
  const classes = useStyles();

  const { institucion_id } = props;

  const { loading, error, data, refetch } = useQuery(ALUMNOS, 
    {
      variables: {
        institucion_id
      },
      onError(){
        console.log(error.message)
      }
    });

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

  useEffect(() => {
    refetch();
  });

  resolveAfter2Seconds();

  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('rut');
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [alumnoEditar, setAlumnoEditar] = React.useState({});

  const [termino, setTermino] = React.useState('');
  const [cursoFiltro, setCursoFiltro] = React.useState(0);

  const filtro = (alumno) => {
    if (termino !== null && termino !== ''){
      let reg = new RegExp('^' + termino.toLocaleLowerCase());
      if (alumno.cuenta.nombres.toLocaleLowerCase().match(reg) || alumno.cuenta.apellidos.toLocaleLowerCase().match(reg)) {
        return true
      }
      return false;
    } else {
      return true;
    }
  }

  const filtroCurso = (alumno) => {
    if (cursoFiltro > 0) {
      return alumno.curso.id === cursoFiltro;
    } else {
      return true;
    }
  }
  
  const { loading: cursosLoading, error: cursosError, data: cursosData } = useQuery(CURSOS, 
    {
      variables: {
        institucion_id
      },
      onError(){
        console.log(error.message)
      }
    }
  );

  function noData(data){
    if(data.length <= 0){
      return (
        <Grid style={{textAlign:"center"}}><p>No hay datos para mostrar</p></Grid>
      )
    }
  }

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
    refetch().then(() => setRefreshing(false));
  }, [refreshing]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading || cursosLoading) return <p>Loading...</p>;
  if (error || cursosError) {
    window.location.reload();
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

  return (
    <div className={classes.root}>
      <CssBaseline />
        <Paper className={classes.root2}>
          <Grid container spacing={1}>
            <Grid
              className={classes.botonera}
              direction="row"
              justify="flex-end"
              alignItems="center"
              item xs={12}
            >
              <Grid container>
                <Grid item xs={9}>
                  <FormControl className={classes.buscador}>
                    <InputLabel>Buscar</InputLabel>
                    <Input placeholder="Ingrese un nombre o apellido" value={termino} onChange={e => setTermino(e.target.value)} style={{margin:25}} />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Curso</InputLabel>
                    <Select
                      value={cursoFiltro}
                      labelId="demo-simple-select-label"
                      onChange={e => setCursoFiltro(e.target.value)}
                      style={{marginTop: 25}}
                      alignSelf='flex-end'
                    >
                      <MenuItem value={0}>Todos</MenuItem>
                      {cursosData.cursosInstitucionQuery && cursosData.cursosInstitucionQuery.map(curso => (
                        <MenuItem value={curso.id}>{curso.nivel}°{curso.letra}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            
          </Grid>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Foto</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Riesgo</TableCell>
                <TableCell>Curso</TableCell>
                <TableCell>Ver</TableCell>
              </TableRow>
            </TableHead>
            {noData(data.alumnosRiesgoQuery)}
            <TableBody>
            {data.alumnosRiesgoQuery &&
              data.alumnosRiesgoQuery.filter(filtroCurso).filter(filtro).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(alumno => (
                <TableRow key={alumno.cuenta.rut}>
                  <TableCell component="th" scope="row">
                    <Avatar src={alumno.cuenta.fotoUrl} style={{width: 50, height: 50}}/>
                  </TableCell>
                  <TableCell>{alumno.cuenta.nombres} {alumno.cuenta.apellidos}</TableCell>
                  <TableCell>{alumno.riesgosDiarios[0].riesgo}</TableCell>
                  <TableCell>{alumno.curso.nivel}° {alumno.curso.letra}</TableCell>
                  <TableCell><VisibilityIcon style={{cursor: 'pointer'}} className={classes.icon} onClick={()=>{window.location.href = "/dashboard/alumno/"+ alumno.id;}} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[2, 4, 8]}
            component="div"
            count={data.alumnosRiesgoQuery.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
    </div>
  );
}