import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, DialogContent, TextField, Select, MenuItem, InputLabel, FormControl, Input, Checkbox, FormLabel } from '@material-ui/core/';
import EditarApoderado from '../../../graphql/mutations/editarApoderado';

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

export default function EditApoderado (props) {
  const classes = useStyles();
  const { apoderadoEditar, cerrar, formatRut } = props;

  const [nombres, setNombres] = React.useState(apoderadoEditar.cuenta.nombres);
  const [apellidos, setApellidos] = React.useState(apoderadoEditar.cuenta.apellidos);
  const [email, setEmail] = React.useState(apoderadoEditar.cuenta.email);
  const [telefono, setTelefono] = React.useState(apoderadoEditar.cuenta.telefono);
  const [nacimiento, setNacimiento] = React.useState(apoderadoEditar.cuenta.nacimiento);

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
              <FormControl>
                <InputLabel>Nombres</InputLabel>
                <Input value={nombres} onChange={e => setNombres(e.target.value)} style={{margin:25}} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel>Apellidos</InputLabel>
                <Input value={apellidos} onChange={e => setApellidos(e.target.value)} style={{margin:25}} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item direction="row" alignItems="center" xs={12}>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel>Rut</InputLabel>
                <Input value={formatRut(apoderadoEditar.cuenta.rut)} disabled style={{margin:25}} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <TextField
                  id="date"
                  type="date"
                  label="Nacimiento"
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  value={nacimiento}
                  onChange={e => setNacimiento(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{margin:25, width:"90%"}}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel>Email</InputLabel>
                <Input value={email} onChange={e => setEmail(e.target.value)} style={{margin:25}} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel>Telefono</InputLabel>
                <Input value={telefono} onChange={e => setTelefono(e.target.value)} style={{margin:25}} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item direction="row" justify="center" xs={6} className={classes.boton}>
            <EditarApoderado apoderado_id={apoderadoEditar.id} nombres={nombres} apellidos={apellidos} email={email} telefono={telefono} cerrar={cerrar} />
          </Grid>
        </Grid>
      </DialogContent>
    </div>
  )
}
