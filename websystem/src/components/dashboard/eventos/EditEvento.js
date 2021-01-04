import React, { Component } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, DialogContent, TextField, Select, MenuItem, InputLabel, FormControl, Input, Checkbox, FormLabel } from '@material-ui/core/';
import EditarEvento from '../../../graphql/mutations/editarEvento';
import Moment from 'moment';
import 'moment/locale/es';
import { INTERESES } from '../../../graphql/queries/intereses';
import FileBase64 from 'react-file-base64';

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

export default function EditEvento (props) {
  const classes = useStyles();
  const { eventoEditar, cerrar } = props;

  const [titulo, setTitulo] = React.useState(eventoEditar.titulo);
  const [contenido, setContenido] = React.useState(eventoEditar.contenido);
  const [fecha, setFecha] = React.useState(Moment.utc(eventoEditar.fecha).format('YYYY-MM-DD'));
  const [foto, setFoto] = React.useState(eventoEditar.foto);
  const [interes, setInteres] = React.useState(eventoEditar.interes.id);
  const [visibilidad, setVisibilidad] = React.useState(eventoEditar.visibilidad);

  const { loading, error, data, refetch } = useQuery(INTERESES, 
    {
      onError(){
        console.log(error.message)
      }
    }
  );

  const handleCheckbox = (event) => {
    setVisibilidad(event.target.checked);
  }
  
  if (loading) {
    console.log("cargando al evento"+props.id);
  
    return <p>Cargando</p>
  }

  if (error){
    console.log("error al evento"+props.id);
    return <p>Error</p>
  }
  
  return (
    <DialogContent className={classes.dialog}>
      <Grid container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid container item direction="row" xs={12}>
          <Grid item xs={12}>
            <FormControl style={{width:"100%"}}>
              <InputLabel>Título</InputLabel>
              <Input value={titulo} onChange={e => setTitulo(e.target.value)} style={{margin: 25}} />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container item direction="row" xs={12} justify="flex-end">
          <Grid item xs={6}>
            <FormControl required style={{width:"100%"}}>
              <InputLabel id="demo-simple-select-label">Interés</InputLabel>
              <Select
                value={interes}
                labelId="demo-simple-select-label"
                onClick={e => setInteres(e.target.value)}
                inputProps={{
                  name: 'interes',
                  id: 'interes',
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

        <Grid container item direction="row" xs={12}>
          <Grid item xs={12} justify="center">
            <FormControl style={{width:"95%"}}>
              <TextField
                required
                id="outlined-multiline-static"
                label="Contenido"
                value={contenido}
                onChange={e => setContenido(e.target.value)}
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

        <Grid container item direction="row" xs={12} className={classes.boton}>
          <Grid item xs={8}>
            <InputLabel id="demo-simple-select-label">Fecha</InputLabel>
            <TextField
              id="date"
              type="date"
              defaultValue={fecha}
              className={classes.textField}
              value={fecha}
              onChange={e => setFecha(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel id="demo-simple-select-label">Visible</InputLabel>
            <Checkbox
              checked={visibilidad}
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
              onDone={ file => setFoto(file.base64)}
            />
          </Grid>  
        </Grid>

        <Grid container item direction="row" justify="center" xs={6} className={classes.boton}>
          <EditarEvento evento_id={eventoEditar.id} titulo={titulo} contenido={contenido} fecha={fecha} foto={foto} interes_id={interes} visibilidad={visibilidad} cerrar={cerrar} />
        </Grid>
      </Grid>
    </DialogContent>
  )
}