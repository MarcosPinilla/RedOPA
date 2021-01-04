import React, { Component } from 'react';
import IdentidadGeneroScreen from './IdentidadGeneroScreen';
import { View, AsyncStorage, StyleSheet } from 'react-native';


class IdentidadGeneroComponent extends Component {

  constructor(props) {
    super(props);

    this.fromConfigs = props.navigation.state.params?.configs;
    this.goTo = this.goTo.bind(this);
    
    this.state = {
      generoId: null
    }
  }

  componentDidMount() {
    this.getGeneroId();
  }

  async getGeneroId() {
    let generoId = await AsyncStorage.getItem('generoId') ?? '0';
    
    this.setState({generoId});
  }

  goTo = (path) => {
    this.props.navigation.navigate(path);
  }

  render() {
    return (
      <View style={styles.container}>
        <IdentidadGeneroScreen
          genre={this.state.generoId}
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

export default IdentidadGeneroComponent;