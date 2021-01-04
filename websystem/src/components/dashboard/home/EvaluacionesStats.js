import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@material-ui/core/';
import { Bar, Doughnut, Line, HorizontalBar, Radar, Pie } from 'react-chartjs-2';
import { useQuery } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import { EVALUACIONES_STATS } from '../../../graphql/queries/evaluacionesStats'


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

  const { loading, error, data, refetch } = useQuery(EVALUACIONES_STATS,
    {
      variables: {
        institucion_id
      },
      onCompleted(){
        var cuantity = 0;
        for(let i=0;i<data.evaluacionesMensualesQuery.length;i++){
          labels.push(data.evaluacionesMensualesQuery[i].nombre)
          dataset.push(data.evaluacionesMensualesQuery[i].cantidad)
          cuantity = cuantity + data.evaluacionesMensualesQuery[i].cantidad
          setCantidad(cuantity)
        }
        setDatas( {
          labels: labels,
          datasets: [{
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
      <p>Cantidad Total: {cantidadEvaluaciones}</p>
      <Pie data={datas} legend={legendOpts}/>
    </Grid>
    
        
  );
}

