import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Text, Divider, Button, Avatar, TextInput} from 'react-native-paper'
import PupiloQuery from './PupiloQuery';

const EvaluacionScreen = (props) => {

  const { goTo, handleChange, goBack, } = props;

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.titleText}>Tu Pupilo</Text>
      <View style={styles.container}>
        <PupiloQuery goTo={goTo}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 25,
    borderRadius: 25, 
    backgroundColor: '#ffffff',
    paddingBottom: 25
  },
  background: {
    backgroundColor: '#F6F6F6'
  },
  titleText : {
    fontFamily: 'niramit-regular',
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
  }
});

export default EvaluacionScreen;
