import React, { Component } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { CURSOS } from '../../../graphql/queries/cursos';
import { Grid, DialogContent, TextField, Select, MenuItem, InputLabel, FormControl, Input } from '@material-ui/core/';
import AgregarAlumno from '../../../graphql/mutations/agregarAlumno';

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
  boton: {
    marginTop: 25,
  }
}));

export default function AddEstudiante (props) {
  const classes = useStyles();
  const { alumno, handleChange, cerrar, curso_id, formatRut, institutionId } = props;
  const permiso = localStorage.getItem('permisoid');

  const { loading, error, data, refetch } = useQuery(CURSOS, 
    {
      variables: {
        institucion_id: institutionId
      },
      onError(){
        console.log(error.message)
      }
    });
  
  if (loading) {
    console.log("cargando al alumno"+props.id);
  
    return <p>Cargando</p>
  }

  if (error){
    console.log("error al alumno"+props.id);
    return <p>Error</p>
  }
  
  function listarInstituciones() {
    if (permiso > 2) {
      return (
        <div>
          <Grid container item direction="row" alignItems="stretch" justify="space-between" xs={12} style={{width:'100%'}}>
            <Grid item xs={6}>
              <TextField
                id="date"
                type="date"
                label="Nacimiento"
                defaultValue={"2017-05-24"}
                className={classes.textField}
                value={alumno.nacimiento}
                onChange={handleChange("nacimiento")}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{marginRight:35, marginTop: 10, width:"100%"}}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl required style={{minWidth: '100%'}}>
                <InputLabel id="demo-simple-select-label">Cursos</InputLabel>
                <Select
                  disabled={!(permiso == 2 || institutionId > 0)}
                  value={curso_id}
                  onClick={handleChange("curso_id")}
                  inputProps={{
                    name: 'curso_id',
                    id: 'curso_id',
                  }}
                  style={{margin:25}}
                >
                  {data.cursosInstitucionQuery && data.cursosInstitucionQuery.map(curso => (
                    <MenuItem key={curso.id} value={curso.id}>{curso.nivel}°{curso.letra}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      )
    } else {
      return (
        <Grid container item direction="row" alignItems="stretch" xs={12}>
          <Grid item xs={6}>
            <TextField
              id="date"
              type="date"
              label="Nacimiento"
              defaultValue="2017-05-24"
              className={classes.textField}
              value={alumno.nacimiento}
              onChange={handleChange("nacimiento")}
              InputLabelProps={{
                shrink: true,
              }}
              style={{margin:25, width:"80%"}}
            />
          </Grid>
          
          <Grid item xs={6}>
            <FormControl required>
              <InputLabel id="demo-simple-select-label">Cursos</InputLabel>
              <Select
                disabled={!(permiso == 2 || institutionId > 0)}
                value={curso_id}
                onClick={handleChange("curso_id")}
                inputProps={{
                  name: 'curso_id',
                  id: 'curso_id',
                }}
                style={{margin:25}}
              >
                {data.cursosInstitucionQuery && data.cursosInstitucionQuery.map(curso => (
                  <MenuItem key={curso.id} value={curso.id}>{curso.nivel}°{curso.letra}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )
    }
  }

  return (
    <div>
      <DialogContent>
        <Grid container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <FormControl required>
                <InputLabel>Rut</InputLabel>
                <Input value={formatRut(alumno.rut)} onChange={handleChange("rut") } style={{margin:25}} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl required>
                <InputLabel>Género</InputLabel>
                <Select
                  value={alumno.genero_id}
                  onClick={handleChange("genero_id")}
                  inputProps={{
                    name: 'genero_id',
                    id: 'genero_id',
                  }}
                  style={{margin:25, width: '100%'}}
                >
                  <MenuItem value={1}>Masculino</MenuItem>
                  <MenuItem value={2}>Femenino</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <FormControl required>
                <InputLabel>Nombres</InputLabel>
                <Input value={alumno.nombres} onChange={handleChange("nombres")} style={{margin:25}} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl required>
                <InputLabel>Apellidos</InputLabel>
                <Input value={alumno.apellidos} onChange={handleChange("apellidos")} style={{margin:25}} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel>Email</InputLabel>
                <Input value={alumno.email} onChange={handleChange("email")} style={{margin:25}} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel>Telefono</InputLabel>
                <Input value={alumno.telefono} onChange={handleChange("telefono")} style={{margin:25}} />
              </FormControl>
            </Grid>
          </Grid>

          {listarInstituciones()}

          <Grid container item direction="row" justify="center" xs={6} className={classes.boton}>
            <AgregarAlumno alumno={alumno} curso_id={curso_id} cerrar={cerrar} institucion_id={institutionId}/>
          </Grid>
        </Grid>
      </DialogContent>
    </div>
  )
}