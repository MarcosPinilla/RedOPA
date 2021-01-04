import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';

class SignOut extends Component {
  constructor(props){
    super(props);
    
  }

  componentDidMount() {
    this.SignedOut();
  }

  SignedOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('AuthStack');
  };

  render() {
    return (
      <View></View>
    );
  }
}

export default SignOut
