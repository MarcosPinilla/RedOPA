import React, { Component } from 'react';
import PerfilScreen from './PerfilScreen'
import { View, StyleSheet, Text } from 'react-native';
import { Avatar, FAB } from 'react-native-paper'

import { connect } from 'react-redux';
import * as actions from '../../rdx/actions';

class PerfilComponent extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);

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

  componentDidMount(){
    this._isMounted = true;
  }

  render() {
    return (
      <View style={styles.container}>
        <PerfilScreen 
          goTo={this.goTo}
          goBack={this.goBack}
          handleChange={this.handleChange}
          profile={this.props.profile}
          setProfile={this.props.setProfile}
        />
        <FAB
          style={styles.fab}
          icon={({ size, color }) => (
            <Avatar.Image style={ styles.avatar } size={42} theme={{ colors: { primary: '#b3fffd' } }} source={require('../../../assets/SOS.png')} />
          )}
          onPress={() => this.goTo("CentroAsistencia")}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    padding: 0,
    alignContent: 'center',
    alignSelf: 'center',
  },
  avatar: {
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: -8
  },
});

const mapStateToProps = state => {
  return { profile: state.profile };
}

export default connect(mapStateToProps, actions)(PerfilComponent);
