import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@material-ui/core/';
import { Bar, Doughnut, Line, HorizontalBar, Radar, Pie } from 'react-chartjs-2';
import { useQuery } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import { USUARIOS_ACTIVOS } from '../../../graphql/queries/usuariosactivos';


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


export default function UsuariosActivos(props) {
  const classes = useStyles();
  var labels = [];
  var dataset= [];
  const [datas, setDatas] = React.useState({});

  const { institucion_id } = props;

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

  const { loading, error, data, refetch } = useQuery(USUARIOS_ACTIVOS, 
    {
      variables: {
        institucion_id
      },
      onCompleted(){
        var cuantity = 0;
        labels.push('Usuarios activos');
        dataset.push(data.usuariosActivosQuery.toFixed(1));
        labels.push('Usuarios inactivos');
        dataset.push(100 - data.usuariosActivosQuery.toFixed(1));
        
        setDatas( {
          labels: labels,
          datasets: [{
            data: dataset,
            backgroundColor: [
            '#27abda',
            '#9d96ad',
            ],
            hoverBackgroundColor: [
            '#27abda',
            '#9d96ad',
            ]
          }]
        })
      }
  });

  if(datas == null)refetch()
  
  return (
    <Grid alignItems="center">
      <p>Porcentaje de usuarios que han usado la aplicación</p>
      <Pie data={datas} legend={legendOpts}/>
    </Grid>
  );
}

