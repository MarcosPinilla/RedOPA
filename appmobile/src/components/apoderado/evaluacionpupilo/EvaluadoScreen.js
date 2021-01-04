import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Text, Divider, Button, Avatar, TextInput, List} from 'react-native-paper'
import EvaluacionPupiloMutation from './EvaluacionPupiloMutation';

const EvaluadoScreen = (props) => {

  const { goTo, handleChange, goBack} = props;
  let idAlumno = props.navigation.state.params.props.alumno.id
  let alumno = props.navigation.state.params.props.alumno
  return (
    <ScrollView style={styles.background}>
      <Text style={styles.titleText}>¿Cómo evalúas a tu pupilo?</Text>
      <View style={styles.container}>
        <View style={styles.head}>
          <Avatar.Image size={80} source={{uri: alumno.cuenta.fotoUrl}} style={styles.avatar}/>
          <Text style={styles.text}>{alumno.cuenta.nombres.split(' ')[0]} {alumno.cuenta.apellidos.split(' ')[0]}</Text>
        </View>
        <View style={styles.item}>
          <Image source={require('../../../../assets/emotes/emoji_happy.gif')} style={{width:60,height:60}}></Image>
          <EvaluacionPupiloMutation idAlumno={idAlumno} idEmocion={1} permanente={false} puede= {false} navigation={props.navigation} goTo={goTo} titulo="Feliz"/>
        </View>
        <View style={styles.item}>
          <Image source={require('../../../../assets/emotes/emoji_cool.gif')} style={{width:60,height:60}}></Image>
          <EvaluacionPupiloMutation idAlumno={idAlumno} idEmocion={2} permanente={false} puede= {false} navigation={props.navigation} goTo={goTo} titulo="Piola"/>
        </View>
        <View style={styles.item}>
          <Image source={require('../../../../assets/emotes/emoji_indecisive.gif')} style={{width:60,height:60}}></Image>
          <EvaluacionPupiloMutation idAlumno={idAlumno} idEmocion={3} permanente={false} puede= {false} navigation={props.navigation} goTo={goTo} titulo="Indecis@"/>
        </View>
        <View style={styles.item}>
          <Image source={require('../../../../assets/emotes/emoji_indifferent.gif')} style={{width:60,height:60}}></Image>
          <EvaluacionPupiloMutation idAlumno={idAlumno} idEmocion={4} permanente={false} puede= {false} navigation={props.navigation} goTo={goTo} titulo="Indiferente"/>
        </View>
        <View style={styles.item}>
          <Image source={require('../../../../assets/emotes/emoji_angry.gif')} style={{width:60,height:60}}></Image>
          <EvaluacionPupiloMutation idAlumno={idAlumno} idEmocion={5} permanente={false} puede= {false} navigation={props.navigation} goTo={goTo} titulo="Enojad@"/>
        </View>
        <View style={styles.item}>
          <Image source={require('../../../../assets/emotes/emoji_troubled.gif')} style={{width:60,height:60}}></Image>
          <EvaluacionPupiloMutation idAlumno={idAlumno} idEmocion={6} permanente={false} puede= {false} navigation={props.navigation} goTo={goTo} titulo="Cansad@"/>
        </View>
        <View style={styles.item}>
          <Image source={require('../../../../assets/emotes/emoji_sad.gif')} style={{width:60,height:60}}></Image>
          <EvaluacionPupiloMutation idAlumno={idAlumno} idEmocion={7} permanente={false} puede= {false} navigation={props.navigation} goTo={goTo} titulo="Triste"/>
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
    fontFamily: 'niramit-regular',
    color: '#57457F',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 25
  },
  text :{
    fontFamily: 'niramit-regular',
    color: '#57457F',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 10
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    margin: 15  
  },
  head: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    margin: 15  
  },
  avatar: {
    marginTop: -50
  }
});

export default EvaluadoScreen;