import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors, Button, Text } from 'react-native-paper';

const RECOVER_PASSWORD_MUTATION = gql`
  mutation recoverPassword($rut: String!) {
    recoverPassword(rut: $rut)
  }
`;

const RecoverPasswordMutation = (props) => {

  const { goTo, user } = props;

  const [recoverPassword, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    RECOVER_PASSWORD_MUTATION,
    {
      onCompleted({ recoverPassword }) {
        if (recoverPassword) {
          goTo('EnviadoScreen');
        }
      },
    },
  );

  if (mutationLoading) return <ActivityIndicator animating={true} color="#57457F" style={ styles.loading } />;

  if (mutationError) {
    let error = '';
    if (mutationError.message.toString() === 'GraphQL error: No se encuentra usuario con este rut') {
      error = 'Rut incorrecto';
    } else {
      error = 'Error del servidor';
    }
    return (
      <View>
        <Button
          style={styles.button}
          onPress={ () => {
            recoverPassword({ variables: { rut: user.rut } })
          }}
        >
          <Text style={ styles.buttonText }>Enviar correo</Text>
        </Button>
        <Text style={styles.textError}> {error} </Text>
      </View>
    );
  }
  
  return (
    <Button
      style={styles.button}
      onPress={ () => {
        recoverPassword({ variables: { rut: user.rut } })
      }}
    >
      <Text style={ styles.buttonText }>Enviar correo</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'niramit-semibold',
  },
  textError : {
    marginVertical: -10,
    paddingHorizontal: 20,
    fontSize: 12,
    color: 'red',
    backgroundColor: '#fff',
    borderRadius: 25,
    width: '100%',
    textAlign: 'center'
  },
  loading: {
    marginHorizontal: 69,
  },
});

export default RecoverPasswordMutation;