import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import FuncionarioQuery from './FuncionarioQuery'

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


class FuncionarioComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { id } = this.props.match.params;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <FuncionarioQuery id = {id}/>
        </main>
      </div>
    );
  }
}

export default withStyles(useStyles)(FuncionarioComponent);