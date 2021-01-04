import React, { Component } from 'react';
import EvaluacionScreen from './EvaluacionScreen';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { FAB, Avatar } from 'react-native-paper';

class EvaluacionPupiloComponent extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      
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
  
  goTo = (path, props) => {
    this.props.navigation.navigate(path, { props })
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
        <EvaluacionScreen
          goTo={this.goTo}
          goBack={this.goBack}
          handleChange={this.handleChange}
        />
        <FAB
          style={styles.fab}
          icon={({ size, color }) => (
            <Avatar.Image style={ styles.avatar } size={42} theme={{ colors: { primary: '#b3fffd' } }} source={require('../../../../assets/SOS.png')} />
          )}
          onPress={() => this.goTo("CentroAsistencia")}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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

export default EvaluacionPupiloComponent