import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Eventos from './Eventos';
import Moment from 'moment';
import { connect } from  'react-redux';

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


class EventosComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titulo: '',
      contenido: '',
      fecha: Moment().format('YYYY-MM-DD'),
      foto: '',
      visibilidad: 1,
      interes_id: 1,
    }
  }
  
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  resetEventForm = () => {
    this.setState({ 
      titulo: '',
      contenido: '',
      fecha: Moment().format('YYYY-MM-DD'),
      foto: '',
      visibilidad: 1,
      interes_id: 1,
    });
  }

  render() {
    const { classes } = this.props;

    let evento = { titulo: this.state.titulo, contenido: this.state.contenido, fecha: this.state.fecha, foto: this.state.foto, visibilidad: this.state.visibilidad, interes_id: this.state.interes_id}

    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <h1>Eventos</h1>
          <Eventos
            handleChange={this.handleChange}
            evento={evento}
            resetEventForm={this.resetEventForm}
            interes_id={this.state.interes_id}
            institutionId={this.props.institutionId}
          />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { institutionId: state.institutionId };
}

export default connect(mapStateToProps)(withStyles(useStyles)(EventosComponent));