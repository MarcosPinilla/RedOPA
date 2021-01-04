import React, { Component } from 'react';
import '../../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const style = {
  login: {
    flexGrow: 1,
    height: '100%'
  },
  loginIzquierda: {
    //backgroundColor: '#FE6B8B',
    height: '100%'
  },
  loginDerecha: {
    //backgroundColor: '#FF8E53',
  },
  textInput: {
    width: '70%',
  },
  container: {
    margin: 10,
  },
  button: {
    margin: 12,
    width: '70%',
  }
};

export default class Recuperar extends Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
      recordar: false,
    };
  }

  handleChange(recordar) {
    this.setState({
      recordar: true,
    });
  }

  render() {
    return (
      <Grid container className="classes.login" spacing={2} direction="row" justify="center" alignItems="center" style={style.login}>
        <Grid item xs={6} className="classes.loginIzquierda" style={style.loginIzquierda} height="100%">
        </Grid>
        <Grid item xs={6} className="classes.loginDerecha" style={style.loginDerecha}>
          <Grid item direction="column">
            <Grid>
              <Typography variant="h1" gutterBottom>
              OPA
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle1" gutterBottom>
                Ingrese su correo electrónico y le enviaremos un enlace para restablecer la contraseña.
              </Typography>
            </Grid>
            <Grid>
              <TextField required label="Email" margin="normal" style={style.textInput} />
            </Grid>
            <Grid>
              <Button variant="contained" color="primary" style={style.button}>
                Enviar solicitud
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}