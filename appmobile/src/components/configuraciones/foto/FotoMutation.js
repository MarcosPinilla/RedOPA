import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { Button, Text, ActivityIndicator } from 'react-native-paper';

const FOTO_MUTATION = gql`
  mutation Perfil($alias: String!, $foto: String!) {
    updateAliasFoto(alias: $alias, foto: $foto) {
      fotoUrl
      alumno {
        alias
      }
    }
  }  
`;

const FotoMutation = (props) => {

  const { user, setFotoStorage } = props
  const [updatePerfilFoto, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    FOTO_MUTATION,
    {
      onCompleted({ updateAliasFoto }) {
        setFotoStorage(updateAliasFoto.fotoUrl);
      }
    }
  );

  if (mutationLoading) return <ActivityIndicator animating={true} color="#57457F" style={ styles.loading } />;

  return (
    <View>
      { (mutationError) &&
        <Text style={styles.textError}> Datos Incorrectos </Text>
      }
      <Button
        style={styles.button}
        onPress={() => {
          updatePerfilFoto({ variables: { alias: user.alias, foto: user.foto } })
        }}
      >
        <Text style={ styles.buttonText }>Confirmar</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    padding: 10, 
    width: '100%',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'niramit-semibold',
  },
  loading: {
    marginHorizontal: 53,
  },
  textError : {
    fontSize: 13,
    color: 'red',
    backgroundColor: '#fff',
    borderRadius: 25,
    textAlign: 'center'
  }
});

export default FotoMutation