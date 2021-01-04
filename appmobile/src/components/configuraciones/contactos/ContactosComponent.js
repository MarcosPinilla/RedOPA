import React, { Component } from 'react';
import ContactosScreen from './ContactosScreen'
import { View, StyleSheet } from 'react-native';
import { sleep } from '../../../utils/sleep';

class ContactosComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      recargarContactos: false,
      nombre: '',
      textSearch: ''
    };

    this.goTo = this.goTo.bind(this);
  }

  static navigationOptions = {
    
  };

  handleChange = (name, value) => {
    const data = {[name]: value};
    this.setState(data)
  }
  
  setTextSearch = async (value) => { 
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
        <ContactosScreen
          goTo={this.goTo}
          handleChange={this.handleChange}
          visible={this.state.visible}
          recargarContactos={this.state.recargarContactos}
          showDialog={this.showDialog}
          hideDialog={this.hideDialog}
          nombre={this.state.nombre}
          textSearch={this.state.textSearch}
          setTextSearch={this.setTextSearch}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default ContactosComponent
