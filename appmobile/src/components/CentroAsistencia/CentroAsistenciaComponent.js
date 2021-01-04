import React, { Component } from 'react';
import SOSScreen from './SOSScreen'
import { View, StyleSheet, AsyncStorage } from 'react-native';

class CentroAsistenciaComponent extends Component {

  _isMounted = false;

  constructor (props) {
    super(props);

    this.state = {
      tipo: '',
    };

    this.goTo = this.goTo.bind(this);
  }

  goTo = (path, props) => {
    this.props.navigation.navigate(path, { props })
  }

  componentDidMount(){
    this._isMounted = true;
    
  }

  componentDidMount() {
    this._isMounted = true;
    this.getUser()
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  async getUser() {
    let tipo = await AsyncStorage.getItem('tipo')
    if(this._isMounted){
      this.setState({tipo})
    }
  }

  async componentDidUpdate(prevProps) {
    let tipo = await AsyncStorage.getItem('tipo');
    if(this.state.tipo != tipo) {
      this.setState({tipo})
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <SOSScreen
          goTo={this.goTo}
          tipo={this.state.tipo}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CentroAsistenciaComponent;