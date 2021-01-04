import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import { Grid, Typography, Button, CssBaseline, Select, MenuItem } from '@material-ui/core';
import EditOutlined from '@material-ui/icons/EditOutlined';
import { PROMEDIO_FUNCIONARIOS } from '../../../graphql/queries/promedioevaluacionesfuncionarios';

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
}));

export default function PromedioFuncionarios(props) {
  const classes = useStyles();

  const { institucion_id } = props;

  const [periodo, setPeriodo] = React.useState('mes');
  const institucion = localStorage.getItem("institucion");

  const { loading, error, data, refetch } = useQuery(PROMEDIO_FUNCIONARIOS, 
    {
      variables: {periodo: periodo, institucion_id},
      onError(){
        console.log(error.message)
      }
    }
  );
  
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refreshing]);

  if (loading) return(
    <Grid container direction="column">
      <p>Promedio de evaluaciones hechas por funcionarios</p>
      <Select
        labelId="demo-simple-select-label"
        style={{marginTop: 25, maxWidth: '40%', alignSelf: 'center'}}
        alignSelf='flex-end'
        disabled
      >
        <MenuItem value={''}>Cargando...</MenuItem>
      </Select>
      <Typography variant="h1" style={{margin: 10}} color="primary">0.0</Typography>
    </Grid>
  );

  if (error) {
    window.location.reload();
  }

  return(
    <Grid container direction="column">
      <p>Promedio de evaluaciones hechas por funcionarios</p>
      <Select
        value={periodo}
        labelId="demo-simple-select-label"
        onChange={e => setPeriodo(e.target.value)}
        style={{marginTop: 25, maxWidth: '40%', alignSelf: 'center'}}
        alignSelf='flex-end'
      >
        <MenuItem value={'año'}>Último año</MenuItem>
        <MenuItem value={'mes'}>Últimos 30 días</MenuItem>
        <MenuItem value={'semana'}>Últimos siete días</MenuItem>
        <MenuItem value={'dia'}>Hoy</MenuItem>
      </Select>
      <Typography variant="h1" style={{margin: 10}} color="primary">{data.promedioEvaluacionesFuncionarios.toFixed(1)}</Typography>
    </Grid>
  );
}