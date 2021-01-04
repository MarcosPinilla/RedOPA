import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors, Button, Text } from 'react-native-paper';

const UPDATE_CORREO_MUTATION = gql`
  mutation updateEmail($correo: String!) {
    updateEmail(correo: $correo)
  }
`;

const CorreoMutation = (props) => {

  const { goTo, user } = props;

  const [updateEmail, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    UPDATE_CORREO_MUTATION,
    {
      onCompleted({ response }) {
        goTo('PersonalizarMinoria');
      },
    },
  );

  if (mutationLoading) return <ActivityIndicator animating={true} color="#57457F" size="large" style={ styles.cargando } />;
  
  return (
    <Button
      style={ styles.confirmarButton }
      mode="contained"
      onPress={ () => updateEmail({ variables: { correo: user.correo } }) }
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
    marginTop: 40,
  },
  confirmarText: {
    fontFamily: 'nunito-bold',
    fontSize: 22,
    paddingBottom: 3,
  },
  cargando: {
    marginTop: 40,
  }
});

export default CorreoMutation;