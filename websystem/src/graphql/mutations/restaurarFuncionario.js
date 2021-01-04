import React from 'react';
import gql from 'graphql-tag';
import RestoreIcon from '@material-ui/icons/RestoreFromTrash';
import { Grid, CircularProgress } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';

const RESTAURAR_FUNCIONARIO = gql`
  mutation restaurarFuncionario($funcionario_id: ID!) {
    restaurarFuncionario(funcionario_id: $funcionario_id)
  }
`;

const RestaurarFuncionario = (props) => {
  const { id, recargar } = props;
  const [restaurarFuncionario, {data, loading, error}] = useMutation(
    RESTAURAR_FUNCIONARIO,
    {
      onCompleted({ restaurarFuncionario }) {
        recargar();
      }
    }
  )
  
  if (error) {
    console.log(error);
  }

  if (loading) {
    return(<CircularProgress size={23} thickness={4} />)
  }

  return(
    <Grid>
      <RestoreIcon style={{cursor: 'pointer'}} onClick={() => { restaurarFuncionario({ variables: { funcionario_id: id } }) }} />
    </Grid>
  )
}

export default RestaurarFuncionario;