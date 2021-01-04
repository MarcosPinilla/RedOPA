import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Select, MenuItem, InputLabel, FormControl, Input } from '@material-ui/core/';
import { useParams } from 'react-router-dom';
import  AgregarApoderado from '../../../graphql/mutations/agregarApoderado';

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
  const { alumno_id, apoderado, handleChange, cerrar, formatRut, institutionId } = props;
  const classes = useStyles();
  
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
                <Input value={formatRut(apoderado.rut)} onChange={handleChange("rut") } style={{margin:25}} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl required>
                <InputLabel id="demo-simple-select-label">Género</InputLabel>
                <Select
                  value={apoderado.genero_id}
                  labelId="demo-simple-select-label"
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
                <Input value={apoderado.nombres} onChange={handleChange("nombres")} style={{margin:25}} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl required>
                <InputLabel>Apellidos</InputLabel>
                <Input value={apoderado.apellidos} onChange={handleChange("apellidos")} style={{margin:25}} />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel>Email</InputLabel>
                <Input value={apoderado.email} onChange={handleChange("email")} style={{margin:25}} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel>Telefono</InputLabel>
                <Input value={apoderado.telefono} onChange={handleChange("telefono")} style={{margin:25}} />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <TextField
                id="date"
                type="date"
                label="Nacimiento"
                defaultValue="2017-05-24"
                className={classes.textField}
                value={apoderado.nacimiento}
                onChange={handleChange("nacimiento")}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{margin:25, width:"80%"}}
              />
            </Grid>
          </Grid>
          
          <Grid container item direction="row" justify="center" xs={6} className={classes.boton}>
            <AgregarApoderado institutionId={institutionId} formatRut={formatRut} apoderado={apoderado} alumno_id={alumno_id} cerrar={cerrar}/>
          </Grid>
        </Grid>
      </DialogContent>
    </div>
  )
}
