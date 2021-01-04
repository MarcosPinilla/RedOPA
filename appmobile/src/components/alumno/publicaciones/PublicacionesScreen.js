import React, { Component } from 'react'
import PublicacionesQuery from './PublicacionesQuery'
import { View, StyleSheet } from 'react-native';
import { FAB, Text, Avatar } from 'react-native-paper';

export default class Publicaciones extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      publicacion: {},
    }

    this.goTo = this.goTo.bind(this);
  }

  goTo = (path) => {
    this.props.navigation.navigate(path)
  }

  cambiarContenidoDialog = (texto) => {
    this.setState({ contenido: texto })
  }
  
  showDialog = (publi) => {
    this.setState({ publicacion: publi })
    this.setState({ visible: true });
  }

  hideDialog = () => {
    this.setState({ visible: false });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <PublicacionesQuery
          visible={this.state.visible}
          publicacion={this.state.publicacion}
          showDialog={this.showDialog}
          hideDialog={this.hideDialog}
          goTo={this.goTo}
        />
        <FAB
          style={styles.fab}
          icon={({ size, color }) => (
            <Avatar.Image style={ styles.avatar } size={42} theme={{ colors: { primary: '#b3fffd' } }} source={require('../../../../assets/SOS.png')} />
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
