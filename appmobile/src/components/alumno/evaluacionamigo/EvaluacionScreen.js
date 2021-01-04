import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Text, Divider, Button, Avatar, TextInput } from 'react-native-paper'
import EvaluadosQuery from './EvaluadosQuery';
import CompanerosQuery from './CompanerosQuery';

const EvaluacionScreen = (props) => {

  const { goTo, handleChange, nombre, } = props;

  return (
    <View>
      <ScrollView style={styles.background}>
        <Text style={styles.titleText}>Tu lista de <Text style={styles.titleBold}>amigos y compañeros</Text></Text>
        <View style={styles.container}>
          <Text style={styles.text}>Estos son tus compañeros en <Text style={styles.bold}>orden de amistad</Text></Text>
          <TextInput
            label='Buscar'
            mode="flat"
            theme={{ colors: { placeholder: '#57457F', text: '#57457F', background: 'transparent', primary: '#57457F'} }}
            selectionColor='#57457F'
            underlineColor='#57457F'
            placeholderTextColor= '#57457F'
            returnKeyType="search"
            value={nombre}
            onChangeText={(actual) => handleChange("nombre", actual)}
            style={ styles.input }
          />
          <EvaluadosQuery goTo={goTo} nombre={nombre}/>
          <CompanerosQuery goTo={goTo} nombre={nombre}/>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 25,
    borderRadius: 25, 
      backgroundColor: '#ffffff'
  },
  background: {
    backgroundColor: '#F6F6F6'
  },
  titleText : {
    fontFamily: 'niramit-regular',
    color: '#57457F',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 25,
    marginHorizontal: 30,
    textAlign: 'center',
  },
  titleBold : {
    fontFamily: 'niramit-bold',
    color: '#57457F',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 25,
    marginHorizontal: 30,
    textAlign: 'center',
  },
  text :{
    fontFamily: 'niramit-regular',
    color: '#57457F',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 25,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  bold :{
    fontFamily: 'niramit-bold',
    color: '#57457F',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 25,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  input: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default EvaluacionScreen;
