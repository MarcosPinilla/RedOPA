import React from 'react';
import gql from 'graphql-tag';
import { View, StyleSheet } from 'react-native'
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { FlatList } from 'react-native';
import { graphql } from 'react-apollo';
import CreateContactoMutation from './CreateContactoMutation';

const NoContactosSearchQuery = (props) => {
  const NoContactosQ = graphql(
    gql`
        query searchNoContactos($textSearch: String) {
            searchNoContactos(textSearch: $textSearch) {
                id,
                cuenta{
                nombres,
                apellidos,
                rut,
                fotoUrl,
                }
            }
        }
    `, {
      options: {
        notifyOnNetworkStatusChange: true,
        errorPolicy: "all",
        fetchPolicy: 'network-only',
        variables: { textSearch: props.textSearch }
      }
    }
  )((data) => NoContactos(data, props));

  return (
    <NoContactosQ/>
  );
} 

function NoContactos({ data }, props) {
  const { handleChange, hideDialog } = props;

  if (data.networkStatus == 1) {
    return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
        </View>
    );
  }

  if (data.error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorMessage}>Ha ocurrido un error,</Text>
        <Text style={styles.errorMessage}>Por favor intente otra vez</Text>        
        <Button style={{margin: 40}}  mode="outlined" onPress={() => data.refetch()}>
          Reintentar
        </Button>
      </View>
    );
  }

  return (
    (data?.searchNoContactos) 
    ? (data.searchNoContactos.length > 0)
      ? <FlatList
        data={data.searchNoContactos}
        keyExtractor={(item, index) => index.toString()}
        refreshing={data.networkStatus === 4}
        onRefresh={() => data.refetch()}
        renderItem={({item}) => rItem({item, handleChange, hideDialog})}
      /> 
      : <View style={styles.centerContainer}>
        <Text style={styles.errorMessage}>No se encontraron registros</Text>
      </View>
    : <View style={styles.centerContainer}>
      <ActivityIndicator size="large" />
    </View>
  )
}

function rItem({item, handleChange, hideDialog}) {
  return (
    <CreateContactoMutation
    funcionario={item}
    handleChange={handleChange}
    hideDialog={hideDialog}
    key={item.id}
    />
  );
};

const styles = StyleSheet.create({
  cargando: {
    marginTop: 150
  },
  centerContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorMessage: {
    fontSize: 15,
    fontFamily: 'niramit-semibold',
    color: '#57457F'
  }
});

export default NoContactosSearchQuery;