import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors, Button, Text } from 'react-native-paper';

const UPDATE_CORREO_MUTATION = gql`
  mutation updateEmail($correo: String!, $numero: String) {
    updateEmail(correo: $correo, numero: $numero)
  }
`;

const CorreoMutation = (props) => {

  const { goTo, user } = props;

  const [updateEmail, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    UPDATE_CORREO_MUTATION,
    {
      onCompleted({ response }) {
        goTo('PersonalizarPuebloIndigena');
      },
    },
  );

  if (mutationLoading) return <ActivityIndicator animating={true} color="#57457F" size="large" style={ styles.cargando } />;
  
  if (mutationError) {
    let error = '';
    if (mutationError.message.toString() === 'GraphQL error: El correo ya está en uso, seleccione otro') {
      error = 'Correo ya en uso';
    } else {
      error = 'Error del servidor'
    }
    return (
      <View>
        <Button
          style={ styles.confirmarButton }
          mode="contained"
          onPress={ () => updateEmail({ variables: { correo: user.correo, numero: user.numero } }) }
        >
          <Text style={ styles.confirmarText }>Confirmar</Text>
        </Button>
        <Text style={styles.textError}> {error} </Text>
        </View>
    );
  }

  return (
    <Button
      style={ styles.confirmarButton }
      mode="contained"
      onPress={ () => updateEmail({ variables: { correo: user.correo, numero: user.numero } }) }
    >
      <Text style={ styles.confirmarText }>Confirmar</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  confirmarButton: {
    borderRadius: 25,
    backgroundColor: '#B3FFFD',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  confirmarText: {
    fontFamily: 'nunito-bold',
    fontSize: 22,
    paddingBottom: 3,
  },
  textError : {
    marginVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: 'red',
    backgroundColor: '#fff',
    borderRadius: 25,
    width: '100%',
    textAlign: 'center',
    marginTop: 2,
  },
  cargando: {
    marginTop: 40,
  }
});

export default CorreoMutation;