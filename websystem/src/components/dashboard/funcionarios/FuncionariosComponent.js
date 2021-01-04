import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Funcionarios from './Funcionarios';
import { connect } from 'react-redux';

const drawerWidth = 240;

const useStyles = theme => ({
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
  }
});


class FuncionariosComponent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      rut: '',
      nombres: '',
      apellidos: '',
      nacimiento: '',
      genero_id: 1,
      email: '',
      telefono: '',
      cargo: '',
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render(){
    const { classes } = this.props;

    let funcionario = { rut: this.state.rut, nombres: this.state.nombres, apellidos: this.state.apellidos, nacimiento: this.state.nacimiento, genero_id: this.state.genero_id, email: this.state.email, telefono: this.state.telefono, cargo: this.state.cargo };
    
    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <h1>Funcionarios</h1>
          <Funcionarios
            institutionId={this.props.institutionId} 
            funcionario={funcionario}
            handleChange={this.handleChange}
          />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { institutionId: state.institutionId };
}

export default connect(mapStateToProps)(withStyles(useStyles)(FuncionariosComponent));