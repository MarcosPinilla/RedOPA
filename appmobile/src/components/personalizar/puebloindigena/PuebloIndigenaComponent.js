import React, { Component } from 'react';
import PuebloIndigenaScreen from './PuebloIndigenaScreen';
import { View, StyleSheet } from 'react-native';

class PuebloIndigenaComponent extends Component {

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
        <PuebloIndigenaScreen
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

export default PuebloIndigenaComponent;