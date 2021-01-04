import React, { Component } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { INTERESES } from '../../../graphql/queries/intereses';
import { Grid, DialogContent, TextField, Select, MenuItem, InputLabel, FormControl, Input, Checkbox } from '@material-ui/core/';
import AgregarEvento from '../../../graphql/mutations/agregarEvento';
import FileBase64 from 'react-file-base64';
import CheckIcon from '@material-ui/icons/DoneAll';

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
  },
  dialog: {
    width: 500,
  }
}));

export default function AddEvento (props) {
  const { evento, handleChange, cerrar, interes_id, resetEventForm } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [foto, setFoto] = React.useState('');
  const [checked, setChecked] = React.useState(true);

  const handleCheckbox = (event) => {
    setChecked(event.target.checked);
  }

  const { loading, error, data, refetch } = useQuery(INTERESES, 
    {
      onError(){
        console.log(error.message)
      }
    });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  if (loading) {
    return <p>Cargando</p>
  }

  if (error){
    return <p>Error</p>
  }
  
  return (
    <div className={classes.dialog}>
      <DialogContent>
        <Grid container 
          direction="column"
          justify="center"
          alignItems="center"
          spacing={0}
        >
          <Grid container item direction="row" xs={12} justify="center">
            <Grid item xs={12}>
              <FormControl required style={{width:"100%"}}>
                <InputLabel>Titulo</InputLabel>
                <Input value={evento.titulo} onChange={handleChange("titulo") } style={{margin:25}} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item direction="row" xs={12} justify="flex-end">
            <Grid item xs={6}>
              <FormControl required style={{width:"100%"}}>
                <InputLabel id="demo-simple-select-label">Interés</InputLabel>
                <Select
                  value={interes_id}
                  labelId="demo-simple-select-label"
                  onClick={handleChange("interes_id")}
                  inputProps={{
                    name: 'interes_id',
                    id: 'interes_id',
                  }}
                  style={{margin:25}}
                >
                  {data.intereses && data.intereses.map(interes => (
                    <MenuItem value={interes.id}>{interes.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item direction="row" xs={12} justify="center">
            <Grid item xs={12} justify="center">
              <FormControl required style={{width:"95%"}}>
                <TextField
                  required
                  id="outlined-multiline-static"
                  label="Contenido"
                  value={evento.contenido}
                  onChange={handleChange("contenido") }
                  multiline
                  rows={6}
                  defaultValue="Default Value"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item direction="row" xs={12} justify="center" alignItems="flex-end" className={classes.boton}>
            <Grid item xs={8}>
              <InputLabel id="demo-simple-select-label">Fecha</InputLabel>
              <TextField
                id="date"
                type="date"
                defaultValue={evento.fecha}
                className={classes.textField}
                value={evento.fecha}
                onChange={handleChange("fecha")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid container item direction="row" xs={4} alignItems="center">
              <InputLabel id="demo-simple-select-label">Visible</InputLabel>
              <Checkbox
                checked={checked}
                onChange={handleCheckbox}
                inputProps={{
                  name: 'visibilidad',
                  id: 'visibilidad',
                }}
              />
            </Grid>
          </Grid>
          <Grid container item direction="row" xs={12} justify="center" alignItems="flex-end" className={classes.boton}>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label">Foto</InputLabel>
              <FileBase64
                multiple={ false }
                onDone={ (file) => setFoto(file.base64)}
              />
              <CheckIcon style={foto !== '' ? {fill: 'green'} : {fill: 'white'}} />
            </Grid>  
          </Grid>
          <Grid container item direction="row" justify="center" xs={6} className={classes.boton}>
            <AgregarEvento evento={evento} resetEventForm={resetEventForm} visibilidad={checked} foto={foto} interes_id={interes_id} cerrar={cerrar}/>
          </Grid>
        </Grid>
      </DialogContent>
    </div>
  ) 
}