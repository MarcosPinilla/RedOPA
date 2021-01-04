import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/login/Login.js';
import Recuperar from '../components/login/Recuperar.js';
import Dashboard from '../components/dashboard/Dashboard.js';
import Instituciones from '../components/dashboard/instituciones/Instituciones.js';
import FuncionariosComponent from '../components/dashboard/funcionarios/FuncionariosComponent.js';
import EstudiantesComponent from '../components/dashboard/estudiantes/EstudiantesComponent.js';
import ApoderadosComponent from '../components/dashboard/apoderados/ApoderadosComponent.js';
import Home from '../components/dashboard/home/Home.js';
import AlumnoComponent from '../components/dashboard/alumno/AlumnoComponent.js'
import EventosComponent from '../components/dashboard/eventos/EventosComponent.js';
import ApoderadoComponent from '../components/dashboard/apoderado/ApoderadoComponent.js';
import FuncionarioComponent from '../components/dashboard/funcionario/FuncionarioComponent.js';
import PerfilComponent from '../components/dashboard/perfil/PerfilComponent.js';
import ConfiguracionComponent from '../components/dashboard/configuracion/ConfiguracionComponent.js'

import { connect } from 'react-redux';

const permiso = localStorage.getItem('permisoid')
const token = localStorage.getItem('token')


class Routes extends Component{
  render() {
    if (token != null){
      if(permiso == 2){
        return(
          <Router>
            <Route path="/login" component={Login} />
            <Route path="/recuperar" component={Recuperar} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/dashboard/home' component={Home} />
            <Route path='/dashboard/funcionarios' component={FuncionariosComponent} />
            <Route path='/dashboard/estudiantes' component={EstudiantesComponent} />
            <Route path='/dashboard/apoderados' component={ApoderadosComponent} />
            <Route path='/dashboard/alumno/:id' component={AlumnoComponent} />
            <Route path='/dashboard/eventos' component={EventosComponent} />
            <Route path='/dashboard/apoderado/:id' component={ApoderadoComponent} />
            <Route path='/dashboard/funcionario/:id' component={FuncionarioComponent} />
            <Route path='/dashboard/perfil' component={PerfilComponent} />
            <Route path='/dashboard/configuracion' component={ConfiguracionComponent} />
          </Router>
        );
      }else{
        return(
          <Router>
            <Route path="/login" component={Login} />
            <Route path="/recuperar" component={Recuperar} />
            <Route path='/dashboard' component={Dashboard} />
            <Route 
              path='/dashboard/home'
              render={(props) => (
                <Home {...props} institutionId={this.props.institutionId}/>
              )} 
            />
            <Route path='/dashboard/instituciones' component={Instituciones} />
            <Route path='/dashboard/funcionarios/' component={FuncionariosComponent} />
            <Route path='/dashboard/estudiantes' component={EstudiantesComponent} />
            <Route 
              path='/dashboard/apoderados'  
              render={(props) => (
                <ApoderadosComponent {...props} institutionId={this.props.institutionId}/>
              )}
            />
            <Route path='/dashboard/eventos' component={EventosComponent} />
            <Route path='/dashboard/alumno/:id' component={AlumnoComponent} />
            <Route path='/dashboard/apoderado/:id' component={ApoderadoComponent} />
            <Route path='/dashboard/funcionario/:id' component={FuncionarioComponent} />
            <Route path='/dashboard/perfil' component={PerfilComponent} />
            <Route 
              path='/dashboard/configuracion' 
              render={(props) => (
                <ConfiguracionComponent {...props} institutionId={this.props.institutionId}/>
              )}
            /> 
          </Router>
        );
      }
    }else{
      return(
        <Router>
          <Route path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/recuperar" component={Recuperar} />
        </Router>
      );
    }
  }
}

const mapStateToProps = state => {
  return { institutionId: state.institutionId };
}

export default connect(mapStateToProps, null)(Routes);