import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useQuery } from '@apollo/react-hooks';
import { FUNCIONARIO } from '../../../graphql/queries/funcionario'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import { Grid, Avatar, Divider, Paper, TableCell, TableRow, TableHead, Table, TableBody, List, ListItem, ListItemIcon, ListItemText, Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import Moment from 'moment';
import 'moment/locale/es';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import EditFuncionario from '../funcionarios/EditFuncionario';

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
  paper: {
    padding: theme.spacing(2),
    textAlign: "left"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  }
}));


export default function PerfilQuery(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [funcionarioEditar, setFuncionarioEditar] = React.useState({});

  const handleClickOpen = (funcionario) => {
    setOpen(true);
    setFuncionarioEditar(funcionario);
  };

  const handleClose = () => {
    onRefresh();
    setOpen(false);
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

  function noData(data){
    if(data.length <= 0){
      return (
        <Grid style={{textAlign:"center"}}><p>No hay datos para mostrar</p></Grid>
      )
    }
  }

  function noAlumno(alumno) {
    if (alumno === null) {
      return (
        <TableCell>Alumno Eliminado</TableCell>
      );
    } else {
      return (
        <TableCell>{alumno.cuenta.nombres.split(' ')[0]} {alumno.cuenta.apellidos.split(' ')[0]}</TableCell>
      )
    }
  }

  const { loading, error, data, refetch } = useQuery(FUNCIONARIO,{variables: {id: localStorage.getItem('funcionarioid')}});

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refreshing]);

  if (loading) {
    console.log("cargando al funcionario "+props.id);
  
    return <p>Cargando</p>
  }

  if (error){
    console.log("error al funcionario "+props.id);
    return <p>Error</p>
  } 

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Grid style={{border: '2px solid #57457F', borderRadius:25, padding: 15}}>
          <Grid container
            direction="row"
            justify="flex"
            alignItems="center" style={{marginTop: -40, overflow:'hidden'}}>
            <Avatar src={data.funcionarioQuery.cuenta.fotoUrl} style={{width:100,height:100}}/>
            <h2 style={{marginLeft:25}}>{data.funcionarioQuery.cuenta.nombres} {data.funcionarioQuery.cuenta.apellidos}</h2>
            <VerifiedUser style={{marginLeft: 10}}/>
            <Grid item xs={5} justify="flex-end">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={()=>handleClickOpen(data.funcionarioQuery)}
              >
                <EditOutlinedIcon/>  Editar Datos
              </Button>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Grid container justify="center">
                  <DialogTitle id="form-dialog-title">Editar datos</DialogTitle>
                </Grid>
                <EditFuncionario formatRut={formatRut} funcionarioEditar={funcionarioEditar} cerrar={handleClose} />
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cerrar
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>

          <Grid style={{textAlign:"left"}}><h4>Datos Personales</h4></Grid>
          <Divider/>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Grid className={classes.paper} >
                Rut: {formatRut(data.funcionarioQuery.cuenta.rut)}
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid className={classes.paper} > 
                Nombre Completo: {data.funcionarioQuery.cuenta.nombres} {data.funcionarioQuery.cuenta.apellidos}
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid className={classes.paper} >
                Telefono: {data.funcionarioQuery.cuenta.telefono ? data.funcionarioQuery.cuenta.telefono : 'No Disponible'}
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid className={classes.paper} >
                Correo: {data.funcionarioQuery.cuenta.email ? data.funcionarioQuery.cuenta.email : 'No Disponible'}
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid className={classes.paper} >
                Cargo: {data.funcionarioQuery.cargo ? data.funcionarioQuery.cargo : 'No Disponible'}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid style={{border: '2px solid #57457F', borderRadius:25,padding: 25, marginTop:15}}>
          <Grid style={{textAlign:"left"}}><h4>Evaluaciones</h4></Grid>
          <Divider/>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Emocion</TableCell>
                <TableCell>Nivel</TableCell>
                <TableCell>Alumno</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data.funcionarioQuery.cuenta.evaluaciones.map(evaluacion => (
                <TableRow key={evaluacion.id}>
                  <TableCell component="th" scope="row">
                    {Moment(evaluacion.fecha).format('d MMMM YYYY HH:MM')}
                  </TableCell>
                  <TableCell >{evaluacion.emocion.nombre}</TableCell>
                  <TableCell >{evaluacion.nivel}</TableCell>
                  {noAlumno(evaluacion.alumno)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {noData(data.funcionarioQuery.cuenta.evaluaciones)}
        </Grid>
      </main>
    </div>
  );
}