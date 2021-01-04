import React, { Component } from 'react';
import PuebloIndigenaScreen from './PuebloIndigenaScreen';
import { View, AsyncStorage, StyleSheet } from 'react-native';

class PuebloIndigenaComponent extends Component {

  constructor(props) {
    super(props);

    this.fromConfigs = props.navigation.state.params?.configs;
    this.goTo = this.goTo.bind(this);
    
    this.state = {
      puebloIndigenaId: null
    };
  }

  componentDidMount() {
    this.getPuebloIndigenaId();
  }

  async getPuebloIndigenaId() {
    let puebloIndigenaId = await AsyncStorage.getItem('puebloIndigenaId') ?? '0';
    this.setState({puebloIndigenaId});
  }

  goTo = (path) => {
    this.props.navigation.navigate(path);
  }

  render() {
    return (
      <View style={styles.container}>
        <PuebloIndigenaScreen
          puebloI={this.state.puebloIndigenaId}
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

export default PuebloIndigenaComponent;