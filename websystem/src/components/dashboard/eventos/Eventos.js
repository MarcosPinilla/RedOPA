import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@apollo/react-hooks';
import { EVENTOS } from '../../../graphql/queries/eventos'
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Moment from 'moment';
import 'moment/locale/es'
import AddEvento from './AddEvento';
import EditEvento from './EditEvento';
import VistaPrevia from './VistaPrevia';
import { TablePagination, Button, Grid, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, Input, Select, MenuItem } from '@material-ui/core';
import EventAvailableOutlined from '@material-ui/icons/EventAvailableOutlined';
import EliminarEvento from '../../../graphql/mutations/eliminarEvento';

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

export default function Eventos(props) {
  const { evento, handleChange, interes_id, resetEventForm, institutionId } = props;
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
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [eventoVista, setEventoVista] = React.useState({});
  const [eventoEditar, setEventoEditar] = React.useState({});

  const [termino, setTermino] = React.useState('');

  const permiso = localStorage.getItem('permisoid');

  const { loading, error, data, refetch } = useQuery(EVENTOS, 
    {
      variables: {
        institucion_id: institutionId
      }
    });

  const filtro = (evento) => {
    if (termino !== null && termino !== ''){
      let reg = new RegExp('^' + termino.toLocaleLowerCase());
      if (evento.titulo.toLocaleLowerCase().match(reg) || evento.contenido.toLocaleLowerCase().match(reg)) {
        return true
      }
      return false;
    } else {
      return true;
    }
  }

  const handleClickOpen = (evento) => {
    console.log("aoijdiowqehoi")
    setOpen(true);
    setEventoVista(evento);
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

  const handleClickOpenEdit = (evento) => {
    setOpenEdit(true);
    setEventoEditar(evento);
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


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    window.location.reload();
  }

  function formatVisibility(visibilidad) {
    if(visibilidad){
      return "Visible"
    }else{
      return "Oculto"
    }
  } 

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
                    <Input placeholder="Ingrese un termino" value={termino} onChange={e => setTermino(e.target.value)} style={{margin:25}} />
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
                <Grid container spacing={1} justify="flex-end">
                  { ((institutionId !== '0' && permiso === '3') || permiso !== '3') &&
                    <Grid item xs={6} >
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleClickOpenAdd}
                      >
                      <EventAvailableOutlined />  Agregar Evento
                      </Button>
                      <Dialog open={openAdd} onClose={handleCloseAdd} aria-labelledby="form-dialog-titlex">
                        <Grid container justify="center">
                          <DialogTitle id="form-dialog-titlex">Agregar Evento</DialogTitle>
                        </Grid>
                        <AddEvento evento={evento} resetEventForm={resetEventForm} handleChange={handleChange} cerrar={handleCloseAdd} interes_id={interes_id}/>
                        <DialogActions>
                          <Button onClick={handleCloseAdd} color="primary">
                            Cerrar
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  }
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-titlex">
                  <VistaPrevia evento={eventoVista} cerrar={handleClose}/>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cerrar
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-titlex">
                  <DialogTitle id="form-dialog-titlex">Editar Evento</DialogTitle>
                  <EditEvento eventoEditar={eventoEditar} cerrar={handleCloseEdit}/>
                  <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">
                      Cerrar
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </Grid>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Interés</TableCell>
                <TableCell>Visibilidad</TableCell>
                <TableCell>Vista Previa</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data.publicacionesAdminQuery &&
              data.publicacionesAdminQuery.filter(filtro).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(evento => (
                <TableRow key={evento.id}>
                  <TableCell>{evento.titulo}</TableCell>
                  <TableCell>{Moment.utc(evento.fecha).format('LL')}</TableCell>
                  <TableCell>{evento.interes.nombre}</TableCell>
                  <TableCell>{formatVisibility(evento.visibilidad)}</TableCell>
                  <TableCell>
                    <VisibilityIcon 
                      style={{cursor: 'pointer'}} 
                      className={classes.icon} 
                      onClick={() => handleClickOpen(evento)}/>
                  </TableCell>
                  <TableCell>
                    <EditIcon style={{cursor: 'pointer'}} onClick={() => handleClickOpenEdit(evento)} />
                  </TableCell>
                  <TableCell><EliminarEvento className={classes.icon} id={evento.id} eliminar={eliminar} recargar={refetch} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[8, 16, 25]}
            component="div"
            count={data.publicacionesAdminQuery.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
    </div>
  );
  
}