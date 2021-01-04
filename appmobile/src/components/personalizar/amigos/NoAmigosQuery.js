import React from 'react';
import gql from 'graphql-tag';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import CreateAmigoMutation from './CreateAmigoMutation';
import { graphql } from 'react-apollo';


const NoAmigos = (props) => {

  const { handleChange, hideDialog } = props;

  const NoAmigosQuery = graphql(
    gql`
    query NoAmigos($offset: Int, $limit: Int) {
      noAmigos(offset: $offset, limit: $limit) {
        totalItems,
        items {
          id,
          alias,
          cuenta{
            nombres,
            apellidos,
            rut,
            fotoUrl
          }
        }
      }
    }
  `,
    {
      options: {
        fetchPolicy: 'network-only',
        variables: { offset: 0, limit: 10 },
      },
    }
  )(NoAmigos);

  function NoAmigos({ data }) {
    return (
      <View style={styles.container}>
        <NoAmigosList data={data} />
      </View>
    );
  }

  function NoAmigosList({ data }) {

    if (data.networkStatus === 1) {
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
        </View>
      );
    }
      
    const dataItemsL = data.noAmigos?.items?.length ?? 0;
    const totalItems = data.noAmigos?.totalItems ?? 0;

    return (
      <FlatList
        data={data.noAmigos.items}
        keyExtractor={(item, index) => index.toString()}
        refreshing={data.networkStatus === 4}
        onRefresh={() => data.refetch()}
        onEndReachedThreshold={0.01}
        onEndReached={
          (data.noAmigos.items.length < data.noAmigos.totalItems)
          ? () => loadMore(data)
          : null
        }
        renderItem={({item, index}) => rItem({item, index, dataItemsL, totalItems, handleChange, hideDialog})}
      />
    );
  }

  return (
    <NoAmigosQuery />
  );
}

const loadMore = (data) => {
  data.fetchMore({
    variables: { offset: data.noAmigos.items.length, limit: 10 },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      return Object.assign({}, previousResult, {
        noAmigos: {
          __typename: previousResult.noAmigos.__typename,
          items: [...previousResult.noAmigos.items, ...fetchMoreResult.noAmigos.items],
          totalItems: fetchMoreResult.noAmigos.totalItems
        }
      });
    },
  });
}

function rItem({item, index, dataItemsL, totalItems, handleChange, hideDialog}) {
  return (
    <View>
      <CreateAmigoMutation
        alumno={item}
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
  title: {
    fontSize: 24,
    margin: 20,
  },
  container: {
    height: 300,
    paddingTop: 10,
  },
  loading: {
    margin: 50,
  },
  fullApp: {
    margin: 20,
    textAlign: 'center',
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

export default NoAmigos;