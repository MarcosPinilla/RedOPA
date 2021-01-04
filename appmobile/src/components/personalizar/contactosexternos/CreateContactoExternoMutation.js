import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet} from 'react-native';
import { ActivityIndicator, Colors, Button, Text  } from 'react-native-paper';

const CREATE_CONTACTO_EXTERNO_MUTATION = gql`
  mutation createContactoExterno($nombre: String!, $correo: String!, $telefono: String!) {
    createContactoExterno(nombre: $nombre, correo: $correo, telefono: $telefono) {
      id
    }
  }  
`;

const CreateContactoExternoMutation = (props) => {

  const { handleChange, hideDialog, contactoExterno } = props;
  const [createContactoExterno, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    CREATE_CONTACTO_EXTERNO_MUTATION,
    {
      onCompleted({ response }) {
        hideDialog();
        handleChange('recargarContactosExternos', true);
      }
    }
  );

  if (mutationLoading) return <ActivityIndicator animating={true} color="#57457F" style={ styles.loading } />;
  
  if (mutationError) {
    let error = '';
    if (mutationError.message.toString() === 'GraphQL error: No se pueden agregar más contactos externos') {
      error = 'Límite alcanzado';
    } else {
      error = 'Error del servidor';
    }

    return (
      <View>
        <Button mode="contained" style={ styles.agregarButton } onPress={ () => {
          createContactoExterno({ variables: { nombre: contactoExterno.nombre, correo: contactoExterno.correo, telefono: contactoExterno.telefono } })
        } }>
          <Text style={ styles.agregarText }>Agregar</Text>
        </Button>
        <Text style={styles.textError}> {error} </Text>
      </View>
    );
  }

  return (
    <Button mode="contained" style={ styles.agregarButton } onPress={ () => {
      createContactoExterno({ variables: { nombre: contactoExterno.nombre, correo: contactoExterno.correo, telefono: contactoExterno.telefono } })
    } }>
      <Text style={ styles.agregarText }>Agregar</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  agregarButton: {
    borderRadius: 25,
    backgroundColor: '#B3FFFD',
    paddingHorizontal: 20,
    alignContent: 'center'
  },
  agregarText: {
    fontFamily: 'niramit-semibold',
    fontSize: 16,
    textAlignVertical: 'center',
  },
  loading: {
    marginHorizontal: 57,
  },
  textError : {
    marginTop: 5,
    paddingHorizontal: 20,
    fontSize: 12,
    color: 'red',
    backgroundColor: '#fff',
    borderRadius: 25,
    width: '100%',
    textAlign: 'center'
  },
});

export default CreateContactoExternoMutation