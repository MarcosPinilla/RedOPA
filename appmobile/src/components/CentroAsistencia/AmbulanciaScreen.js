import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button, Divider, Avatar } from 'react-native-paper';
import { Linking } from 'expo';

const AmbulanciaScreen = (props) => {

  let tipo = props.navigation.state.params.props.tipo;
  
  const llamarNumero = (numero) => {
    Linking.openURL(`tel:${numero}`)
  }

  if (tipo !== null && tipo !== undefined) {
    if (tipo === 'apoderado' || tipo === 'funcionario') {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Centro de Asistencia</Text>
          <View style={styles.card}>
            <Avatar.Icon size={50} color="#57457F" icon="phone" style={styles.circle}/>
            <Text style={styles.subtitle}>Si su vida está en peligro</Text>
            <Divider style={styles.divider}></Divider>
            <Text style={styles.text}>Te recomendamos que llames de inmediato a una ambulancia al 131 o llama al 600 360 7777.</Text>
            <Button
              style={styles.llamarButton}
              onPress={() => llamarNumero('131')}
            >
              <Text style={styles.textLlamarButton}>Llamar</Text>
            </Button>
          </View>
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Centro de Asistencia</Text>
      <View style={styles.card}>
        <Avatar.Icon size={50} color="#57457F" icon="phone" style={styles.circle}/>
        <Text style={styles.subtitle}>Si su vida está en peligro</Text>
        <Divider style={styles.divider}></Divider>
        <Text style={styles.text}>Te recomendamos que llames de inmediato a una ambulancia al 131 y luego busques un adulto responsable.</Text>
        <Button
          style={styles.llamarButton}
          onPress={() => {this.llamarNumero('131')}}
        >
          <Text style={styles.textLlamarButton}>Llamar</Text>
        </Button>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#57457F',
    padding: 10,
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontFamily: 'niramit-regular',
    textAlign: 'center',
    color: '#B3FFFD',
    marginBottom: 35,
    marginTop: 20,
  },
  card: {
    borderRadius: 10,
    //flex: 6, 
    paddingTop: 25,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    padding: 20,
    alignContent: 'center',
    //height: '100%'
  },
  circle: {
    //marginHorizontal: 20,
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#B3FFFD',
    marginTop: -50,
    marginBottom: 10,
  },
  exclamation: {
    fontFamily: 'nunito-black',
  },
  subtitle: {
    fontSize: 22,
    fontFamily: 'niramit-regular',
    textAlign: 'center',
    color: '#57457F',
    alignContent: 'center'
  },
  divider: {
    height: 3,
    marginTop: 20,
    marginBottom: 20,
    width: 60,
    //marginHorizontal: 145,
    backgroundColor: '#57457F',
    alignContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: 'niramit-regular',
    color: '#454954',
    textAlign: 'center',
    marginBottom: 20,
  },
  textBold: {
    fontFamily: 'niramit-bold',
  },
  llamarButton: {
    overflow: 'hidden',
    backgroundColor: '#B3FFFD',
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
    color: '#57457F',
  },
});

export default AmbulanciaScreen;