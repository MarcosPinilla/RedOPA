import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button, Divider, Avatar } from 'react-native-paper';

const AmigoPeligroScreen = (props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Centro de Asistencia</Text>
      <View style={styles.card}>
        <Avatar.Text size={50} color="#57457F" label="?" style={styles.circle} labelStyle={styles.exclamation}/>
        <Text style={styles.subtitle}>¿La vida de tu amig@ está en peligro?</Text>
        <Divider style={styles.divider}></Divider>
        <Button
          style={styles.noButton}
          onPress={()=> props.navigation.navigate('AmbulanciaScreen', {props})}
        >
          <Text style={styles.textNoButton}>Si, está muy mal</Text>
        </Button>
        <Button
          style={styles.siButton}
          onPress={()=> props.navigation.navigate('ConvivenciaScreen', {props})}
        >
          <Text style={styles.textSiButton}>No, pero necesita ayuda</Text>
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
  },
  noButton: {
    overflow: 'hidden',
    backgroundColor: '#B3FFFD',
    borderRadius: 30,
    height: 50,
    marginVertical: 20,
    width: '90%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  siButton: {
    overflow: 'hidden',
    backgroundColor: '#57457F',
    borderRadius: 30,
    height: 50,
    marginBottom: 20,
    width: '90%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  textNoButton: {
    fontSize: 15,
    fontFamily: 'niramit-semibold',
    color: '#57457F',
  },
  textSiButton: {
    fontSize: 15,
    fontFamily: 'niramit-semibold',
    color: '#FFFFFF',
  },
});

export default AmigoPeligroScreen;