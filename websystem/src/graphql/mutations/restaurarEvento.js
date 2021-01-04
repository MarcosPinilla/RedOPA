import React from 'react';
import gql from 'graphql-tag';
import RestoreIcon from '@material-ui/icons/RestoreFromTrash';
import { Grid, CircularProgress } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';

const RESTAURAR_PUBLICACION = gql`
  mutation restaurarPublicacion($publicacion_id: ID!) {
    restaurarPublicacion(publicacion_id: $publicacion_id)
  }
`;

const RestaurarEvento = (props) => {
  const { id, recargar } = props;
  const [restaurarPublicacion, {data, loading, error}] = useMutation(
    RESTAURAR_PUBLICACION,
    {
      onCompleted({ restaurarPublicacion }) {
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
      <RestoreIcon style={{cursor: 'pointer'}} onClick={() => { restaurarPublicacion({ variables: { publicacion_id: id } }) }} />
    </Grid>
  )
}

export default RestaurarEvento;