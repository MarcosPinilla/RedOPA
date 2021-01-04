import React, { useState } from 'react';
import gql from 'graphql-tag';
import { View, StyleSheet, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity, FlatList } from 'react-native';
import { Button, Text, ActivityIndicator, Avatar, Paragraph, Divider, Portal, Dialog } from 'react-native-paper';
import FitImage from 'react-native-fit-image';
import Moment from 'moment';
import 'moment/locale/es';
import { graphql } from 'react-apollo';

const GET_PUBLICACIONES = graphql(
  gql`
    query publicacionesAlumno($limit: Int, $offset: Int) {
      publicacionesAlumno(limit: $limit, offset: $offset) {
        totalItems,
        items {
          id,
          titulo,
          contenido,
          fotoUrl,
          fecha,
          interes{
            nombre,
            categoria{
              nombre,
              icono_url
            },
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
)(Publications);


function Publications({ data }) {

  const [visible, setVisible] = useState(false);
  const [publication, setPublication] = useState({});

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

  const dataItemsL = data.publicacionesAlumno?.items?.length ?? 0;
  const totalItems = data.publicacionesAlumno?.totalItems ?? 0;

  return (
    (data?.publicacionesAlumno?.items) 
    ? (data.publicacionesAlumno.items.length > 0)
      ? <View>
        <FlatList
          data={data.publicacionesAlumno.items}
          keyExtractor={item => item.id}
          refreshing={data.networkStatus === 4}
          onRefresh={() => data.refetch()}
          onEndReachedThreshold={0.01}
          onEndReached={
            (data.publicacionesAlumno.items.length < data.publicacionesAlumno.totalItems)
            ? () => loadMore(data)
            : null
          }
          renderItem={({item, index}) => rItem({item, index, dataItemsL, totalItems, setVisible, setPublication})}
        /> 
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={() => setVisible(false)}>
            <Dialog.Content>
              <View style={styles.titleDialog}>
                <Text style={{fontSize: 22, fontFamily: 'niramit-bold', color: '#454954'}}>{publication.titulo}</Text>
              </View>
                <View>
                  <FitImage source={{ uri: publication.fotoUrl }} style={styles.ImageDialog}/>
                </View>
              <Dialog.ScrollArea style={styles.scrollArea}>
                <ScrollView>
                  <View style={{flexDirection: 'column'}} style={styles.bodyDialog}>
                    <Paragraph style={{fontSize: 18, fontFamily: 'niramit-regular', color: '#584A64'}}>{publication.contenido}</Paragraph>
                  </View> 
                </ScrollView>
              </Dialog.ScrollArea>
              <View style={{flexDirection: 'row-reverse', marginLeft:15, marginBottom: -30}}>
                <Text style={{fontSize: 10, fontFamily: 'niramit-regular', color: '#584A64'}}>{Moment(publication.fecha).format('d MMMM YYYY')}</Text>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}><Text style={ styles.buttonText }>Cerrar</Text></Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View> 
      : <SafeAreaView>
        <ScrollView  
          refreshControl={
            <RefreshControl refreshing={data.loading} onRefresh={() => data.refetch()} />
          }
          >
          <View style={styles.container}>
            <Avatar.Image style={ styles.avatarBack } size={140} theme={{ colors: { primary: '#f0ffff' } }}/>
            {/* <Avatar.Image style={ styles.avatar } size={110} theme={{ colors: { primary: '#e4ffff' } }} source={require('../../../assets/user_icon.png')} /> */}
            <Text style={styles.subtitle}>No hay nuevas publicaciones</Text>
            <Divider style={styles.divider}></Divider>
            <Text style={styles.text}>Si no has indicado tus temas de interés, te invitamos a hacerlo para que podamos recomendarte eventos relacionados. Dírigete a tu perfil para poder configurar tus intereses.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    : <View style={styles.centerContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
}

function rItem({item, index, dataItemsL, totalItems, setVisible, setPublication}) {
  return (
    <TouchableOpacity onPress={() => {setVisible(true); setPublication(item);}} >
      <View style={styles.Card} key={item.id}>
        <View style={styles.Head}>
          <Avatar.Image size={40} source={{uri: item.interes.categoria.icono_url}} />
          <Text style={{fontSize: 18, fontFamily: 'niramit-bold', marginLeft: 10, alignSelf: 'center', flex:4}}>{item.interes.nombre}</Text>
          <Text style={{fontSize: 18, fontFamily: 'niramit-bold', marginRight: 10, textAlign: 'center', alignSelf: 'flex-end', flex: 4, backgroundColor: '#F6F6F6', borderRadius: 25}}>{item.interes.nombre}</Text>
        </View>
        <View style={styles.Title}>
          <Text style={{fontSize: 22, fontFamily: 'niramit-bold', color: '#454954'}}>{item.titulo}</Text>
        </View>
        <FitImage 
          resizeMode='contain'
          indicator={false}          
          source={{ uri: item.fotoUrl }} 
          style={styles.Image}
        />
        <View style={{flexDirection: 'row-reverse', marginBottom:20, marginLeft:15}}>
          <Text style={{fontSize: 10, fontFamily: 'niramit-regular', color: '#584A64'}}>{Moment(item.fecha).format('d MMMM YYYY')}</Text>
        </View>
      </View>
      {(((index + 1) == dataItemsL) && (dataItemsL < totalItems)) &&
        <ActivityIndicator style={{marginBottom: 20}} size="small" />
      }
    </TouchableOpacity>
  );
};

const loadMore = (data) => {
  data.fetchMore({
    variables: { offset: data.publicacionesAlumno.items.length, limit: 10 },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (fetchMoreResult.publicacionesAlumno == null) {
        return previousResult;
      }

      return Object.assign({}, previousResult, {
        publicacionesAlumno: {
          __typename: previousResult.publicacionesAlumno.__typename,
          items: [...previousResult.publicacionesAlumno.items, ...fetchMoreResult.publicacionesAlumno.items],
          totalItems: fetchMoreResult.publicacionesAlumno.totalItems
        }
      });
    },
  });
}



const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
    width: '100%',
  },
  Card: {
    flex:3,
    flexDirection: 'column', 
    marginLeft: 20, 
    marginRight: 20, 
    marginTop: 10, 
    marginBottom: 10, 
    borderRadius: 25, 
    backgroundColor: '#ffffff'
  },
  Image: {
    marginTop: 10,
    marginBottom: 5,
    height: 200,
    width: '100%'
  },
  Head: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row'
  },
  Title: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center'
  },
  Body: {
    marginTop: 0,
    marginLeft: 15,
    marginRight: 15,
  },
  buscarText: {
    fontFamily: 'nunito-bold',
    fontSize: 22,
    paddingBottom: 3,
  },
  scrollArea: {
    maxHeight: 250
  },
  ImageDialog: {
    marginTop: 10,
    marginBottom: 5
  },
  TitleDialog: {
    alignItems: 'center'
  },
  bodyDialog: {
    marginTop: 5,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'niramit-semibold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  avatarBack: {
    alignSelf: 'center',
    marginBottom: -135,
  },
  avatar: {
    marginTop: 10,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 25,
    fontFamily: 'niramit-semibold',
    textAlign: 'center',
    color: '#57457F',
    alignContent: 'center',
    marginTop: 30,
  },
  divider: {
    height: 3,
    marginTop: 20,
    marginBottom: 20,
    width: 60,
    backgroundColor: '#57457F',
    alignContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: 'niramit-regular',
    color: '#57457F',
    textAlign: 'center',
    marginBottom: 5,
  },
  titleDialog: {
    alignItems: 'center'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default GET_PUBLICACIONES;