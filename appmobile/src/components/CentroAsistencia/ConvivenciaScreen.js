import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, Button, Divider, Avatar } from 'react-native-paper';
import { Linking } from 'expo';

const ConvivenciaScreen = (props) => {

  let tipo = props.navigation.state.params.props.tipo;
  let destino = 'AlumnoDrawer';

  const seguirEnlace = (enlace) => {
    Linking.openURL(enlace);
  }

  if (tipo !== null && tipo !== undefined) {
    if (tipo === 'apoderado') {
      destino = 'ApoderadoDrawer';
    } else if (tipo === 'funcionario') {
      destino = 'DocenteDrawer';
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Centro de Asistencia</Text>
      <View style={styles.card}>
        <Avatar.Image style= { styles.avatarBack } size={120} theme={{ colors: { primary: '#f0ffff' } }}/>
        <Avatar.Image style= { styles.avatar } size={90} theme={{ colors: { primary: '#e4ffff' } }} source={require('../../../assets/user_icon.png')} />
        <Text style={styles.subtitle}>Que bueno que puede esperar</Text>
        <Divider style={styles.divider}></Divider>
        <Text style={styles.text}>Te recomendamos sin embargo que te comuniques con el personal de convivencia, rellena el siguiente formulario para explicar la situación.</Text>
        <Button
          style={styles.llamarButton}
          onPress={() => seguirEnlace('http://opa.cl/formularioayuda')}
        >
          <Text style={styles.textLlamarButton}>Formulario</Text>
        </Button>
        <Button
          style={styles.finalizarButton}
          onPress={()=> props.navigation.navigate(destino, {props})}
        >
          <Text style={styles.textFinalizarButton}>Finalizar</Text>
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
    marginBottom: 10,
    marginTop: 15,
  },
  card: {
    borderRadius: 10,
    //flex: 6, 
    paddingTop: 5,
    marginTop: 5,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    padding: 20,
    alignContent: 'center',
    //height: '100%'
  },
  avatarBack: {
    alignSelf: 'center',
    marginBottom: -115,
  },
  avatar: {
    marginTop: 10,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontFamily: 'niramit-regular',
    textAlign: 'center',
    color: '#57457F',
    alignContent: 'center',
    marginTop: 10,
  },
  divider: {
    height: 3,
    marginTop: 10,
    marginBottom: 10,
    width: 60,
    //marginHorizontal: 145,
    backgroundColor: '#57457F',
    alignContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 15,
    fontFamily: 'niramit-regular',
    color: '#454954',
    textAlign: 'center',
    marginBottom: 5,
  },
  textBold: {
    fontFamily: 'niramit-bold',
  },
  finalizarButton: {
    overflow: 'hidden',
    backgroundColor: '#B3FFFD',
    borderRadius: 30,
    height: 50,
    marginVertical: 20,
    width: '70%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  textFinalizarButton: {
    fontSize: 15,
    fontFamily: 'niramit-semibold',
    color: '#57457F',
  },
  llamarButton: {
    overflow: 'hidden',
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

export default ConvivenciaScreen;