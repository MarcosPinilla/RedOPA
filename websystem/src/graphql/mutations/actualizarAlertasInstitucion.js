import React from 'react';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useQuery } from '@apollo/react-hooks';
import { Button, Grid, FormGroup, FormControlLabel, Switch, Typography, Divider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined';
import { ALERTAS_INSTITUCION } from '../queries/alertasInstitucion';
import MailOutlined from '@material-ui/icons/MailOutlined';

const UPDATE_ALERTAS = gql`
  mutation updateAlertas ($recibirAlertas: Boolean!, $institucion_id: ID!) {
    updateAlertas (recibirAlertas: $recibirAlertas, institucion_id: $institucion_id)
  }
`;

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
  texto: {
    margin: 10,
    color: '#898989',
  },
}));

const ActualizarAlertasInstitucion = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const institucion = localStorage.getItem("institucion");
  const [updateAlertas, {data, loading, error}] = useMutation(
    UPDATE_ALERTAS,
    {
      onCompleted({ updateAlertas }) {
        refetchAlertas()
      }
    }
  )
  
  const { loading: loadingAlertas, error: errorAlertas, data: dataAlertas, refetch: refetchAlertas } = useQuery(ALERTAS_INSTITUCION, 
    {
      onError(){
        // console.log(error.message)
      }
    }
  );


  if (error) {
    console.log(error);
  }
  
  if (loading || loadingAlertas) return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Grid container direction="row" alignItems="center">
            <Grid container item xs={9} direction="row">
              <Grid item xs={2}>
                <MailOutlined/>
              </Grid>
              <Grid item xs={10}>
                <Typography style={{marginLeft: 5}}>Cargando...</Typography>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Switch
                checked={false}
                name="checked"
                color="secondary"
              />
            </Grid>
          </Grid>
        }
      />
    </FormGroup>
  );

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Grid container direction="row" alignItems="center">
            <Grid container item xs={9} direction="row">
              <Grid item xs={2}>
                <MailOutlined/>
              </Grid>
              <Grid item xs={10}>
                <Typography style={{marginLeft: 5}}>Recibir correos</Typography>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Switch
                checked={dataAlertas.alertasInstitucion}
                onChange={e => updateAlertas({ variables: { recibirAlertas: e.target.checked, institucion_id: institucion } })}
                name="checked"
                color="secondary"
              />
            </Grid>
          </Grid>
        }
      />
    </FormGroup>
  )
}

export default ActualizarAlertasInstitucion;