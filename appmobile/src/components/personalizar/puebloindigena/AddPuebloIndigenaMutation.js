import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { Button, Text, ActivityIndicator } from 'react-native-paper';

const ADD_PUEBLO_INDIGENA_MUTATION = gql`
  mutation updatePuebloIndigenaAlumno($puebloIndigenaId: ID!) {
    updatePuebloIndigenaAlumno(puebloIndigenaId: $puebloIndigenaId)
  }
`;

const AddPuebloIndigenaMutation = (props) => {
  
  const { puebloIndigena, goTo } = props;
  const [addPuebloIndigena, { data, loading, error: mutationError }] = useMutation(
    ADD_PUEBLO_INDIGENA_MUTATION,
    {
      onCompleted({ response }) {
        goTo('PersonalizarIdentidadGenero');
      }
    }
  );

  if (loading) return <ActivityIndicator animating={ true } color="#57457F" size="large"/>;

  return (
    <View>
      <Button
        onPress={(puebloIndigena) 
          ? () => addPuebloIndigena({ variables: { puebloIndigenaId: puebloIndigena?.id } })
          : () => {}}
        mode='contained'
        style={ styles.confirmarButton }
      >
        <Text style={ styles.confirmarText }>Confirmar</Text>
      </Button>
      { (mutationError) &&
        <Text style={styles.textError}>Error del servidor</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  confirmarButton: {
    borderRadius: 25,
    backgroundColor: '#B3FFFD',
    height: 50,
    marginHorizontal: 15,
  },
  textError : {
    marginVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: 'red',
    backgroundColor: '#fff',
    borderRadius: 25,
    width: '100%',
    textAlign: 'center'
  },
  confirmarText: {
    fontFamily: 'nunito-bold',
    fontSize: 22,
    paddingBottom: 3,
  },
});

export default AddPuebloIndigenaMutation;