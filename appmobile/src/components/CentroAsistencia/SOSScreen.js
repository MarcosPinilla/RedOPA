import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button, Divider, Avatar } from 'react-native-paper';

const SOSScreen = (props) => {
 
  const { goTo, tipo } = props;

  if (tipo !== null && tipo !== undefined) {
    if (tipo === 'apoderado') {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Centro de Asistencia</Text>
          <View style={styles.card}>
            <Avatar.Text size={50} color="#57457F" label="?" style={styles.circle} labelStyle={styles.exclamation}/>
            <Text style={styles.subtitle}>¿La vida de tu pupilo está en peligro?</Text>
            <Divider style={styles.divider}></Divider>
            <Button
              style={styles.miButton}
              onPress={()=> {goTo('AmbulanciaScreen', {tipo})}}
            >
              <Text style={styles.textMiButton}>Si, está muy mal</Text>
            </Button>
            <Button
              style={styles.alguienButton}
              onPress={()=> goTo('ConvivenciaScreen', { tipo })}
            >
              <Text style={styles.textAlguienButton}>No, pero necesita ayuda</Text>
            </Button>
          </View>
          <Button
            style={styles.alguienButton}
            onPress={()=> goTo('ApoderadoDrawer', { tipo })}
          >
            <Text style={styles.textAlguienButton}>Volver a OPA</Text>
          </Button>
        </View>
      )
    } else if (tipo === 'funcionario') {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Centro de Asistencia</Text>
          <View style={styles.card}>
            <Avatar.Text size={50} color="#57457F" label="?" style={styles.circle} labelStyle={styles.exclamation}/>
            <Text style={styles.subtitle}>¿La vida de un estudiante está en peligro?</Text>
            <Divider style={styles.divider}></Divider>
            <Button
              style={styles.miButton}
              onPress={()=> {goTo('AmbulanciaScreen', { tipo })}}
            >
              <Text style={styles.textMiButton}>Si, está muy mal</Text>
            </Button>
            <Button
              style={styles.alguienButton}
              onPress={()=> goTo('ConvivenciaScreen', {tipo})}
            >
              <Text style={styles.textAlguienButton}>No, pero necesita ayuda</Text>
            </Button>
          </View>
          <Button
            style={styles.alguienButton}
            onPress={()=> goTo('DocenteDrawer', { tipo })}
          >
            <Text style={styles.textAlguienButton}>Volver a OPA</Text>
          </Button>
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Centro de Asistencia</Text>
      <View style={styles.card}>
        <Avatar.Text size={50} color="#57457F" label="!" style={styles.circle} labelStyle={styles.exclamation}/>
        <Text style={styles.subtitle}>¡S.O.S!</Text>
        <Divider style={styles.divider}></Divider>
        <Text style={styles.text}>Selecciona a continuación para quién necesitas asistencia:</Text>
        <Button
          style={styles.miButton}
          onPress={() => goTo("PuedeEsperarScreen", {props})}
        >
          <Text style={styles.textMiButton}>Para mí, necesito ayuda</Text>
        </Button>
        <Button
          style={styles.alguienButton}
          onPress={() => goTo("AmigoPeligroScreen", {props})}
        >
          <Text style={styles.textAlguienButton}>Para alguien más</Text>
        </Button>
      </View>
          <Button
            style={styles.volverButton}
            onPress={()=> goTo('AlumnoDrawer', { tipo })}
          >
            <Text style={styles.textVolverButton}>Volver a OPA</Text>
          </Button>
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
  miButton: {
    overflow: 'hidden',
    backgroundColor: '#B3FFFD',
    borderRadius: 30,
    height: 50,
    marginVertical: 20,
    width: '90%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  alguienButton: {
    overflow: 'hidden',
    backgroundColor: '#57457F',
    borderRadius: 30,
    height: 50,
    marginBottom: 20,
    width: '90%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  textMiButton: {
    fontSize: 15,
    fontFamily: 'niramit-semibold',
    color: '#57457F',
  },
  textAlguienButton: {
    fontSize: 15,
    fontFamily: 'niramit-semibold',
    color: '#FFFFFF',
  },
  volverButton: {
    height: 40,
    width: '90%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  textVolverButton: {
    fontSize: 15,
    fontFamily: 'niramit-semibold',
    color: '#FFFFFF',
  },
});

export default SOSScreen;