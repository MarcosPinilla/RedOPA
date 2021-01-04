import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Portal, Text, Button, Dialog, List, Card, TextInput } from 'react-native-paper';
import MinoriaQuery from './MinoriaQuery';
import AddMinoriaMutation from './AddMinoriaMutation';

const MinoriaScreen = (props) => {

  const { goTo, handleChange, minoria } = props;

  return (
    <View style={styles.container}>
      <View style={ styles.titleContainer }>
        <Text style={ styles.title }>Grupo de <Text style={ styles.identificacion }>identificación</Text></Text>
      </View>

      <Card style= { styles.card }>
        <View style={ styles.subtitleContainer }>
          <Text style={ styles.subtitle }>Señala por favor, si te sientes identificad@ con alguno de los siguientes grupos:</Text>
        </View>

        <Card.Content>
          <MinoriaQuery handleChange={handleChange} minoria={minoria}/>
          <AddMinoriaMutation minoria={minoria} goTo={goTo}/>
        </Card.Content>
      </Card>

      <View style= { styles.containerButtons }>
        <Button
          style={styles.button}
          onPress={ () => goTo("LoginScreen") }
        >
          <Text style={ styles.buttonText }>Cancelar</Text>
        </Button>
        <Button
          style={styles.button}
          onPress={ () => goTo("PersonalizarFoto") }
        >
          <Text style={ styles.buttonText }>Siguiente</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F6F6F6',
  },
  titleContainer: {
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  title: {
    fontSize: 22,
    fontFamily: 'niramit-regular',
    textAlign: 'center',
  },
  identificacion: {
    fontSize: 22,
    fontFamily: 'niramit-bold',
    textAlign: 'center',
  },
  card: {
    borderRadius: 10,
    flex: 6, 
    paddingTop: 25,
    marginTop: 10,
  },
  subtitleContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'niramit-regular',
  },
  containerButtons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'niramit-semibold',
  },
});

export default MinoriaScreen;