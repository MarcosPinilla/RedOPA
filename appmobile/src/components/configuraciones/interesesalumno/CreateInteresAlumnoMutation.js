import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors, List, Avatar } from 'react-native-paper';

const CREATE_INTERES_ALUMNO_MUTATION = gql`
  mutation createInteresAlumno($interes_id: ID!) {
    createInteresAlumno(interes_id: $interes_id) {
      id
    }
  }  
`;

const CreateInteresAlumnoMutation = (props) => {

  const { interes, handleChange, hideDialog } = props;
  const [createInteresAlumno, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    CREATE_INTERES_ALUMNO_MUTATION,
    {
      onCompleted({ response }) {
        hideDialog();
        handleChange('recargarInteresesAlumno', true);
      }
    }
  );

  if (mutationLoading) {
    return (
      <List.Item
        key="1"
        style={ styles.item }
        title="Agregando interés"
        left={() => <Avatar.Image key="1" size={45} theme={{ colors: { primary: '#F6F6F6' } }} />}
      />
    );
  }
  
  return (
    <List.Item key={interes.id}
      title={interes.nombre}
      description={interes.categoria.nombre}
      onPress={() => {
        createInteresAlumno({ variables: { interes_id: interes.id } })
      }}
      left={() => <Avatar.Text size={45} color="#B3FFFD" label={interes.nombre.slice(0, 1)} />}
    />
  );
}

const styles = StyleSheet.create({
  item: {
  }
});

export default CreateInteresAlumnoMutation