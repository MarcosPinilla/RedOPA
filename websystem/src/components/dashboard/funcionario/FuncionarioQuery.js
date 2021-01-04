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
import { Grid, Avatar, Divider, Paper, TableCell, TableRow, TableHead, Table, TableBody, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Moment from 'moment';
import 'moment/locale/es';
import AgregarAdmin from '../../../graphql/mutations/agregarAdmin';
import QuitarAdmin from '../../../graphql/mutations/quitarAdmin';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import RecoverPassword from '../../../graphql/mutations/recoverPassword';
import EditFuncionario from '../funcionarios/EditFuncionario';
import EditIcon from '@material-ui/icons/Edit';

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
  recuperar: {
    fontSize: 12,
    fontWeight: "bold",
    width: 230,
    height: 30,
    marginTop: -20,
  },
  texto: {
    margin: 20,
    //color: '#898989',
  },
  buttonGenerar: {
    marginTop: 15,
    width: 280,
  },
  tipo: {
    fontSize: 12,
    color: '#737373',
    fontWeight: "bold",
  },
}));


export default function FuncionarioQuery(props) {
  const classes = useStyles();

  const [openEdit, setOpenEdit] = React.useState(false);
  const [funcionarioEditar, setFuncionarioEditar] = React.useState({});

  const handleClickOpenEdit = (funcionario) => {
    setOpenEdit(true);
    setFuncionarioEditar(funcionario);
  };

  const handleCloseEdit = () => {
    onRefresh();
    setOpenEdit(false);
    //setFuncionarioEditar({});
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

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refreshing]);

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

  function isAdmin(funcionario_id) {
    if (data.funcionarioQuery.cuenta.permiso.id > 1) {
      return (
        <Grid container item  xs={3}>
          <Grid item xs={3}>
            <VerifiedUser style={{marginLeft: 0, marginTop: 20}}/>
          </Grid>
          <Grid item xs={6}>
            <QuitarAdmin funcionario_id={funcionario_id} recargar={refetch}/>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <Grid item xs={3} alignSelf="flex-end">
          <AgregarAdmin funcionario_id={funcionario_id} recargar={refetch}/>
        </Grid>
      )
    }
  }

  const { loading, error, data, refetch } = useQuery(FUNCIONARIO,{variables: {id:props.id}});
  
  const [openRecuperar, setOpenRecuperar ] = React.useState(false);

  const handleClickOpenRecuperar = () => {
    setOpenRecuperar(true);
  };

  const handleCloseRecuperar = () => {
    setOpenRecuperar(false);
  };

  if (loading) {
    console.log("cargando al funcionario "+props.id);
  
    return <p>Cargando</p>
  }

  if (error){
    console.log("error al funcionario "+props.id);
    console.log(error)
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
            <Grid
              direction="column"
              justify="flex"
              alignItems="flex-start" style={{marginTop: 15, marginLeft:5, overflow:'hidden', width: '88%'}}>
              <Grid container spacing={0} direction="row" alignItems="flex-start">
                <Grid item justify="flex-start">
                  <h2 style={{marginLeft:15}}>{data.funcionarioQuery.cuenta.nombres} {data.funcionarioQuery.cuenta.apellidos}</h2>
                </Grid>
                <Grid item xs={2} alignItems="center" style={{marginTop: 20, marginLeft: 10}}>
                  <Typography className={classes.tipo} ><PeopleIcon style={{marginBottom: -5}}/> Funcionario</Typography>
                </Grid>
                { isAdmin(data.funcionarioQuery.id) }
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
                <RecoverPassword rut={data.funcionarioQuery.cuenta.rut} cerrar={handleCloseRecuperar} />
                <DialogActions>
                  <Button onClick={handleCloseRecuperar} color="primary">
                    Cancelar
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>

          <Grid container direction="row" justify="flex-start">
            <Grid item style={{textAlign:"left"}}>
              <h4>Datos Personales</h4>
            </Grid>
            <Grid item xs={1} >
              <EditIcon style={{cursor: 'pointer', marginBottom: -20}} fontSize="small" onClick={()=>handleClickOpenEdit(data.funcionarioQuery)} />
            </Grid>
            <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-titlex">
              <Grid container justify="center">
                <DialogTitle id="form-dialog-titlex">Editar Funcionario</DialogTitle>
              </Grid>
              <EditFuncionario formatRut={formatRut} funcionarioEditar={funcionarioEditar} cerrar={handleCloseEdit}/>
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