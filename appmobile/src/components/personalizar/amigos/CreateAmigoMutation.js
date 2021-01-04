import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors, List, Avatar, Text } from 'react-native-paper';

const CREATE_AMIGO_MUTATION = gql`
  mutation createAmigo($amigo_id: ID!) {
    createAmigo(amigo_id: $amigo_id) {
      id
      estado
    }
  }  
`;

const CreateAmigoMutation = (props) => {

  const { alumno, handleChange, hideDialog } = props;
  const [createAmigo, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    CREATE_AMIGO_MUTATION,
    {
      onCompleted({ response }) {
        hideDialog();
        handleChange('textSearch', null);
        handleChange('nombre', null);
        handleChange('recargarAmigos', true);
      }
    }
  );

  if (mutationLoading) {
    return (
      <List.Item
        key="1"
        style={ styles.item }
        title="Agregando amigo"
        left={() => <Avatar.Image key="1" size={45} theme={{ colors: { primary: '#F6F6F6' } }} />}
      />
    );
  }

  if (mutationError) {
    let error = '';
    if (mutationError.message.toString() === 'GraphQL error: No se pueden agregar más amigos') {
      error = 'Límite de amigos alcanzado';
    } else {
      error = 'Error del servidor';
    }

    return (
      <View>
        <List.Item key={alumno.id} style={ styles.item }
          title={alumno.cuenta.nombres.split(' ')[0] + ' ' + alumno.cuenta.apellidos.split(' ')[0]}
          onPress={() => {
            createAmigo({ variables: { amigo_id: alumno.id } })
          }}
          left={() => <Avatar.Image key={alumno.id} size={45} source={{uri: alumno.cuenta.fotoUrl}} />}
        />
        <Text style={styles.textError}> {error} </Text>
      </View>
    );
  }
  
  return (
    <List.Item key={alumno.id} style={ styles.item }
      title={alumno.cuenta.nombres.split(' ')[0] + ' ' + alumno.cuenta.apellidos.split(' ')[0]}
      onPress={() => {
        createAmigo({ variables: { amigo_id: alumno.id } })
      }}
      left={() => <Avatar.Image key={alumno.id} size={45} source={{uri: alumno.cuenta.fotoUrl}} />}
    />
  );
}

const styles = StyleSheet.create({
  item: {
  },
  textError : {
    marginTop: -25,
    marginLeft: 53,
    fontSize: 12,
    color: 'red',
    borderRadius: 25,
    width: '80%',
    textAlign: 'center'
  },
});

export default CreateAmigoMutation