import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { Button, Text, ActivityIndicator } from 'react-native-paper';

const ADD_IDENTIDAD_GENERO_MUTATION = gql`
  mutation updateIdentidadGeneroAlumno($identidadGeneroId: ID!) {
    updateIdentidadGeneroAlumno(identidadGeneroId: $identidadGeneroId)
  }
`;

const AddIdentidadGeneroMutation = (props) => {
  
  const { identidadGenero, goTo } = props;
  const [addIdentidadGenero, { data, loading, error: mutationError }] = useMutation(
    ADD_IDENTIDAD_GENERO_MUTATION,
    {
      onCompleted({ response }) {
        goTo('PersonalizarOrientacionSexual');
      }
    }
  );

  if (loading) return <ActivityIndicator animating={ true } color="#57457F" size="large"/>;

  if (mutationError) {
    let error = 'Error del servidor';
    return(
      <View>
        <Button
          onPress={ () => addIdentidadGenero({ variables: { identidadGeneroId: identidadGenero.id } })}
          mode='contained'
          style={ styles.confirmarButton }
        >
          <Text style={ styles.confirmarText }>Confirmar</Text>
        </Button>
        <Text style={styles.textError}> {error} </Text>
      </View>
    );
  }

  return (
    <Button
      onPress={(identidadGenero) 
        ? () => addIdentidadGenero({ variables: { identidadGeneroId: identidadGenero.id } })
        : () => {}
      }
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

export default AddIdentidadGeneroMutation;