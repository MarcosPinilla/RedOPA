import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Text, Divider, Button, Avatar, TextInput, List} from 'react-native-paper'
import { storeKeyNameFromField } from 'apollo-utilities';

const InformacionScreen = (props) => {

  const { goTo, handleChange, goBack} = props;

  let informacion = props.navigation.state.params.props.informacion

  let contenido = informacion.contenido.split('\n')

  let i= 1

  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.titleText}>{informacion.titulo}</Text>
        </View>
        <View style={styles.content}>
          {contenido &&
            contenido.map(informacion => (
            <View key={i++} style={styles.item}>
              <Text style={styles.text}>{informacion}</Text>
            </View>
          ))} 
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Fuente: {informacion.fuente}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    borderRadius: 25, 
    backgroundColor: '#ffffff'
  },
  background: {
    backgroundColor: '#F6F6F6'
  },
  titleText : {
    fontFamily: 'niramit-bold',
    color: '#57457F',
    fontSize: 26,
    alignSelf: 'center',
    marginTop: 15,
    marginHorizontal: 15
  },
  text :{
    fontFamily: 'niramit-regular',
    color: '#57457F',
    fontSize: 20,
  },
  content: {
    flexDirection: 'column',
    margin: 15  
  },
  item: {
    marginVertical: 8,
    fontSize: 25,
    fontFamily: 'niramit-regular'
  },
  head: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center', 
  },
  footer:{
    flexDirection:'row-reverse'
  },
  footerText: {
    fontSize: 12,
    fontWeight: 'bold',
    margin: 15
  }
});

export default InformacionScreen;