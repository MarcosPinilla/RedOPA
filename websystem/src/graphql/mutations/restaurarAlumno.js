import React from 'react';
import gql from 'graphql-tag';
import RestoreIcon from '@material-ui/icons/RestoreFromTrash';
import { Grid, CircularProgress } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';

const RESTAURAR_ALUMNO = gql`
  mutation restaurarAlumno($alumno_id: ID!) {
    restaurarAlumno(alumno_id: $alumno_id)
  }
`;

const RestaurarAlumno = (props) => {
  const { id, recargar } = props;
  const [restaurarAlumno, {data, loading, error}] = useMutation(
    RESTAURAR_ALUMNO,
    {
      onCompleted({ restaurarAlumno }) {
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
      <RestoreIcon style={{cursor: 'pointer'}} onClick={() => { restaurarAlumno({ variables: { alumno_id: id } }) }} />
    </Grid>
  )
}

export default RestaurarAlumno;