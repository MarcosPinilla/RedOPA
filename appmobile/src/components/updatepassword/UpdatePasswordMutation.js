import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors, Button, Text } from 'react-native-paper';

const UPDATE_PASSWORD_MUTATION = gql`
  mutation updatePassword($password_defecto: String!, $password_nuevo: String!, $password_repetido: String!) {
    updatePassword(password_defecto: $password_defecto, password_nuevo: $password_nuevo, password_repetido: $password_repetido)
  }
`;

const UpdatePasswordMutation = (props) => {

  const { goTo, user } = props;

  const [updatePassword, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    UPDATE_PASSWORD_MUTATION,
    {
      onCompleted({ updatePassword }) {
        if (updatePassword) {
          goTo('ConfirmacionScreen');
        }
      },
    },
  );

  if (mutationLoading) return <ActivityIndicator animating={true} color="#57457F" style={ styles.loading } />;
  
  if (mutationError) {
    let error = '';
    if (mutationError.message.toString() === 'GraphQL error: Contraseña asignada inválida') {
      error = 'Contraseña actual\nerrónea';
    } else if (mutationError.message.toString() === 'GraphQL error: Debe ingresar un nuevo password') {
      error = 'Ingrese nueva\ncontraseña';
    } else if (mutationError.message.toString() === 'GraphQL error: Contraseña nueva incorrectamente confirmada') {
      error = 'Contraseña nueva\nmal confirmada';
    } else {
      error = 'Error del servidor'
    }
    return(
      <View>
        <Button
          style={styles.button}
          onPress={ () => {
            updatePassword({ variables: { password_defecto: user.password_defecto, password_nuevo: user.password_nuevo, password_repetido: user.password_repetido } })
          }}
        >
          <Text style={ styles.buttonText }>Confirmar</Text>
        </Button>
        <Text style={styles.textError}> {error} </Text>
      </View>
    );
  }

  return (
    <Button
      style={styles.button}
      onPress={ () => {
        updatePassword({ variables: { password_defecto: user.password_defecto, password_nuevo: user.password_nuevo, password_repetido: user.password_repetido } })
      }}
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
    marginHorizontal: 55,
  },
});

export default UpdatePasswordMutation;