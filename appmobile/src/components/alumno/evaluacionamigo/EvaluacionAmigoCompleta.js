import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Text, Divider, Button, Avatar, TextInput} from 'react-native-paper'

function renderEmoji (idEmocion){
  if(idEmocion === 1){
    return (
      <View>
        <Image source={require('../../../../assets/emotes/emoji_happy.gif')} style={{width:120,height:120, alignSelf: 'center'}}></Image>
        <Text style={{fontSize:25, alignSelf: 'center', fontFamily: 'niramit-regular'}}>Anduvo Feliz</Text>
      </View>
    )
  }else if(idEmocion === 2){
    return (
      <View>
        <Image source={require('../../../../assets/emotes/emoji_cool.gif')} style={{width:120,height:120, alignSelf: 'center'}}></Image>
        <Text style={{fontSize:25, alignSelf: 'center', fontFamily: 'niramit-regular'}}>Anduvo Piola</Text>
      </View>
    )
  }else if(idEmocion === 3){
    return (
      <View>
        <Image source={require('../../../../assets/emotes/emoji_indecisive.gif')} style={{width:120,height:120, alignSelf: 'center'}}></Image>
        <Text style={{fontSize:25, alignSelf: 'center', fontFamily: 'niramit-regular'}}>Anduvo Indecis@</Text>
      </View>
    )
  }else if(idEmocion === 4){
    return (
      <View>
        <Image source={require('../../../../assets/emotes/emoji_indifferent.gif')} style={{width:120,height:120, alignSelf: 'center'}}></Image>
        <Text style={{fontSize:25, alignSelf: 'center', fontFamily: 'niramit-regular'}}>Anduvo Indiferente</Text>
      </View>
    )
  }else if(idEmocion === 5){
    return (
      <View>
        <Image source={require('../../../../assets/emotes/emoji_angry.gif')} style={{width:120,height:120, alignSelf: 'center'}}></Image>
        <Text style={{fontSize:25, alignSelf: 'center', fontFamily: 'niramit-regular'}}>Anduvo Enojad@</Text>
      </View>
    )
  }else if(idEmocion === 6){
    return (
      <View>
        <Image source={require('../../../../assets/emotes/emoji_troubled.gif')} style={{width:120,height:120, alignSelf: 'center'}}></Image>
        <Text style={{fontSize:25, alignSelf: 'center', fontFamily: 'niramit-regular'}}>Anduvo Cansad@</Text>
      </View>
    )
  }else if(idEmocion === 7){
    return (
      <View>
        <Image source={require('../../../../assets/emotes/emoji_sad.gif')} style={{width:120,height:120, alignSelf: 'center'}}></Image>
        <Text style={{fontSize:25, alignSelf: 'center', fontFamily: 'niramit-regular'}}>Anduvo Triste</Text>
      </View>
    )
  }else{
    return (
      <View>
        <Image source={require('../../../../assets/emotes/emoji_happy.gif')} style={{width:120,height:120, alignSelf: 'center'}}></Image>
        <Text style={{fontSize:25, alignSelf: 'center', fontFamily: 'niramit-regular'}}>El anduvo Feliz</Text>
      </View>
    )
  }
}

const EvaluacionCompletaScreen = (props) => {
      
  let alumno = props.navigation.state.params.props.navigation.state.params.props.alumno;
  let idEmocion = props.navigation.state.params.props.idEmocion;

  return(
    <View style={{flex: 1 , backgroundColor: "#F6F6F6", width: '100%'}}>
      <Text style={{fontSize:25, alignSelf: 'center', fontFamily: 'niramit-regular', marginTop:25}}>Evaluaste a:</Text>
      <View style={{ flex:2, margin: 25,  backgroundColor:'#FFFFFF', borderRadius: 25, alignItems:'center'}}>
        <Avatar.Image size={70} source={{uri: alumno.cuenta.fotoUrl}} style={{ marginTop: -25}}/>
        <Text style={{fontSize:22, marginBottom: 25, fontFamily: 'niramit-regular',}}>{alumno.cuenta.nombres.split(' ')[0]} {alumno.cuenta.apellidos.split(' ')[0]}</Text>
        <Divider/>
        {renderEmoji(idEmocion)}
        <Button
          title="salir"
          mode="contained"
          theme={{ roundness: 25, colors: { primary: '#B3FFFD', text:'#57457F'} }}
          style= {styles.button}
          onPress={() => {
            props.navigation.navigate('EvaluaAmigo')
          }}
        >
          <Text style={ styles.buttonText }>Hecho</Text>
        </Button>
      </View>
    </View>
  )

  
  
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    height: 50,
    width: 260,
    justifyContent: 'center',
    alignContent: 'center',
    fontFamily: 'niramit-regular'
  },
  buttonText: {
    fontFamily: 'niramit-semibold',
    fontSize: 20,
    paddingBottom: 3,
  },
});

export default EvaluacionCompletaScreen;