import React from 'react';
import gql from 'graphql-tag';
import RestoreIcon from '@material-ui/icons/RestoreFromTrash';
import { Grid, CircularProgress } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';

const RESTAURAR_APODERADO = gql`
  mutation restaurarApoderado($apoderado_id: ID!) {
    restaurarApoderado(apoderado_id: $apoderado_id)
  }
`;

const RestaurarApoderado = (props) => {
  const { id, recargar } = props;
  const [restaurarApoderado, {data, loading, error}] = useMutation(
    RESTAURAR_APODERADO,
    {
      onCompleted({ restaurarApoderado }) {
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
      <RestoreIcon style={{cursor: 'pointer'}} onClick={() => { restaurarApoderado({ variables: { apoderado_id: id } }) }} />
    </Grid>
  )
}

export default RestaurarApoderado;