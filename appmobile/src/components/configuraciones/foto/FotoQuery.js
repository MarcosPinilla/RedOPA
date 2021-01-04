import React, {useState} from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';


const GET_ALIAS = gql`
  query {
    logueado {
      fotoUrl
      alumno {
        alias
      }
    }
  }
`;

export default function AliasFoto(props) {
  const { user, handleChange } = props
  const { data, loading, error, refetch } = useQuery(GET_ALIAS);
  
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
        value={user.alias}
        onChangeText={(alias) => handleChange("alias", alias)}
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
        placeholder={data.logueado.alumno.alias}
        returnKeyType="next"
        value={user.alias}
        onChangeText={(alias) => handleChange("alias", alias)}
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