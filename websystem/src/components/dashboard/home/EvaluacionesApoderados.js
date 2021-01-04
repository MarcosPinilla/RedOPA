import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button, Grid, Select, MenuItem, Typography } from '@material-ui/core/';
import { Bar, Doughnut, Line, HorizontalBar, Radar, Pie } from 'react-chartjs-2';
import { useQuery } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import { EVALUACIONES_APODERADOS } from '../../../graphql/queries/estadisticasevaluacionesapoderados';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
}));


export default function EvaluacionesStats(props) {
  const classes = useStyles();
  var labels = [];
  var dataset= [];
  
  const { institucion_id } = props;

  const [cantidadEvaluaciones, setCantidad] = React.useState(0); 
  const [datas, setDatas] = React.useState({});

  const [periodo, setPeriodo] = React.useState('mes');
  const institucion = localStorage.getItem("institucion");

  const legendOpts = { 
    onClick: (e, item) => {
      if(item.text=="Funcionario"){
        window.location.href = '/dashboard/funcionarios/'
      }else if(item.text=="Alumno"){
        window.location.href = '/dashboard/estudiantes/'
      }else{
        window.location.href = '/dashboard/estudiantes/'
      }
    }
  };

  const { loading, error, data, refetch } = useQuery(EVALUACIONES_APODERADOS, {
    variables: {periodo: periodo, institucion_id},
    onCompleted(){
      var cuantity = 0; 
      for(let i=0;i<data.estadisticasEvaluacionesApoderados.length;i++){
        labels.push(data.estadisticasEvaluacionesApoderados[i].nombre.charAt(0).toUpperCase() + data.estadisticasEvaluacionesApoderados[i].nombre.slice(1))
        dataset.push(data.estadisticasEvaluacionesApoderados[i].cantidad)
        cuantity = cuantity + data.estadisticasEvaluacionesApoderados[i].cantidad
        setCantidad(cuantity)
      }
      setDatas( {
        labels: labels,
        datasets: [{
          label: 'Porcentaje de apoderados activos con evaluaciones',
          data: dataset,
          backgroundColor: [
          '#57457F',
          '#01B496',
          '#FFB700'
          ],
          hoverBackgroundColor: [
          '#57457F',
          '#01B496',
          '#FFB700'
          ]
        }]
      })
    }
  });

  if(datas == null)refetch()
  
  return (
    <Grid alignItems="center">
      <p>Porcentaje de apoderados con evaluaciones a sus pupilos por curso</p>
      <Select
        value={periodo}
        labelId="demo-simple-select-label"
        onChange={e => setPeriodo(e.target.value)}
        style={{marginTop: 25}}
        alignSelf='flex-end'
      >
        <MenuItem value={'año'}>Último año</MenuItem>
        <MenuItem value={'mes'}>Últimos 30 días</MenuItem>
        <MenuItem value={'semana'}>Últimos siete días</MenuItem>
        <MenuItem value={'dia'}>Hoy</MenuItem>
      </Select>
      <Bar data={datas} legend={legendOpts}/>
    </Grid>        
  );
}