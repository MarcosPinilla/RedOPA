import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useQuery } from '@apollo/react-hooks';
import { ALUMNO } from '../../../graphql/queries/alumno'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, Avatar, Divider, Paper, TableCell, TableRow, TableHead, Table, TableBody, List, ListItem, ListItemIcon, ListItemText, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import GroupAdd from '@material-ui/icons/GroupAdd';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Moment from 'moment';
import 'moment/locale/es'
import AddApoderado from './AddApoderado';
import RecoverPassword from '../../../graphql/mutations/recoverPassword';
import SchoolIcon from '@material-ui/icons/SchoolOutlined';
import EditIcon from '@material-ui/icons/Edit';
import EditEstudiante from '../estudiantes/EditEstudiante';
import VisibilityIcon from '@material-ui/icons/Visibility';
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
  paper: {
    padding: theme.spacing(2),
    textAlign: "left"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    margin: 15
  },
  tipo: {
    fontSize: 12,
    color: '#737373',
    fontWeight: "bold",
  },
  recuperar: {
    fontSize: 12,
    fontWeight: "bold",
    width: 230,
    height: 30,
    marginTop: -30,
  },
  texto: {
    margin: 20,
    //color: '#898989',
  },
  buttonGenerar: {
    marginTop: 15,
    width: 280,
  }
}));


export default function AlumnoQuery(props) {
  const classes = useStyles();

  const { apoderado, handleChange, institutionId } = props;

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

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openRecuperar, setOpenRecuperar ] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [alumnoEditar, setAlumnoEditar] = React.useState({});
  const permiso = localStorage.getItem('permisoid');

  function noData(data){
    if(data.length <= 0){
      return (
        <Grid style={{textAlign:"center"}}><p>No hay datos para mostrar</p></Grid>
      )
    }
  }

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    onRefresh();
    setOpenAdd(false);
  };
  
  const handleClickOpenRecuperar = () => {
    setOpenRecuperar(true);
  };

  const handleCloseRecuperar = () => {
    setOpenRecuperar(false);
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

  const { loading, error, data, refetch } = useQuery(ALUMNO,{variables: {id:props.id}});

  if (loading) {
    console.log("cargando al alumno"+props.id);
  
    return <p>Cargando</p>
  }

  if (error){
    console.log("error al alumno"+props.id);
    return <p>Error</p>
  } 

  return (
    <div className={classes.root}>
    <CssBaseline />
    <main className={classes.content}>
      <Grid style={{border: '2px solid #57457F', borderRadius:25,padding: 15}}>
        <Grid container
          direction="row"
          justify="flex"
          alignItems="center" style={{marginTop: -40, overflow:'hidden'}}>
          <Avatar src={data.alumno.cuenta.fotoUrl} style={{width:100,height:100}}/>
          <Grid container
            direction="column"
            justify="flex"
            alignItems="flex-start" style={{marginTop: 15, marginLeft: 5, overflow:'hidden', width: '88%'}}>
            <Grid container spacing={0} direction="row" alignItems="flex-start">
              <Grid item justify="flex-start">
                <h2 style={{marginLeft: 15}} >{data.alumno.cuenta.nombres} {data.alumno.cuenta.apellidos}</h2>
              </Grid>
              <Grid item xs={2} alignItems="center" style={{marginTop: 20, marginLeft: 0}}>
                <Typography className={classes.tipo} ><SchoolIcon style={{marginBottom: -5}}/> Alumno</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" xs={6}>
              <Grid item xs={8} >
                <Button
                  color="primary"
                  className={classes.recuperar}
                  onClick={handleClickOpenRecuperar}                
                >
                  <VpnKeyIcon style={{marginRight: 10}} />  Recuperar Contraseña
                </Button>
              </Grid>
              
              <Dialog open={openRecuperar} onClose={handleCloseRecuperar} aria-labelledby="form-dialog-title">
                <Grid container justify="center">
                  <DialogTitle id="form-dialog-title" alignSelf='center'>Recuperar Contraseña</DialogTitle>
                </Grid>
                <div className={classes.texto}>
                  <Typography variant="body1">Esta acción generará una nueva contraseña automática para el usuario,</Typography>
                  <Typography variant="body1">la cuál será enviada a su correo junto a instrucciones de como usarla.</Typography>
                  <Typography variant="body1">Si no cuenta con un correo registrado en Red OPA, puede agregarlo en la sección de editar.</Typography>
                </div>
                <RecoverPassword rut={data.alumno.cuenta.rut} cerrar={handleCloseRecuperar} />
                <DialogActions>
                  <Button onClick={handleCloseRecuperar} color="primary">
                    Cancelar
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
        <Grid container
          direction="row"
          justify="flex-end"
          alignItems="center" style={{marginTop: -40, overflow:'hidden'}}>
          
            <Grid item >
              <h3>Riesgo:</h3>
            </Grid>
            <Grid item style={{marginLeft:5}}>
              <Avatar>{data.alumno.riesgosDiarios[0] ? data.alumno.riesgosDiarios[0].riesgo : 0}</Avatar>
            </Grid>
            
        </Grid>
        <Grid container direction="row" justify="flex-start">
          <Grid item style={{textAlign:"left"}}>
            <h4>Datos Personales</h4>
          </Grid>
          <Grid item xs={1} >
            <EditIcon style={{cursor: 'pointer', marginBottom: -20}} fontSize="small" onClick={() => handleClickOpenEdit(data.alumno)} />
          </Grid>
          <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-titlex">
            <Grid container justify="center">
              <DialogTitle id="form-dialog-titlex">Editar Estudiante</DialogTitle>
            </Grid>
            <EditEstudiante formatRut={formatRut} alumnoEditar={alumnoEditar} cerrar={handleCloseEdit}/>
            <DialogActions>
              <Button onClick={handleCloseEdit} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Divider/>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Grid className={classes.paper} >
              Rut: {formatRut(data.alumno.cuenta.rut)}
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Grid className={classes.paper} > 
              Nombre Completo: {data.alumno.cuenta.nombres} {data.alumno.cuenta.apellidos}
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid className={classes.paper} >
              Curso: {data.alumno.curso.nivel}° {data.alumno.curso.letra}
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid className={classes.paper} >
              Telefono: {data.alumno.cuenta.telefono}
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={6} style={{textAlign:"left"}} direction="row"><h4>Datos Apoderado</h4></Grid>
          <Grid
            item md={6}
            className={classes.botonera}
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          > 
            {
              ((institutionId !== '0' && permiso === '3') || permiso !== '3') &&
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleClickOpenAdd}
              >
                <GroupAdd />  Agregar Apoderado
              </Button>
            }
            <Dialog open={openAdd} onClose={handleCloseAdd} aria-labelledby="form-dialog-titlex">
              <Grid container justify="center">
                <DialogTitle id="form-dialog-titlex">Agregar Apoderado</DialogTitle>
              </Grid>
              <AddApoderado institutionId={institutionId} formatRut={formatRut} alumno_id={data.alumno.id} apoderado={apoderado} handleChange={handleChange} cerrar={handleCloseAdd}/>
              <DialogActions>
                <Button onClick={handleCloseAdd} color="primary">
                  Cerrar
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
        <Divider/>
        {data.alumno.apoderados.map(apoderado => (
          <Grid container spacing={3} key={apoderado.cuenta.rut}>
            <Grid item xs={3}>
              <Grid className={classes.paper} >
                Rut: {formatRut(apoderado.cuenta.rut)}
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid className={classes.paper} >
                Nombre Completo: {apoderado.cuenta.nombres} {apoderado.cuenta.apellidos}
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid className={classes.paper} >
                Telefono: {apoderado.cuenta.telefono ? apoderado.cuenta.telefono : "No Disponible"}
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid className={classes.paper}>
                <Link to={`/dashboard/apoderado/${apoderado.id}`}>
                  <VisibilityIcon 
                    style={{cursor: 'pointer'}} 
                    htmlColor='black'
                    className={classes.icon}
                  />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        ))}
        {noData(data.alumno.apoderados)}

        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}><h4>Información Adicional</h4></Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container direction="row" spacing={1}>
              <Grid xs={4} item>
                <Grid style={{textAlign:"left"}}><h4>Amigos de Confianza</h4></Grid>
                <Divider/>
                <List>
                  {data.alumno.amigos.map(amigo => (
                    <ListItem key={amigo.id} style={{cursor: 'pointer'}} onClick={()=>{window.location.href = "/dashboard/alumno/"+ amigo.id;}}>
                      <ListItemIcon>
                        <Avatar src={amigo.cuenta.fotoUrl}/>
                      </ListItemIcon>
                      <ListItemText primary={amigo.cuenta.nombres+" "+amigo.cuenta.apellidos} />
                    </ListItem>
                  ))}
                </List>
                {noData(data.alumno.amigos)}
              </Grid>
              <Grid xs={4} item>
                <Grid style={{textAlign:"left"}}><h4>Funcionarios de Confianza</h4></Grid>
                <Divider/>
                <List>
                  {data.alumno.contactos.map(contacto => (
                    <ListItem key={contacto.id} style={{cursor: 'pointer'}} onClick={()=>{window.location.href = "/dashboard/funcionario/"+ contacto.id;}}>
                      <ListItemIcon>
                        <Avatar src={contacto.cuenta.fotoUrl}/>
                      </ListItemIcon>
                      <ListItemText primary={contacto.cuenta.nombres+" "+contacto.cuenta.apellidos} />
                    </ListItem>
                  ))}
                </List>
                {noData(data.alumno.contactos)}
              </Grid>
              <Grid xs={4} item>
                <Grid style={{textAlign:"left"}}><h4>Contactos Externos</h4></Grid>
                <Divider/>
                <List>
                  {data.alumno.contactosExternos.map(contacto => (
                    <ListItem key={contacto.id}>
                      <ListItemIcon>
                        <Avatar>{contacto.nombre.charAt(0)}</Avatar>
                      </ListItemIcon>
                      <ListItemText primary={contacto.nombre} secondary={"Parentesco: "+contacto.correo+", fono: "+contacto.telefono} />
                    </ListItem>
                  ))}
                </List>
                {noData(data.alumno.contactosExternos)}
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
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
              <TableCell>Evaluador</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data.alumno.evaluaciones.map(evaluacion => (
              <TableRow key={evaluacion.id}>
                <TableCell component="th" scope="row">
                  {Moment(evaluacion.fecha).format('d MMMM YYYY HH:MM')}
                </TableCell>
                <TableCell >{evaluacion.emocion.nombre}</TableCell>
                <TableCell >{evaluacion.nivel}</TableCell>
                <TableCell >{evaluacion.evaluador.nombres} {evaluacion.evaluador.apellidos}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {noData(data.alumno.evaluaciones)}
      </Grid>
    </main>
  </div>
  );
}