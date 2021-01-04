import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Apoderados from './Apoderados';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing(3),
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
  },
}));

export default function ApoderadosComponent(props) {
  const { institutionId } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <h1>Apoderados</h1>
        <Apoderados
          institutionId={institutionId}
        />
      </main>
    </div>
  )
}