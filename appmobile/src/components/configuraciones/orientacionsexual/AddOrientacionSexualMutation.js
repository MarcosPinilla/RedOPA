import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Button, Text, ActivityIndicator } from 'react-native-paper';

const ADD_ORIENTACION_SEXUAL_MUTATION = gql`
  mutation updateOrientacionSexualAlumno($orientacionSexualId: ID!) {
    updateOrientacionSexualAlumno(orientacionSexualId: $orientacionSexualId)
  }
`;

const AddOrientacionSexualMutation = (props) => {
  
  const { orientacionSexual, goTo } = props;
  const [addOrientacionSexual, { data, loading, error }] = useMutation(
    ADD_ORIENTACION_SEXUAL_MUTATION,
    {
      onCompleted(response) {
        if (response?.updateOrientacionSexualAlumno) {
          AsyncStorage.setItem('orientacionId', orientacionSexual.id);
        }
        goTo('PersonalizarFoto');
      }
    }
  );

  if (loading) return <ActivityIndicator animating={ true } color="#57457F" size="large"/>;

  return (
    <Button
      onPress={(orientacionSexual) ? () => addOrientacionSexual({ variables: { orientacionSexualId: orientacionSexual.id }}) : () => {} }
      mode='contained'
      style={ styles.confirmarButton }
    >
      <Text style={ styles.confirmarText }>Confirmar</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  confirmarButton: {
    borderRadius: 25,
    backgroundColor: '#B3FFFD',
    height: 50,
    marginHorizontal: 15,
  },
  confirmarText: {
    fontFamily: 'nunito-bold',
    fontSize: 22,
    paddingBottom: 3,
  },
});

export default AddOrientacionSexualMutation;