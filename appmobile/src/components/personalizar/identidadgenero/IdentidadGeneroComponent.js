import React, { Component } from 'react';
import IdentidadGeneroScreen from './IdentidadGeneroScreen';
import { View, StyleSheet } from 'react-native';

class IdentidadGeneroComponent extends Component {

  constructor(props) {
    super(props);

    this.goTo = this.goTo.bind(this);
  }

  goTo = (path) => {
    this.props.navigation.navigate(path);
  }

  render() {
    return (
      <View style={styles.container}>
        <IdentidadGeneroScreen 
          goTo={this.goTo}
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

export default IdentidadGeneroComponent;