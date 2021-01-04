import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Text, Divider, Button, Avatar, TextInput, List} from 'react-native-paper'
import FitImage from 'react-native-fit-image';
import { Linking } from 'expo';

const MejorarAnimoScreen = (props) => {

  const { goTo, handleChange, goBack} = props;

  seguirEnlace = (enlace) => {
    Linking.openURL(enlace);
  }

  return (
    <ScrollView style={styles.background}>
      <FitImage source={require('../../../assets/informaciones/banner1.jpg')} style={styles.backgroundImage}/>
      <View style={styles.head}>
        <Text style={styles.titleText}>¿Quién puede ayudar a un@ amig@ que quiere <Text style={styles.titleBold}>terminar con su vida?</Text></Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.item}>Las personas encargadas de <Text style={styles.bold}>Convivencia Escolar o Psicólog@s</Text> de tu establecimiento educativo, contactate con ellos para explicar tu situación.</Text>
        <Button
          style={styles.llamarButton}
          onPress={() => {this.seguirEnlace('http://opa.cl/formularioayuda')}}
        >
          <Text style={styles.textLlamarButton}>Formulario</Text>
        </Button>
        <View style={styles.container2}>
          <Text style={styles.item}>Profesionales del <Text style={styles.bold}>Centro de Salud</Text> más cercano, solicitando una hora con un profesional en compañía de un adulto.</Text>
        </View>
        <Text style={styles.item}><Text style={styles.bold}>Salud Responde</Text> del Ministerio de Salud, llamando al <Text style={styles.bold}>600 360 7777.</Text></Text>
        <View style={styles.container2}>
          <Text style={styles.item}><Text style={styles.bold}>Línea Libre</Text> de Fundación para la Confianza, llamando al <Text style={styles.bold}>1515</Text> (de lunes a sábado de 16:00 a 22:00).</Text>
        </View>
        <Text style={styles.item}>Si hay <Text style={styles.bold}>maltrato,</Text> puedes llamar al Servicio Nacional de Menores al <Text style={styles.bold}>800 730 800.</Text></Text>
        <View style={styles.container2}>
          <Text style={styles.item}>Si hay <Text style={styles.bold}>Bullying o Acoso Escolar,</Text> puedes consultar o denunciar a la Superintendencia de Educación llamando al <Text style={styles.bold}>600 600 26 26.</Text></Text>
        </View>
        <Text style={styles.item}>Ante denuncias o urgencias llama al <Text style={styles.bold}>Fono Niñ@s</Text> de Carabineros <Text style={styles.bold}>147</Text> o al <Text style={styles.bold}>Fono Familia</Text> de Carabineros <Text style={styles.bold}>149.</Text></Text>
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
  backgroundImage: {
    marginBottom: -300,
    //flex: 1,
    //resizeMode: 'center',
    width: '100%',
    height: 300,
  },
  titleText : {
    fontFamily: 'niramit-regular',
    color: '#FFFFFF',
    fontSize: 26,
    alignSelf: 'center',
    marginTop: 15,
    marginHorizontal: 35,
    textAlign: 'center',
    alignContent: 'center',
  },
  titleBold: {
    //fontSize: 20,
    fontFamily: 'niramit-bold',
    color: '#FFFFFF',
  },
  content: {
    flexDirection: 'column',
    margin: 15  
  },
  item: {
    marginVertical: 20,
    marginHorizontal: 30,
    fontSize: 17,
    fontFamily: 'niramit-regular',
    flexWrap: 'nowrap',
    //marginBottom: 20,
    color: '#57457F',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  container2: {
    width: '100%',
    backgroundColor: '#f6f6f6',
  },
  bold: {
    //fontSize: 20,
    fontFamily: 'niramit-bold',
  },
  image: {
    flex: 6,
    width: 100,
    //height: 100,
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
  },
  llamarButton: {
    backgroundColor: '#57457F',
    borderRadius: 30,
    height: 50,
    marginVertical: 20,
    width: '70%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  textLlamarButton: {
    fontSize: 15,
    fontFamily: 'niramit-semibold',
    color: '#B3FFFD',
  },
});

export default MejorarAnimoScreen;