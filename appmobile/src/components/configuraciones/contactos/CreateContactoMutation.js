import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors, List, Avatar } from 'react-native-paper';

const CREATE_CONTACTO_MUTATION = gql`
  mutation createContacto($funcionario_id: ID!) {
    createContacto(funcionario_id: $funcionario_id) {
      id
    }
  }  
`;

const CreateContactoMutation = (props) => {

  const { funcionario, handleChange, hideDialog } = props;
  const [createContacto, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    CREATE_CONTACTO_MUTATION,
    {
      onCompleted({ response }) {
        hideDialog();
        handleChange('recargarContactos', true);
      }
    }
  );

  if (mutationLoading) {
    return (
      <List.Item
        key="1"
        style={ styles.item }
        title="Agregando contacto"
        left={() => <Avatar.Image key="1" size={45} theme={{ colors: { primary: '#F6F6F6' } }} />}
      />
    );
  }

  return (
    <List.Item key={funcionario.id}
      title={funcionario.cuenta.nombres.split(' ')[0] + ' ' + funcionario.cuenta.apellidos.split(' ')[0]}
      onPress={() => {
        createContacto({ variables: { funcionario_id: funcionario.id } })
      }}
      left={() => <Avatar.Image key={funcionario.id} size={45} source={{uri: funcionario.cuenta.fotoUrl}} />}
    />
  );
}

const styles = StyleSheet.create({
  item: {
  }
});

export default CreateContactoMutation