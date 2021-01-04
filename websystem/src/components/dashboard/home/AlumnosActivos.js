import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button, Grid, Select, MenuItem, Typography } from '@material-ui/core/';
import { Bar, Doughnut, Line, HorizontalBar, Radar, Pie } from 'react-chartjs-2';
import { useQuery } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import { ALUMNOS_ACTIVOS } from '../../../graphql/queries/alumnosactivos';


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

  const { loading, error, data, refetch } = useQuery(ALUMNOS_ACTIVOS, {
    variables: {
      institucion_id
    },
    onCompleted(){
      var cuantity = 0; 
      for(let i=0;i<data.alumnosActivosQuery.length;i++){
        labels.push(data.alumnosActivosQuery[i].nombre.charAt(0).toUpperCase() + data.alumnosActivosQuery[i].nombre.slice(1))
        dataset.push(data.alumnosActivosQuery[i].cantidad)
        cuantity = cuantity + data.alumnosActivosQuery[i].cantidad
        setCantidad(cuantity)
      }
      setDatas( {
        labels: labels,
        datasets: [{
          label: 'Porcentaje de estudiantes activos',
          data: dataset,
          backgroundColor: [
          '#01B496',
          ],
          hoverBackgroundColor: [
          '#01B496',
          ]
        }]
      })
    }
  });

  if(datas == null)refetch()
  
  return (
    <Grid alignItems="center">
      <p>Porcentaje de alumnos que han usado la aplicación</p>
      <Bar data={datas} legend={legendOpts}/>
    </Grid>        
  );
}