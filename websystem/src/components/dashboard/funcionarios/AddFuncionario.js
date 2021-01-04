import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, DialogContent, TextField, Select, MenuItem, InputLabel, FormControl, Input, Checkbox } from '@material-ui/core/';
import AgregarFuncionario from '../../../graphql/mutations/agregarFuncionario';

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

export default function AddFuncionario (props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const { funcionario, handleChange, cerrar, formatRut, institutionId } = props;
  let profesor = false;

  const handleCheckbox = (event) => {
    setChecked(event.target.checked);
    profesor = event.target.checked;
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
                <Input value={formatRut(funcionario.rut)} onChange={handleChange("rut") } style={{margin:25}} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl required>
                <InputLabel id="demo-simple-select-label">Género</InputLabel>
                <Select
                  value={funcionario.genero_id}
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
                <Input value={funcionario.nombres} onChange={handleChange("nombres")} style={{margin:25}} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl required>
                <InputLabel>Apellidos</InputLabel>
                <Input value={funcionario.apellidos} onChange={handleChange("apellidos")} style={{margin:25}} />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel>Email</InputLabel>
                <Input value={funcionario.email} onChange={handleChange("email")} style={{margin:25}} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel>Telefono</InputLabel>
                <Input value={funcionario.telefono} onChange={handleChange("telefono")} style={{margin:25}} />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container item direction="row" xs={12}>
            <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">Nacimiento</InputLabel>
              <TextField
                id="date"
                type="date"
                defaultValue="2017-05-24"
                className={classes.textField}
                value={funcionario.nacimiento}
                onChange={handleChange("nacimiento")}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{margin:25, width:"80%"}}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl required>
                <InputLabel>Cargo</InputLabel>
                <Input value={funcionario.cargo} onChange={handleChange("cargo")} style={{margin:25}} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item direction="row" justify="center" alignItems="center" xs={12} style={{margin: 10}}>
              <InputLabel id="demo-simple-select-label">¿Es profesor?</InputLabel>
              <Checkbox
                checked={checked}
                onChange={handleCheckbox}
                inputProps={{
                  name: 'profesor',
                  id: 'profesor',
                }}
              />
          </Grid>

          <Grid container item direction="row" justify="center" xs={6} className={classes.boton}>
            <AgregarFuncionario funcionario={funcionario} cerrar={cerrar} profesor={profesor} institucion_id={institutionId}/>
          </Grid>
        </Grid>
      </DialogContent>
    </div>
  )
}
