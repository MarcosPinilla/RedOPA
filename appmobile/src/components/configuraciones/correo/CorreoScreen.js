import React, { Component } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Text, Button, Card, TextInput } from 'react-native-paper';
import CorreoMutation from './CorreoMutation';

const CorreoScreen = (props) => {

  const { goTo, handleChange, user } = props;

  return (
    <KeyboardAvoidingView behavior="position">
      <View style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View style={ styles.titleContainer }>
            <Text style={ styles.title }>Confirma tu <Text style={ styles.correo }>correo electrónico</Text></Text>
          </View>

          <Card style= { styles.card }>
            <View style={ styles.subtitleContainer }>
              <Text style={ styles.subtitle }>A continuación, te pedimos que ingreses un correo electrónico válido para confirmar tu cuenta:</Text>
            </View>

            <Card.Content>
              <TextInput
                label='Correo electrónico'
                mode="flat"
                theme={{ colors: { placeholder: '#57457F', text: '#57457F', background: 'transparent', primary: '#57457F'} }}
                selectionColor='#57457F'
                underlineColor='#57457F'
                placeholderTextColor= '#57457F'
                keyboardType='email-address'
                value={user.correo}
                onChangeText={(correo) => handleChange("correo", correo)}
                style={ styles.input }
              />
              <View style={ styles.containerNumeroInput }>
                <Text style={ styles.numeroText }>+56 9 </Text>
                <TextInput
                  label='Celular'
                  mode="flat"
                  theme={{ colors: { placeholder: '#57457F', text: '#57457F', background: 'transparent', primary: '#57457F'} }}
                  selectionColor='#57457F'
                  underlineColor='#57457F'
                  placeholderTextColor= '#57457F'
                  keyboardType='numeric'
                  value={user.numero}
                  onChangeText={(numero) => handleChange("numero", numero)}
                  style={ styles.numeroInput }
                />
              </View>
              <CorreoMutation goTo={goTo} user={user} />
            </Card.Content>
          </Card>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  correo: {
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
  containerNumeroInput: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  numeroText: {
    flex: 3,
    textAlignVertical: 'center',
    marginTop: 18,
    marginLeft: 20,
    fontSize: 16,
    color: '#57457F',
  },
  numeroInput: {
    flex: 9,
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

export default CorreoScreen;