import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { Button, Text, ActivityIndicator } from 'react-native-paper';

const ADD_MINORIA_MUTATION = gql`
  mutation updateMinoriaAlumno($minoriaId: ID!) {
    updateMinoriaAlumno(minoriaId: $minoriaId)
  }
`;

const AddMinoriaMutation = (props) => {

  const { minoria, goTo } = props;
  const [addMinoria, { data, loading, error }] = useMutation(
    ADD_MINORIA_MUTATION,
    {
      onCompleted({ response }) {
        goTo('PersonalizarFoto');
      }
    }
  );

  if (loading) return <ActivityIndicator animating={true} color="#57457F" size="large"/>;

  return (
    <Button
      onPress={() => addMinoria({ variables: { minoriaId: minoria.id } })}
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

export default AddMinoriaMutation;