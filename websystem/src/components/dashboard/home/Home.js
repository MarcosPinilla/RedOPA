import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button, Grid, Dialog, DialogActions, DialogTitle, Typography } from '@material-ui/core/';
import ListAlt from '@material-ui/icons/ListAlt';
import ExportarExcel from './ExportarExcel';

import EvaluacionesStats from './EvaluacionesStats';
import AutoevaluacionesAlumnos from './AutoevaluacionesAlumnos';
import CoevaluacionesAlumnos from './CoevaluacionesAlumnos';
import EvaluacionesApoderados from './EvaluacionesApoderados';
import Estudiantes from './EstudiantesRiesgo';
import PromedioFuncionarios from './PromedioFuncionarios';
import UsuariosActivos from './UsuariosActivos';
import AlumnosActivos from './AlumnosActivos';
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


export default function Home(props) {
  const { institutionId } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const permiso = localStorage.getItem('permisoid');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (permiso == 2){
    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container
            direction="row"
            justify="flex-end"
            alignContent="center"
            spacing={0}
            alignItems="stretch" className={classes.container}>
            <Grid container item xs={12} justify="flex-end" spacing={0}>
              <Grid item xs={6} sm={6} md={3} lg={3} xl={2}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={()=>handleClickOpen()}
                >
                  <ListAlt/> Exportar a Excel
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <Grid container justify="center">
                    <DialogTitle id="form-dialog-title">Exportar Datos</DialogTitle>
                    <Grid item xs={12}>
                      <ExportarExcel cerrar={handleClose} />
                    </Grid>
                    
                  </Grid>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cerrar
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={4}>
              <Grid className={classes.box}>
                <Typography variant="h6">
                  Evaluaciones del mes 
                </Typography>
                <EvaluacionesStats />
              </Grid>
              <Grid className={classes.box}>
                <Typography variant="h6">
                  Porcentaje de usuarios activos
                </Typography>
                <UsuariosActivos />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={4} className={classes.box}>
              <Typography variant="h6">
                Alumnos en riesgo hoy
              </Typography>
              <Estudiantes/>           
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} className={classes.box}>
              <Typography variant="h6">
                Autoevaluaciones de alumnos
              </Typography>
              <AutoevaluacionesAlumnos />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} className={classes.box}>
              <Typography variant="h6">
                Coevaluaciones de alumnos
              </Typography>
              <CoevaluacionesAlumnos />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={7} xl={4} className={classes.box}>
              <Typography variant="h6">
                Evaluaciones de apoderados
              </Typography>
              <EvaluacionesApoderados />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={5} xl={4} className={classes.box}>
              <Typography variant="h6">
                Evaluaciones de funcionarios
              </Typography>
              <PromedioFuncionarios />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} className={classes.box}>
              <Typography variant="h6">
                Estudiantes activos
              </Typography>
              <AlumnosActivos />
            </Grid>
          </Grid>
        </main>
      </div>
    );
  } else {
    return(
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container
            direction="row"
            justify="flex-end"
            alignContent="center"
            spacing={0}
            alignItems="stretch" className={classes.container}>
            <Grid container item xs={12} justify="flex-end" spacing={0}>
              <Grid item xs={6} sm={6} md={3} lg={3} xl={2}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={()=>handleClickOpen()}
                >
                  <ListAlt/> Exportar a Excel
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <Grid container justify="center">
                    <DialogTitle id="form-dialog-title">Exportar Datos</DialogTitle>
                    <Grid item xs={12}>
                      <ExportarExcel cerrar={handleClose} institucion_id={institutionId} />
                    </Grid>
                    
                  </Grid>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cerrar
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={4}>
              <Grid className={classes.box}>
                <Typography variant="h6">
                  Evaluaciones del mes
                </Typography>
                <EvaluacionesStats institucion_id={institutionId}/>
              </Grid>
              <Grid className={classes.box}>
                <Typography variant="h6">
                  Porcentaje de usuarios activos
                </Typography>
                <UsuariosActivos institucion_id={institutionId}/>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={4} className={classes.box}>
              <Typography variant="h6">
                Alumnos en riesgo hoy
              </Typography>
              <Estudiantes institucion_id={institutionId}/>          
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} className={classes.box}>
              <Typography variant="h6">
                Autoevaluaciones de alumnos
              </Typography>
              <AutoevaluacionesAlumnos institucion_id={institutionId} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} className={classes.box}>
              <Typography variant="h6">
                Coevaluaciones de alumnos
              </Typography>
              <CoevaluacionesAlumnos institucion_id={institutionId} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={7} xl={4} className={classes.box}>
              <Typography variant="h6">
                Evaluaciones de apoderados
              </Typography>
              <EvaluacionesApoderados institucion_id={institutionId} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={5} xl={4} className={classes.box}>
              <Typography variant="h6">
                Evaluaciones de funcionarios
              </Typography>
              <PromedioFuncionarios institucion_id={institutionId} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} className={classes.box}>
              <Typography variant="h6">
                Estudiantes activos
              </Typography>
              <AlumnosActivos institucion_id={institutionId} />
            </Grid>
          </Grid>
        </main>
      </div>
    )
  }
}

