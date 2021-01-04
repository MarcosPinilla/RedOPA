import React, { Component } from 'react'
import AllPublicacionesQuery from './AllPublicacionesQuery'
import { FAB, Avatar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export default class AllPublicaciones extends Component {
  
  constructor(props) {
    super(props);

    this.goTo = this.goTo.bind(this);
  }

  goTo = (path) => {
    this.props.navigation.navigate(path)
  }


  render() {
    return (
      <View style={styles.container}>
        <AllPublicacionesQuery/>
        <FAB
          style={styles.fab}
          icon={({ size, color }) => (
            <Avatar.Image style={ styles.avatar } size={42} theme={{ colors: { primary: '#b3fffd' } }} source={require('../../../assets/SOS.png')} />
          )}
          onPress={() => this.goTo("CentroAsistencia")}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    padding: 0,
    alignContent: 'center',
    alignSelf: 'center',
  },
  avatar: {
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: -8
  },
});
