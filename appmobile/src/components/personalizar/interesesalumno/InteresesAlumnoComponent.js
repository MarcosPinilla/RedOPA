import React, { Component } from 'react';
import InteresesAlumnoScreen from './InteresesAlumnoScreen';
import { View, StyleSheet } from 'react-native';

class InteresesAlumnoComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      recargarInteresesAlumno: false,
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
    return (
      <View style={styles.container}>
        <InteresesAlumnoScreen
          goTo={this.goTo}
          handleChange={this.handleChange}
          visible={this.state.visible}
          recargarInteresesAlumno={this.state.recargarInteresesAlumno}
          showDialog={this.showDialog}
          hideDialog={this.hideDialog}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default InteresesAlumnoComponent;
