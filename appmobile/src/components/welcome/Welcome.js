import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Divider, Button, Avatar, TextInput} from 'react-native-paper'

export default class Welcome extends Component {
  state = {
    text: ''
  };
  render() {
    return (
      <View style={ styles.container }>
        <Text style= { styles.textWelcome }>Crea tu perfil</Text>
        <Divider />
        <Avatar.Image style= { styles.avatar } size={200} source={require('../../../assets/avatar.png')} />
        <Avatar.Image style= { styles.avatar2 } size={60} source={require('../../../assets/imageadd.png')} />
        <TextInput
          label='Apodo'
          mode="outlined"
          style= { styles.inputApodo }
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        <View style= { styles.containerButtons }>
        <Button style={styles.button} mode="outlined" onPress={ () => this.props.navigation.navigate("LoginScreen") }> Más Tarde </Button>
        <Button style={styles.button} mode="contained" onPress={ () => this.props.navigation.navigate("AcuerdoScreen") }> Siguiente </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },
  textWelcome: {
    marginTop: 25,
    fontSize: 40
  },
  textName: {
    fontSize: 25,
    marginTop: 25
  },
  textDescription: {
    fontSize: 20,
    marginTop: 25
  },
  containerButtons: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    margin: 5
  },
  avatar : {
    marginTop: 20,
    alignSelf: 'center',
  },
  avatar2 : {
    marginTop: -40,
    marginLeft: 100,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderWidth: 1
  },
  inputApodo : {
    marginTop: 10
  }
});
