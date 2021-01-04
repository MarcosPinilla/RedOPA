import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Text, Divider, Button, Avatar, TextInput} from 'react-native-paper'

const EmojiElement = (props) => {

  const { goTo, handleChange, goBack, emocionId} = props;

  if(emocionId == 1){
    return(
      <Image source={require('../../../../assets/emotes/emoji_happy.gif')} style={{width:60,height:60}}></Image>
    ) 
  }else if(emocionId == 2){
    return(
      <Image source={require('../../../../assets/emotes/emoji_cool.gif')} style={{width:60,height:60}}></Image>
    ) 
  } else if(emocionId == 3){
    return(
      <Image source={require('../../../../assets/emotes/emoji_indecisive.gif')} style={{width:60,height:60}}></Image>
    ) 
  } else if(emocionId == 4){
    return(
      <Image source={require('../../../../assets/emotes/emoji_indifferent.gif')} style={{width:60,height:60}}></Image>
    ) 
  } else if(emocionId == 5){
    return(
      <Image source={require('../../../../assets/emotes/emoji_angry.gif')} style={{width:60,height:60}}></Image>
    ) 
  } else if(emocionId == 6){
    return(
      <Image source={require('../../../../assets/emotes/emoji_troubled.gif')} style={{width:60,height:60}}></Image>
    ) 
  } else if(emocionId == 7){
    return(
      <Image source={require('../../../../assets/emotes/emoji_sad.gif')} style={{width:60,height:60}}></Image>
    ) 
  }else{
    return <Text>No Image</Text>
  }

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

export default EmojiElement;
