import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AlumnoQuery from './AlumnoQuery';
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
});


class AlumnoComponent extends Component {
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
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    let apoderado = { rut: this.state.rut, nombres: this.state.nombres, apellidos: this.state.apellidos, nacimiento: this.state.nacimiento, genero_id: this.state.genero_id, email: this.state.email, telefono: this.state.telefono };
    const { id } = this.props.match.params;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <AlumnoQuery
            id = {id}
            handleChange={this.handleChange}
            apoderado = {apoderado}
            institutionId={this.props.institutionId}
          />
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { institutionId: state.institutionId }; 
}

export default connect(mapStateToProps)(withStyles(useStyles)(AlumnoComponent));