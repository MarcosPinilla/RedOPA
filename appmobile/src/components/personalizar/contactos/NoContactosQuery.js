import React from 'react';
import gql from 'graphql-tag';
import { View, StyleSheet } from 'react-native'
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import CreateContactoMutation from './CreateContactoMutation';
import { FlatList } from 'react-native';
import { graphql } from 'react-apollo';

const NoContactosQuery = (props) => {
  const NoContactosQ = graphql(
    gql`
      query noContactos($offset: Int, $limit: Int) {
        noContactos(offset: $offset, limit: $limit) {
          totalItems,
          items {
            id,
            cuenta{
              nombres,
              apellidos,
              rut,
              fotoUrl,
            }
          }
        }
      }
    `, {
      options: {
        notifyOnNetworkStatusChange: true,
        errorPolicy: "all",
        fetchPolicy: 'cache-and-network',
        variables: { offset: 0, limit: 8 }
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
  
  const dataItemsL = data.noContactos?.items?.length ?? 0;
  const totalItems = data.noContactos?.totalItems ?? 0;

  return (
    (data?.noContactos?.items) 
    ? (data.noContactos.items.length > 0)
      ? <FlatList
        data={data.noContactos.items}
        keyExtractor={(item, index) => index.toString()}
        refreshing={data.networkStatus === 4}
        onRefresh={() => data.refetch()}
        onEndReachedThreshold={0.01}
        onEndReached={
          (data.noContactos.items.length < data.noContactos.totalItems)
          ? () => loadMore(data)
          : null
        }
        renderItem={({item, index}) => rItem({item, index, dataItemsL, totalItems, handleChange, hideDialog})}
      /> 
      : <View style={styles.centerContainer}>
        <Text style={styles.errorMessage}>No se encontraron registros</Text>
      </View>
    : <View style={styles.centerContainer}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const loadMore = (data) => {
  data.fetchMore({
    variables: { offset: data.noContactos.items.length, limit: 8 },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      return Object.assign({}, previousResult, {
        noContactos: {
          __typename: previousResult.noContactos.__typename,
          items: [...previousResult.noContactos.items, ...fetchMoreResult.noContactos.items],
          totalItems: fetchMoreResult.noContactos.totalItems
        }
      });
    },
  });
}

function rItem({item, index, dataItemsL, totalItems, handleChange, hideDialog}) {
  return (
    <View>
      <CreateContactoMutation
        funcionario={item}
        handleChange={handleChange}
        hideDialog={hideDialog}
        key={item.id}
      />
      { (((index + 1) == dataItemsL) && (dataItemsL < totalItems)) &&
        <ActivityIndicator style={{marginBottom: 20}} size="small" />
      }
    </View>
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

export default NoContactosQuery;