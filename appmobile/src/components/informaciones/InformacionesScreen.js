import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Text, Divider, Button, Avatar, TextInput, FAB } from 'react-native-paper'
import InformacionesQuery from './InformacionesQuery';

const InformacionesScreen = (props) => {

  const { goTo, handleChange, goBack, tipo } = props;

  return (
    <View>
      <ScrollView style={styles.background}>
        <Text style={styles.titleText}>Informaciones</Text>
        <View style={styles.container}>
          <InformacionesQuery
            goTo={goTo}
            tipo={tipo}
          />
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        icon={({ size, color }) => (
          <Avatar.Image style={ styles.avatar } size={42} theme={{ colors: { primary: '#b3fffd' } }} source={require('../../../assets/SOS.png')} />
        )}
        onPress={() => goTo("CentroAsistencia")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
  background: {
    backgroundColor: '#F6F6F6'
  },
  titleText : {
    fontFamily: 'niramit-bold',
    color: '#57457F',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 25
  },
  text :{
    fontFamily: 'niramit-regular',
    color: '#57457F',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 25
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    padding: 0,
    alignContent: 'center',
    alignSelf: 'center',
  },
  avatar: {
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: -8
  },
});

export default InformacionesScreen;
