import React, { Component } from 'react'
import { Text, TextInput, Button } from 'react-native-paper'
import { StyleSheet, View, ImageBackground, KeyboardAvoidingView, Image} from 'react-native'
import LoginMutation from './LoginMutation';

const LoginScreen = (props) => {

  const { goTo, user, handleChange, setProfile } = props;
  
  return (
    <KeyboardAvoidingView behavior="height">
      <View style={{width: '100%', height: '100%'}}> 
      <View style={styles.container}>
        <View style={{alignItems: 'stretch', flex:2, justifyContent: 'center'}}>
          <Image source={require('../../../assets/opa_logo.png')} style={{alignSelf:'center'}}></Image>
        </View>
        <View style={styles.containerInputs}>
          <TextInput
            label='Email o rut'
            mode="flat"
            theme={{ colors: { placeholder: '#B3FFFD', text: '#B3FFFD', background: 'transparent', primary: '#B3FFFD'} }}
            selectionColor='#B3FFFD'
            underlineColor='#B3FFFD'
            placeholderTextColor= '#B3FFFD'
            value={user.access}
            returnKeyType="next"
            keyboardType="email-address"
            onChangeText={(access) => handleChange("access", access)}
            style={styles.input}
            inlineImageLeft= 'user'
          />
          <TextInput
            label='Password'
            mode="flat"
            theme={{ colors: { placeholder: '#B3FFFD', text: '#B3FFFD', background: 'transparent', primary: '#B3FFFD' } }}
            selectionColor='#B3FFFD'
            underlineColor='#B3FFFD'
            value={user.password}
            secureTextEntry={true}
            password
            returnKeyType="go"
            onChangeText={(password) => handleChange("password", password)}
            style={styles.input}
          />
          <LoginMutation 
            goTo={goTo}
            user={user}
            setProfile={setProfile}
          />
          <Button
            title="olvide"
            mode='text'
            theme={{ colors: { primary: '#B3FFFD' } }}
            onPress={() => goTo('PasswordRecovery')}
            style={styles.olvide}
          >
            <Text style={ styles.olvidarText }>¿Olvidaste tu contraseña?</Text>
          </Button>
        </View>
        <View style={styles.containeFooter}>
          <Text>©2019 OPA – Todos los derechos reservados.</Text>
        </View>
      </View>
      </View>
    </KeyboardAvoidingView >
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  containerInputs: {
    backgroundColor: '#57457F', 
    flex:2, 
    justifyContent:'flex-start',
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  containeFooter: {
    backgroundColor: '#B3FFFD', 
    alignItems: 'center',
    alignContent: 'center',
    height:50,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'center',
  },
  input: {
    margin: 5,
    marginRight:25,
    marginLeft:25
  },
  text: {
    fontSize: 150,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 25 
  },
  olvidarText: {
    fontSize: 14,
    fontFamily: 'source-sans-pro-bold',
    color: '#B3FFFD',
  },
});

export default LoginScreen
