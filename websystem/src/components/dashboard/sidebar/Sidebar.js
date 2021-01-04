import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import SchoolIcon from '@material-ui/icons/SchoolOutlined';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import { Grid, Button, Menu, MenuItem, Avatar, Select, FormControl } from '@material-ui/core';
import WcIcon from '@material-ui/icons/WcOutlined';
import EventIcon from '@material-ui/icons/EventOutlined'
import ActualizarAlertas from '../../../graphql/mutations/actualizarAlertasInstitucion';
import NotificationsIcon from '@material-ui/icons/NotificationsActive';
import NotificationsNone from '@material-ui/icons/NotificationsNone';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import { ALERTAS } from '../../../graphql/queries/alertas';
import { LEER_ALERTA } from '../../../graphql/mutations/leerAlerta';
import { INSTITUCIONES } from '../../../graphql/queries/instituciones';
import Moment from 'moment';
import 'moment/locale/es';
import { useLocation } from 'react-router-dom';

const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: '#57457F'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    overflow:'hidden'
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#57457F',
    color: 'white',
    overflow: 'hidden'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  large :{
    width: 150,
    height: 150
  },
  instituciones: {
    backgroundColor: '#fafafa',
    width: '100%'
  }
}));

const style = {
  sidebarContainer: {
    backgroundColor: '#FE6B8B',
  },
  textButton : {
    textDecorationLine: 'none',
    color: 'white',
    width: drawerWidth,
    flexShrink: 0,
  },
};

const Sidebar= (props) => {
  const location = useLocation();
  const inStudentPage = location.pathname.startsWith('/dashboard/alumno');
  const inTutorPage = location.pathname.startsWith('/dashboard/apoderado/');
  const showInstitutions = !(inStudentPage || inTutorPage);  
  const { institutionId, setInstitutionId} = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  localStorage.setItem('institucionActual', 0);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (alertas) => {
    setAnchorEl(null);
    alertas.forEach(alerta => {
      if (alerta.leida == 0) {
        leerAlerta({ variables: { publicacion_id: alerta.id } });
      }
    });
  };

  const nombres = localStorage.getItem('nombres');
  const apellidos = localStorage.getItem('apellidos');
  const fotoUrl = localStorage.getItem('fotoUrl');
  const institucion = localStorage.getItem('institucion');
  const permiso = localStorage.getItem('permisoid');
  const permisoName = localStorage.getItem('permiso');

  useEffect(() => {
    refetch();
  });

  const { loading, error, data, refetch } = useQuery(ALERTAS, 
    {
      onError(){
        console.log(error.message)
      }
    }
  );

  const [leerAlerta, { loading: loadingLeer, error: errorLeer, data:dataLeer }] = useMutation( 
    LEER_ALERTA,
    {
      onCompleted(leerAlerta){
        onRefresh();
      }
    }
  );

  const { loading: loadingInstituciones, error: errorInstituciones, data: dataInstituciones, refetch: refetchInstituciones } = useQuery(INSTITUCIONES, 
    {
      onError(){
        console.log(error.message)
      }
    }
  );

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refreshing]);

  if (loading || loadingInstituciones) return <p>Cargando...</p>;

  if (error) {
    window.location.reload();
  }

  const procesarAlertas = (alertas) => {
    //onRefresh();
    let alertasHoy = [];
    let anteriores = [];
    
    var hoy = new Date();
    hoy.setHours(hoy.getHours() - (new Date().getTimezoneOffset() / 60));
    var comienzoHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 1,
      (23 - (new Date().getTimezoneOffset() / 60)), 59, 59, 999);

    alertas.forEach(alerta => {
      if (Moment(alerta.fecha).isAfter(comienzoHoy, 'hour')) {
        alertasHoy.push(alerta);
      } else {
        anteriores.push(alerta);
      }
    });

    return(
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose(alertas)}
        style={{marginTop: 50, marginRight: 0}}
      >
        <Typography variant="h6" style={{marginLeft: 10}}>
          Estudiantes con alto riesgo suicida:
        </Typography>
        <Typography variant="body2" style={{marginLeft: 10}}>
          Hoy:
        </Typography>
        <Divider/>
        {alertasHoy && alertasHoy.map(alerta => (
          <div>
            {alerta.leida > 0 ? 
              <MenuItem onClick={()=>{window.location.href = "/dashboard/alumno/"+ alerta.alumno.id;}}>
                <Avatar src={alerta.alumno.cuenta.fotoUrl} style={{width: 50, height: 50, marginRight: 10}}/>
                <div><div style={{fontWeight: "bold"}}>{alerta.alumno.cuenta.nombres} {alerta.alumno.cuenta.apellidos} </div> Curso: {alerta.alumno.curso.nivel}°{alerta.alumno.curso.letra} | Fecha: {Moment(alerta.fecha).parseZone().format('DD [de] MMMM, HH:mm')}</div>
              </MenuItem>
              :
              <MenuItem onClick={()=>{window.location.href = "/dashboard/alumno/"+ alerta.alumno.id;}} style={{backgroundColor: '#e7fffe'}}>
              <Avatar src={alerta.alumno.cuenta.fotoUrl} style={{width: 50, height: 50, marginRight: 10}}/>
              <div><div style={{fontWeight: "bold"}}>{alerta.alumno.cuenta.nombres} {alerta.alumno.cuenta.apellidos} </div> Curso: {alerta.alumno.curso.nivel}°{alerta.alumno.curso.letra} | Fecha: {Moment(alerta.fecha).parseZone().format('DD [de] MMMM, HH:mm')}</div>
              </MenuItem>
            }
          </div>
        ))}
        <Typography variant="body2" style={{marginLeft: 10}}>
          Antes:
        </Typography>
        <Divider/>
        {anteriores && anteriores.map(alerta => (
          <div>
            {alerta.leida > 0 ? 
              <MenuItem onClick={()=>{window.location.href = "/dashboard/alumno/"+ alerta.alumno.id;}}>
              <Avatar src={alerta.alumno.cuenta.fotoUrl} style={{width: 50, height: 50, marginRight: 10}}/>
              <div><div style={{fontWeight: "bold"}}>{alerta.alumno.cuenta.nombres} {alerta.alumno.cuenta.apellidos} </div> Curso: {alerta.alumno.curso.nivel}°{alerta.alumno.curso.letra} | Fecha: {Moment(alerta.fecha).parseZone().format('DD [de] MMMM, HH:mm')}</div>
              </MenuItem>
              :
              <MenuItem onClick={()=>{window.location.href = "/dashboard/alumno/"+ alerta.alumno.id;}} style={{backgroundColor: '#e7fffe'}}>
              <Avatar src={alerta.alumno.cuenta.fotoUrl} style={{width: 50, height: 50, marginRight: 10}}/>
              <div><div style={{fontWeight: "bold"}}>{alerta.alumno.cuenta.nombres} {alerta.alumno.cuenta.apellidos} </div> Curso: {alerta.alumno.curso.nivel}°{alerta.alumno.curso.letra} | Fecha: {Moment(alerta.fecha).parseZone().format('DD [de] MMMM, HH:mm')}</div>
              </MenuItem>
            }
          </div>
        ))}
      </Menu>
    );
  }

  const nuevasAlertas = (alertas) => {
    for (let i = 0; i < alertas.length; i++) {
      if (alertas[i].leida < 1) {
        return(
          <NotificationsIcon style={{ color: '#ffffff', fontSize: 28 }} />
        );
      }
    }
    return(
      <NotificationsNone style={{ color: '#ffffff', fontSize: 28 }} />
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container
            spacing={1}
            justify="space-between"  
          >
            <Grid item xs={1} sm={1} md={4} lg={3} xl={3}>
              <Typography variant="h6" noWrap>
                {permisoName}
              </Typography>
            </Grid>
            {
              (permiso != 2) &&
              <Grid item xs={1} sm={1} md={4} lg={6} xl={6}>
                <FormControl variant="filled" style={{width: '100%'}}>
                  <Select
                    value={institutionId}
                    onChange={e => setInstitutionId(e.target.value)}
                    className={classes.instituciones}
                    disabled={!showInstitutions}
                  >
                    <MenuItem key={'0'} value={'0'}>Todas las instituciones</MenuItem>
                    {dataInstituciones.instituciones && dataInstituciones.instituciones.map(institucion => (
                      <MenuItem key={institucion.id} value={institucion.id}>{ institucion.nombre }</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> 
            }
            { permiso == 2 &&
              <Grid item container direction="row" xs={11} sm={11} md={8} lg={6} xl={4} >
              <ActualizarAlertas />
              <Grid item >
                <Divider orientation="vertical"/>
              </Grid>

              <Button onClick={handleClick}>
                {
                  ((permiso == 2)) && nuevasAlertas(data.alertasQuery)
                }
              </Button>
              {
                (permiso == 2) && procesarAlertas(data.alertasQuery)
              }
            </Grid>}
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
      <div className={classes.toolbar} />
        <Grid container style={{marginTop: -30}}>
          <Grid container justify="center" alignItems="center" >
            <Link to="/dashboard/perfil" style={style.textButton}>
              <img src={fotoUrl}  />
            </Link>
            <Typography variant="subtitle1" noWrap>
              {nombres.split(' ')[0]} {apellidos.split(' ')[0]}
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {institucion}
            </Typography>
          </Grid>
          <Divider />
          <List>
            <ListItem button >
              <Link to="/dashboard/home" style={style.textButton}>
                <ListItemIcon style={{float:'left'}}><DashboardIcon style={{color:'white'}} /></ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </Link> 
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button >
              <Link to="/dashboard/funcionarios" style={style.textButton}>
                <ListItemIcon style={{float:'left'}}><PeopleIcon style={{color:'white'}}/></ListItemIcon>
                <ListItemText>Funcionarios</ListItemText>
              </Link> 
            </ListItem>
            <ListItem button >
              <Link to="/dashboard/estudiantes" style={style.textButton}>
                <ListItemIcon style={{float:'left'}}><SchoolIcon style={{color:'white'}}/></ListItemIcon>
                <ListItemText>Estudiantes</ListItemText>
              </Link> 
            </ListItem>
            <ListItem button >
              <Link to="/dashboard/apoderados" style={style.textButton}>
                <ListItemIcon style={{float:'left'}}><WcIcon style={{color:'white'}}/></ListItemIcon>
                <ListItemText>Apoderados</ListItemText>
              </Link> 
            </ListItem>
            <ListItem button >
              <Link to="/dashboard/eventos" style={style.textButton}>
                <ListItemIcon style={{float:'left'}}><EventIcon style={{color:'white'}}/></ListItemIcon>
                <ListItemText>Eventos</ListItemText>
              </Link> 
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button >
              <Link to="/dashboard/configuracion" style={style.textButton}>
                <ListItemIcon style={{float:'left'}}><SettingsIcon style={{color:'white'}}/></ListItemIcon>
                <ListItemText>Configuracion</ListItemText>
              </Link> 
            </ListItem>
            <ListItem button >
              <Link  to="/login" style={style.textButton} onClick={()=>localStorage.clear()}>
                <ListItemIcon style={{float:'left'}}><CloseIcon style={{color:'white'}}/></ListItemIcon>
                <ListItemText>Cerrar Sesión</ListItemText>
              </Link> 
            </ListItem>
          </List>
        </Grid>
      </Drawer>
    </div>
  );
}

export default Sidebar;