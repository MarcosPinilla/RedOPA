import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors, List, Avatar, Text } from 'react-native-paper';

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
        handleChange('textSearch', null);
        handleChange('nombre', null);
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

  if (mutationError) {
    let error = '';
    if (mutationError.message.toString() === 'GraphQL error: No se pueden agregar más contactos') {
      error = 'Límite de contactos alcanzado';
    } else {
      error = 'Error del servidor';
    }

    return (
      <View>
        <List.Item key={funcionario.id}
          title={funcionario.cuenta.nombres.split(' ')[0] + ' ' + funcionario.cuenta.apellidos.split(' ')[0]}
          onPress={() => {
            createContacto({ variables: { funcionario_id: funcionario.id } })
          }}
          left={() => <Avatar.Image key={funcionario.id} size={45} source={{uri: funcionario.cuenta.fotoUrl}} />}
        />
        <Text style={styles.textError}> {error} </Text>
      </View>
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

export default CreateContactoMutation