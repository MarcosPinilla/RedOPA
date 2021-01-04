import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors, List, Avatar, IconButton } from 'react-native-paper';

const DELETE_INTERES_ALUMNO_MUTATION = gql`
  mutation deleteInteresAlumno($interes_id: ID!) {
    deleteInteresAlumno(interes_id: $interes_id)
  }  
`;

function DeleteInteresAlumnoMutation (props) {

  const { id, handleChange } = props;
  const [deleteInteresAlumno, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    DELETE_INTERES_ALUMNO_MUTATION,
    {
      onCompleted({ response }) {
        handleChange('recargarInteresesAlumno', true);
      }
    }
  );

  if (mutationLoading) return <ActivityIndicator animating={true} color="#57457F" />;
  
  return (
    <IconButton 
      key={id}
      onPress={() => {
        deleteInteresAlumno({ variables: { interes_id: id } })
      }}
      icon="delete"
      color="#57457F"
    />
  );
}

export default DeleteInteresAlumnoMutation;