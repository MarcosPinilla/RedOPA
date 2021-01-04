import React, {useState} from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { GET_ALIAS } from '../../../opagql/queries/alias_query';

export default function AliasFoto(props) {
  const { alias, setAlias } = props;
  
  const { data, loading, error, refetch } = useQuery(GET_ALIAS, {
    onCompleted(ld) {
      if (alias == null) {
        setAlias(ld?.logueado?.alumno?.alias ?? '');
      }
    }
  });
  
  if (loading) {
    return (
      <TextInput
        label='Cargando...'
        mode="flat"
        disabled={ true }
        theme={{ colors: { placeholder: '#57457F', text: '#57457F', background: 'transparent', primary: '#57457F'} }}
        selectionColor='#57457F'
        underlineColor='#57457F'
        placeholderTextColor= '#77747f'
        placeholder="Cargando..."
        returnKeyType="next"
        style={ styles.input }
      />
    );
  }

  return (
    <View>
      <TextInput
        label='Apodo'
        mode="flat"
        theme={{ colors: { placeholder: '#57457F', text: '#57457F', background: 'transparent', primary: '#57457F'} }}
        selectionColor='#57457F'
        underlineColor='#57457F'
        placeholderTextColor= '#77747f'
        returnKeyType="next"
        value={alias}
        onChangeText={(value) => setAlias(value)}
        style={ styles.input }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    marginTop: -15
  },
}); 