import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import InformacionesScreen from './InformacionesScreen';

class InformacionesComponent extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      tipo: '',
    };

    this.goTo = this.goTo.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  static navigationOptions = {
    
  };

  componentDidMount(){
    this._isMounted = true;
    
  }

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
    return (
      <View style={styles.container}>
        <InformacionesScreen
          goTo={this.goTo}
          goBack={this.goBack}
          handleChange={this.handleChange}
          tipo={this.state.tipo}
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

export default InformacionesComponent