import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Modal, Portal, Text, TextInput, Button, Provider, Divider, Card, Title, Paragraph, Avatar , Dialog, List} from 'react-native-paper';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ContactosExternos extends Component {

  /*
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.feedQuery.refetch()
    }
  }*/

  state = {
    visible: false,
    contactosExternos: [],
    contactoExterno: {},
    nombre: '',
    telefono: '',
    email: '',
  };


  _showDialog = () => this.setState({ visible: true });
  _hideDialog = () => this.setState({ visible: false });

  _addContactoExterno = (nombre, telefono, email) =>{
    console.log(nombre + ' ' + telefono + ' ' + email);
    /*this.setState({
      contactosExternos: [ ...this.state.contactosExternos, contactoExterno],
    });
    this._hideDialog();
    console.log(this.state.contactosExternos)*/
  }

  
  
  render() {
    /*
    if (this.props.feedQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading</div>
        </div>
      )
    }*/

    const { visible } = this.state;
    return (
      <View style={styles.container}>
        <View style={{flex:1, alignItems:'center'}}>
          <Text style={{fontSize: 22}}>¿En qué personas de fuera del liceo confías más?</Text>
          <Text style={{ marginTop:10, marginBottom:10}}>Agrega la información de contacto de a lo más cinco personas</Text>
          <Button onPress={this._showDialog} mode='contained' style={{ marginTop:30, marginBottom:10}}>Agregar Contactos</Button>          
        </View>
        <View style={{flex:3, alignItems:'stretch'}}>
          <List.Section>
            <List.Subheader>Contactos Agregados</List.Subheader>
            <Divider/>
            {this.props.data.contactosExternos &&
              this.props.data.contactosExternos.map(contactoExterno => (
                <List.Item key={contactoExterno.id}
                title={contactoExterno.nombre}
                description={contactoExterno.correo}
                left={() => <Avatar.Image size={45} source={require('../../../assets/avatar.png')} />}
              />
            ))}
          </List.Section>  
        </View>
        <Portal>
          <Dialog
             visible={this.state.visible}
             onDismiss={this._hideDialog}>
            
            <Dialog.Title>Agrega a un Contacto</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label='Nombre'
                mode="outlined"
                value={this.state.nombre}
                onChangeText={nombre => this.setState({ nombre })}
                style={styles.input}
              />
              <TextInput
                label='Telefono'
                mode="outlined"
                value={this.state.telefono}
                onChangeText={telefono => this.setState({ telefono })}
                style={styles.input}
              />
              <TextInput
                label='Correo'
                mode="outlined"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                style={styles.input}
              />
              <Button
                title="Agregar"
                mode="contained"
                onPress={ () => this._addContactoExterno(this.state.nombre, this.state.telefono, this.state.email)}
              >
                Agregar Contacto
              </Button>         
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>Cerrar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View style= { styles.containerButtons }>
          <Button
            style={styles.button}
            mode="outlined"
            onPress={ () => this.props.navigation.navigate("LoginScreen") }
          >
            Cancelar
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={ () => this.props.navigation.navigate("PersonalizarInteresesAlumno") }
          >
            Siguiente
          </Button>
        </View>
      </View>


      /*
      <Provider>
        <View style={styles.container}>
          <Text>¿Quienes son tus mejores amigos del liceo?</Text>
          <Text>Selecciona a cinco amigos en orden de amistad</Text>
          <Text>Selecciona a cinco amigos en orden de amistad</Text>
          <Button
            mode="contained"
            onPress={this._showModal}
          >
            Seleccionar Amigos
          </Button>
        </View>
        <View style={styles.portal}>
          <Portal >
            <Modal visible={visible} onDismiss={this._hideModal}>
              <Card>
                <Card.Title title="Card Title" subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="folder" />} />
                <Card.Content>
                  <Title>Card title</Title>
                  {this.props.feedQuery.usuarios &&
                    this.props.feedQuery.usuarios.map(post => (
                    <Text key={post.id}>{post.nombres} {post.apellidos}</Text>
                  ))}
                </Card.Content>
                <Card.Actions>
                  <Button onPress={this._hideModal}>Cancel</Button>
                  <Button onPress={this._hideModal}>Ok</Button>
                </Card.Actions>
              </Card>
            </Modal>
          </Portal>
        </View>
      </Provider>*/
    );
  }
}

const FEED_QUERY = gql`
  query FeedQuery {
    contactosExternos {
      id,
      nombre,
      telefono,
      correo,
    }
  }
`

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    flexDirection: 'column'
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  button: {
    margin: 5
  }
});

export default graphql(FEED_QUERY, {
  name: 'data', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
  },
})(ContactosExternos)
