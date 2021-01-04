import React, { Component } from 'react';
import EvaluacionScreen from './EvaluacionScreen';
import { View, StyleSheet, AsyncStorage, Text, ScrollView } from 'react-native';
import { FAB, Avatar } from 'react-native-paper';

class EvaluacionComponent extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      emocionId:0,
      alumnoId:0,
      permanente: false,
      puede: false,
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

  getEvaluacion= () => {
    return this.state
  }

  componentDidMount(){
    this._isMounted = true;
    this.getEvaluado()
  }

  async getEvaluado(){
    let alumnoId = await AsyncStorage.getItem('idtipo')
    this.setState({alumnoId: parseInt(alumnoId)})
  }

  render() {

    const evaluacion = this.getEvaluacion()
    return (
      <View style={styles.container}>
        <EvaluacionScreen
          goTo={this.goTo}
          goBack={this.goBack}
          handleChange={this.handleChange}
          evaluacion={evaluacion}/>
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
    flex: 1,
    backgroundColor: '#F6F6F6'
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

export default EvaluacionComponent