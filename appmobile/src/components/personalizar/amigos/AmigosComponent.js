import React, { Component } from 'react';
import AmigosScreen from './AmigosScreen'
import { View, StyleSheet } from 'react-native';
import { sleep } from '../../../utils/sleep';

class AmigosComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nombre: '',
      textSearch: '',
      visible: false,
      recargarAmigos: false
    };

    this.goTo = this.goTo.bind(this);
  }

  static navigationOptions = {
    
  };

  handleChange = (name, value) => {
    const data = {[name]: value};
    this.setState(data)
  }

  handleChangeTextSearch = async (value) => {
    this.state.nombre = value;

    await sleep(500);
    let textS = value.trim();

    if (this.state.nombre == textS) {
      this.setState({
        textSearch: value
      })
    } 
  }
  
  goTo = (path) => {
    this.props.navigation.navigate(path)
  }

  showDialog = () => {
    this.setState({ visible: true });
  }

  hideDialog = () => {
    this.setState({ visible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <AmigosScreen
          goTo={this.goTo}
          handleChange={this.handleChange}
          visible={this.state.visible}
          recargarAmigos={this.state.recargarAmigos}
          showDialog={this.showDialog}
          hideDialog={this.hideDialog}
          nombre={this.state.nombre}
          handleChangeTextSearch={this.handleChangeTextSearch}
          textSearch={this.state.textSearch}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default AmigosComponent
