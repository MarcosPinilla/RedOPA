import React, { Component } from 'react';
import ContactosExternosScreen from './ContactosExternosScreen'
import { View, StyleSheet } from 'react-native';

class ContactosExternosComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      recargarContactosExternos: false,
      nombre: '',
      telefono: '',
      correo: '',
    };

    this.goTo = this.goTo.bind(this);
  }

  static navigationOptions = {
    
  };

  handleChange = (name, value) => {
    const data = {[name]: value};
    this.setState(data)
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
    const contactoExterno = { nombre: this.state.nombre, telefono: this.state.telefono, correo: this.state.correo };
    return (
      <View style={styles.container}>
        <ContactosExternosScreen
          goTo={this.goTo}
          handleChange={this.handleChange}
          visible={this.state.visible}
          recargarContactosExternos={this.state.recargarContactosExternos}
          showDialog={this.showDialog}
          hideDialog={this.hideDialog}
          contactoExterno={contactoExterno}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default ContactosExternosComponent
