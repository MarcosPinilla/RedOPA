import React, { Component } from 'react';
import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import Button from '@material-ui/core/Button';

const LOGIN_MUTATION = gql`
  mutation LoginAdmin($access: String!, $password: String!){
    loginAdmin(access: $access, password: $password){
      hash,
      usuario{
        id
        fotoUrl,
        nombres,
        apellidos,
        institucion{
          nombre
        },
        permiso{
          id,
          nombre
        },
        funcionario {
          id
        }
      }
    }
  }
`;

const LoginMutation = (props) => {

  const { user, goTo } = props
  const [loginAdmin, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    LOGIN_MUTATION,
    {
      onCompleted({ loginAdmin }) {
        localStorage.setItem('token', loginAdmin.hash);
        localStorage.setItem('id', loginAdmin.usuario.id);
        localStorage.setItem('funcionarioid', loginAdmin.usuario.funcionario.id);
        localStorage.setItem('nombres', loginAdmin.usuario.nombres);
        localStorage.setItem('apellidos', loginAdmin.usuario.apellidos);
        localStorage.setItem('fotoUrl', loginAdmin.usuario.fotoUrl);
        localStorage.setItem('institucion', loginAdmin.usuario.institucion.nombre);
        localStorage.setItem('permiso', loginAdmin.usuario.permiso.nombre);
        localStorage.setItem('permisoid', loginAdmin.usuario.permiso.id);
        window.location.href = "/dashboard/home"
      },
      onError(){
        return(
          <div>
            <h6>Datos Incorrectos</h6>
            <Button variant="contained" color="primary" size="large" onClick={() => loginAdmin({ variables: { access: user.access, password: user.password } })}>
              Login
            </Button>
          </div>
          
        );
      }
    }
  );

  if(mutationError){
    return(
      <div>
        <h6>Datos Incorrectos</h6>
        <Button variant="contained" color="primary" size="large" onClick={() => loginAdmin({ variables: { access: user.access, password: user.password } })}>
          Login
        </Button>
      </div>
    );
  }
  
  return (
    <Button variant="contained" color="primary" size="large" onClick={() => loginAdmin({ variables: { access: user.access, password: user.password } })}>
      Login
    </Button>
  );
}

export default LoginMutation