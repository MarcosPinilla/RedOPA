import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import LoginMutation from '../../graphql/mutations/login';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import '../../App.css';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

import { Link } from 'react-router-dom'



const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    marginBottom: 0
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  title: {
    fontSize: 14,
  },
  textField: {
    flexBasis: 200,
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: '#f5c556',
    '&:hover': {
      backgroundColor: '#dba62a',
    },
  },
  login: {
    flexGrow: 1,
    height: '100vh',
    backgroundColor: '#57457F',
  },
  loginIzquierda: {
    //backgroundColor: '#FE6B8B',
    height: '100%'
  },
  loginDerecha: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
  },
  textInput: {
    width: '70%',
  },
  container: {
    margin: 10,
  },
  link: {
    textDecoration: 'none',
  },
  button2: {
    margin: 12,
    width: '70%',
  }

});


class Login extends Component {
  state = {
    password: '',
    access: '',
    showPassword: false,
    recordar: false,
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleChangeRecordar(recordar) {

    if(this.state.recordar){
      this.setState({recordar: false})
    }{
      this.setState({
        recordar: true,
      });
    }
    
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;
    const user = { access: this.state.access, password: this.state.password };

    const token = localStorage.getItem('token');

    if (token) {
      window.location.href = "/dashboard/home"
    }
    
    return (
      <div className={classes.root} fullHeight>
        <Grid container className={classNames(classes.login)} spacing={2} direction="row" justify="center" alignItems="center"  height="100%">
          <Grid item xs={4} className={classNames(classes.loginIzquierda)}  height="100%">
          </Grid>
          <Grid item xs={4} className={classNames(classes.loginDerecha)} >
            <Grid item direction="column" justify="center" alignItems="center" style={{margin:25,}}>
              <Grid xs={12}>
                <img src={require('../../assets/opa_logo.svg')} width="60%" style={{margin:25}}></img>
              </Grid>
              <Grid xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  ¡Bienvenido nuevamente! Por favor, ingrese a su cuenta.
                </Typography>
              </Grid>
              <Grid xs={12} >
                <FormControl fullWidth className={classNames(classes.margin)}>
                  <InputLabel htmlFor="user">Username</InputLabel>
                  <Input
                    id="access"
                    value={this.state.access}
                    onChange={this.handleChange('access')}
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} >
                <FormControl fullWidth className={classNames(classes.margin)}>
                  <InputLabel htmlFor="pass">Password</InputLabel>
                  <Input
                    id="pass"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword} >
                          {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    startAdornment={
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} spacing={2} direction="row" container className={classNames(classes.container)}>
                <Grid xs={6}>
                  <Checkbox checked={this.state.recordar} onChange={(recordar) => this.handleChangeRecordar(recordar)} value="recordar" inputProps={{'aria-label': 'primary checkbox'}} />
                  Recordarme
                </Grid>
                <Grid xs={6}>
                  <Link to="/recuperar" className={classNames(classes.link)}>Olvidé mi contraseña</Link>
                </Grid>
              </Grid>
              <Grid>
                <FormControl xs={8} className={classNames(classes.margin)} >
                  <LoginMutation user={user}/>  
                </FormControl> 
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} className={classNames(classes.loginIzquierda)}  height="100%">
          </Grid>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
