import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import { EVENTOS } from '../../../graphql/queries/eventos'
import { Button, Grid, Typography, DialogContent} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Moment from 'moment';
import 'moment/locale/es';

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
  button: {
    margin: 15
  },
  rootCard: {
    maxWidth: 450,
    margin:10,
    minHeight: 380,
    maxHeight: 470,
    minWidth: 450,
  },
  media: {
    height: 200,
  },
  contenido: {
    marginTop: 10,
    maxHeight: 170,
    minHeight: 100,
    overflow: 'auto'
  },
  fecha: {
    marginTop: 10,
  }
}));

export default function VistaPrevia (props) {
  const classes = useStyles();
  
  const { evento, cerrar } = props;

  return (
    <DialogContent>
      <Card className={classes.rootCard}>
        <CardActionArea>
          <CardMedia>
            <Typography gutterBottom variant="h5" component="h2">
              {evento.titulo}
            </Typography>
          </CardMedia>
          <CardContent>
            <CardMedia
              className={classes.media}
              image={evento.fotoUrl}
              title="Imagen de evento"
            />
            <Grid>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.contenido}>
                {evento.contenido}
              </Typography>
            </Grid>
            <Grid container justify="flex-end">
              <Typography variant="body4" color="textSecondary" className={classes.fecha}>
                {Moment(evento.fecha).parseZone().format('DD [de] MMMM YYYY')}
              </Typography>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </DialogContent>
  );
}