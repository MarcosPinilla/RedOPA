import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { Button, Text, ActivityIndicator } from 'react-native-paper';
import { LOGED } from '../../../opagql/queries/loged_query';

const FOTO_MUTATION = gql`
  mutation Perfil($alias: String!, $foto: String) {
    updateAliasFoto(alias: $alias, foto: $foto) {
      fotoUrl
      alumno {
        alias
      }
    }
  }  
`;

const FotoMutation = (props) => {

  const { user, setFotoStorage, alias } = props;

  const [updatePerfilFoto, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    FOTO_MUTATION,
    {
      onCompleted({ updateAliasFoto }) {
        setFotoStorage(updateAliasFoto.fotoUrl);
      },
      refetchQueries: [
        { query: LOGED }
      ]
    },
  );

  if (mutationLoading) return <ActivityIndicator animating={true} color="#57457F" style={ styles.loading } />;
  
  return (
    <View>
      { (mutationError) &&
        <Text style={styles.textError}> Datos Incorrectos </Text>
      }

      <Button
        style={styles.button}
        onPress={() => {updatePerfilFoto({ variables: { alias: alias, foto: user.foto } })}}
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
  textExito : {
    fontSize: 12,
    color: 'blue',
    backgroundColor: '#fff',
    borderRadius: 25,
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center'
  },
  textError : {
    fontSize: 12,
    color: 'red',
    backgroundColor: '#fff',
    borderRadius: 25,
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center'
  },
});

export default FotoMutation