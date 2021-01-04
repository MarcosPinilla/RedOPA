import React, { Component } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Text, Button, TextInput, Card } from 'react-native-paper'
import { AsyncStorage } from 'react-native';
import UpdatePasswordMutation from './UpdatePasswordMutation';

function UpdatePasswordScreen (props) {
  const { goTo, handleChange, user } = props;

  return(
    <KeyboardAvoidingView behavior="height">
      <View style={{width: '100%', height: '100%'}}>
        <View style={ styles.container }>
          <View style={ styles.titleContainer}>
            <Text style= { styles.title }>Cambia tu <Text style={ styles.contrasena }>contraseña</Text></Text>
          </View>
          
          <Card style={ styles.card }>
            <View style={ styles.subtitleContainer }>
              <Text style={ styles.subtitle }>A continuación te pedimos que modifiques tu contraseña por favor:</Text>
            </View>

            <Card.Content>
              <TextInput
                label='Contraseña actual'
                mode="flat"
                theme={{ colors: { placeholder: '#57457F', text: '#57457F', background: 'transparent', primary: '#57457F'} }}
                selectionColor='#57457F'
                underlineColor='#57457F'
                placeholderTextColor= '#57457F'
                returnKeyType="next"
                secureTextEntry={true}
                value={user.password_defecto}
                password
                onChangeText={(actual) => handleChange("password_defecto", actual)}
                style={ styles.input }
              />
              <TextInput
                label='Nueva Contraseña'
                mode="flat"
                theme={{ colors: { placeholder: '#57457F', text: '#57457F', background: 'transparent', primary: '#57457F'} }}
                selectionColor='#57457F'
                underlineColor='#57457F'
                placeholderTextColor= '#57457F'
                returnKeyType="next"
                secureTextEntry={true}
                value={user.password_nuevo}
                password
                onChangeText={(nueva) => handleChange("password_nuevo", nueva)}
                style={ styles.input }
              />
              <TextInput
                label='Repetir Nueva Contraseña'
                mode="flat"
                theme={{ colors: { placeholder: '#57457F', text: '#57457F', background: 'transparent', primary: '#57457F'} }}
                selectionColor='#57457F'
                underlineColor='#57457F'
                placeholderTextColor= '#57457F'
                returnKeyType="go"
                secureTextEntry={true}
                value={user.password_repetido}
                password
                onChangeText={(confirmar) => handleChange("password_repetido", confirmar)}
                style={ styles.input }
              />
            </Card.Content>
          </Card>

          <View style= { styles.containerButtons }>
            <Button
              style={styles.button}
              onPress={ () => goTo('SignedOut') }
            >
              <Text style={ styles.buttonText }>Cancelar</Text>
            </Button>
            <UpdatePasswordMutation goTo={goTo} user={user} />
          </View> 
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
  contrasena: {
    fontSize: 22,
    fontFamily: 'niramit-bold',
    textAlign: 'center',
  },
  card: {
    borderRadius: 10,
    flex: 6, 
    paddingTop: 25,
    marginTop: 10,
    paddingHorizontal: 5,
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
  input: {
    marginHorizontal: 20,
    marginBottom: 10,
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

export default UpdatePasswordScreen;