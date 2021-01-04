import React, { Component } from 'react';
import CorreoScreen from './CorreoScreen'
import { View, StyleSheet } from 'react-native';

class CorreoComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      correo: '',
      numero: '',
    };

    this.goTo = this.goTo.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  static navigationOptions = {
    
  };

  handleChange = (name, value) => {
    const data = {[name]: value} 
    this.setState(data)
  }
  
  goTo = (path) => {
    this.props.navigation.navigate(path)
  }

  goBack = () => {
    this.props.navigation.pop() 
  }

  getUser = () => {
    return this.state
  }

  render() {

    const user = { correo: this.state.correo, numero: this.state.numero };
    return (
      <View style={styles.container}>
        <CorreoScreen
          goTo={this.goTo}
          goBack={this.goBack}
          handleChange={this.handleChange}
          getUser={this.getUser}
          user={user}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default CorreoComponent
