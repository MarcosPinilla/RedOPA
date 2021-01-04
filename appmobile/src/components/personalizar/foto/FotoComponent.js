import React, { Component } from 'react';
import FotoScreen from './FotoScreen'
import { View, StyleSheet, AsyncStorage } from 'react-native';

import { connect } from 'react-redux';
import * as actions from '../../../rdx/actions';

class FotoComponent extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      alias: '',
      foto: null,
      fotoStorage: this.props.profile.image
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

  setFotoStorage = (data) => {
    let profile = this.props.profile;
    profile.image = data;
    this.props.setProfile(profile);
    AsyncStorage.setItem('foto', data);
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

    const user = { alias: this.state.alias, foto: this.state.foto, fotoStorage: this.state.fotoStorage };
    return (
      <View style={styles.container}>
        <FotoScreen
          goTo={this.goTo}
          goBack={this.goBack}
          handleChange={this.handleChange}
          getUser={this.getUser}
          user={user}
          setFotoStorage={this.setFotoStorage.bind(this)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

const mapStateToProps = state => {
  return { profile: state.profile };
}

export default connect(mapStateToProps, actions)(FotoComponent)
