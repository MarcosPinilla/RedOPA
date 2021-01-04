import React, { Component } from 'react';
import EvaluacionScreen from './EvaluacionScreen';
import { View, StyleSheet, AsyncStorage, Text } from 'react-native';
import { FAB, Avatar } from 'react-native-paper';
import { sleep } from '../../../utils/sleep'

class EvaluacionAlumnoComponent extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      nombre: '',
      textSearch: ''
    };

    this.goTo = this.goTo.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  static navigationOptions = {
    
  };

  handleChange = async (value) => { 
    this.state.nombre = value;

    await sleep(500);
    let textS = value.trim();

    if (this.state.nombre == textS) {
      this.setState({
        textSearch: value
      })
    } 
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
          nombre={this.state.nombre}
          textSearch={this.state.textSearch}
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

export default EvaluacionAlumnoComponent