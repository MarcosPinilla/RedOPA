import React, { Component } from 'react';
import MinoriaScreen from './MinoriaScreen';
import { View, StyleSheet } from 'react-native';

class MinoriaComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      minoria: {},
    };

    this.goTo = this.goTo.bind(this);
  }

  handleChange = (name, value) => {
    const data = {[name]: value};
    this.setState(data);
  }

  goTo = (path) => {
    this.props.navigation.navigate(path);
  }

  render() {
    const minoria = this.state.minoria;
    return (
      <View style={styles.container}>
        <MinoriaScreen
          goTo={this.goTo}
          handleChange={this.handleChange}
          visible={this.state.visible}
          minoria={minoria}
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

export default MinoriaComponent;