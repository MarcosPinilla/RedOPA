import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid, Typography, Button } from '@material-ui/core';
import UmbralRiesgo from './UmbralRiesgo';
import EstudiantesEliminados from './EstudiantesEliminados';
import ApoderadosEliminados from './ApoderadosEliminados';
import FuncionariosEliminados from './FuncionariosEliminados';
import EventosEliminados from './EventosEliminados';
import InfoIcon from '@material-ui/icons/Info';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    marginLeft: drawerWidth,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root2: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  input: {
    display: 'none',
  },
  container: {
    marginTop: 0,
    overflow:'hidden',
  },
  box: {
    border:"3px solid #fafafa",
    borderRadius:5,
    padding:10,
    backgroundColor: '#efefef',
  }
}));


const ConfiguracionComponent = (props) => {
  const { institutionId } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <h1>Configuración</h1>

        { (institutionId === 0 || institutionId === '0')
          ? <Grid container direction="row" justify='center' style={{marginTop: 30}}>
            <InfoIcon htmlColor='purple'/>
            <Typography variant="body1" style={{marginLeft: 5}}>Seleccione una institución para ver las opciones.</Typography>
          </Grid> 
          : <Grid container
            direction="row"
            justify="flex-start"
            alignContent="center"
            spacing={0}
            alignItems="stretch" className={classes.container}
          >
            <Grid item xs={12} sm={12} md={4} lg={4} xl={3} className={classes.box}>
              <UmbralRiesgo institutionId={institutionId}/>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={3} className={classes.box}>
              <EstudiantesEliminados institutionId={institutionId}/>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={3} className={classes.box}>
              <ApoderadosEliminados institutionId={institutionId}/>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={3} className={classes.box}>
              <FuncionariosEliminados institutionId={institutionId}/>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={3} className={classes.box}>
              <EventosEliminados institutionId={institutionId}/>
            </Grid>
          </Grid>
        }
      </main>
    </div>
  );
}

export default ConfiguracionComponent;