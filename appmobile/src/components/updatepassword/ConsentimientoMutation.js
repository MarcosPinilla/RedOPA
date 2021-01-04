import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors, Button, Text } from 'react-native-paper';

const UPDATE_CONSENTIMIENTO_MUTATION = gql`
  mutation updateConsentimiento {
    updateConsentimiento
  }
`;

const ConsentimientoMutation = (props) => {

  const { goTo, user } = props;

  const [updateConsentimiento, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    UPDATE_CONSENTIMIENTO_MUTATION,
    {
      onCompleted({ response }) {
        goTo('UpdatePasswordScreen');
      },
    },
  );

  if (mutationLoading) return <ActivityIndicator animating={true} color="#57457F" style={ styles.loading } />;
  
  if (mutationError) {
    let error = '';
    if (mutationError.message.toString() === 'GraphQL error: El acuerdo de privacidad ya fue aceptado') {
      goTo('UpdatePasswordScreen');
    } else {
      error = 'Error del servidor'
    }
    return (
      <View>
        <Button
          style={ styles.button }
          onPress={ () => updateConsentimiento() }
        >
          <Text style={ styles.buttonText }>Confirmar</Text>
        </Button>
        <Text style={styles.textError}> {error} </Text>
        </View>
    );
  }

  return (
    <Button
      style={ styles.button }
      onPress={ () => updateConsentimiento() }
    >
      <Text style={ styles.buttonText }>Confirmar</Text>
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
  loading: {
    marginHorizontal: 53,
  },
});

export default ConsentimientoMutation;