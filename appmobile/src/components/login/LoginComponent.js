import React, { Component } from 'react';
import LoginScreen from './LoginScreen'
import { View, StyleSheet, BackHandler } from 'react-native';

import { connect } from 'react-redux';
import * as actions from '../../rdx/actions';

class LoginComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
        access: '',
        password: ''
    };
    this.goTo = this.goTo.bind(this);
  }

  
  static navigationOptions = {
    header: null
  };

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      return true;
    });
  }

  handleChange = (name, value) => {
    const data = {[name]: value} 
    this.setState(data)
  }

  setFotoStorage = (data) => {
    this.props.setProfile({ image: data});
  }
  
  goTo = (path) => {
    this.props.navigation.navigate(path)
  }

  getUser = () => {
    return this.state
  }

  render() {

    const user = { access: this.state.access, password: this.state.password };

    return (
      <View style={styles.container}>
        <LoginScreen
            goTo={this.goTo}
            handleChange={this.handleChange}
            getUser={this.getUser}
            user={user}
            setProfile={this.setFotoStorage.bind(this)}
            />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default connect(null, actions)(LoginComponent)
