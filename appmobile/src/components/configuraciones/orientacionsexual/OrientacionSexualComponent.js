import React, { Component } from 'react';
import OrientacionSexualScreen from './OrientacionSexualScreen';
import { View, AsyncStorage, StyleSheet } from 'react-native';

class OrientacionSexualComponent extends Component {

  constructor(props) {
    super(props);

    this.fromConfigs = props.navigation.state.params?.configs;
    this.fromConfigs = true;
    this.goTo = this.goTo.bind(this);

    this.state = {
      orientationId: null,
    };
  }

  componentDidMount() {
    this.getOrientationId();
  }

  async getOrientationId() {
    let orientationId = await AsyncStorage.getItem('orientacionId') ?? '0';
    this.setState({orientationId});
  }

  goTo = (path) => {
    this.props.navigation.navigate(path);
  }

  render() {
    return (
      <View style={styles.container}>
        <OrientacionSexualScreen
          orientation={this.state.orientationId}
          goTo={(this.fromConfigs) ? () => {} : () => this.goTo()}
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

export default OrientacionSexualComponent;