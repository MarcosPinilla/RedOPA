import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Modal, Portal, Text, Button, Provider, Divider, Card, Title, Paragraph, Avatar , Dialog, List} from 'react-native-paper';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Intereses extends Component {

  /*
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.feedQuery.refetch()
    }
  }*/

  state = {
    visible: false,
    intereses: []
  };


  _showDialog = () => this.setState({ visible: true });
  _hideDialog = () => this.setState({ visible: false });

  _addInteres = (interes) =>{
    console.log(interes);
    this.setState({
      intereses: [ ...this.state.intereses, interes],
    });
    this._hideDialog();
    console.log(this.state.intereses)
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
          <Text style={{fontSize: 22}}>¿Cuáles son los intereses con los que más te identificas?</Text>
          <Text style={{ marginTop:10, marginBottom:10}}>Selecciona cinco intereses</Text>
          <Button onPress={this._showDialog} mode='contained' style={{ marginTop:10, marginBottom:10}}>Seleccionar Intereses</Button>          
        </View>
        <View style={{flex:3, alignItems:'stretch'}}>
          <List.Section>
            <List.Subheader>Intereses Seleccionados</List.Subheader>
            <Divider/>
            {this.state.intereses &&
              this.state.intereses.map(interes => (
                <List.Item key={interes.id}
                title={interes.nombre}
                description={interes.descripcion}
                left={() => <Avatar.Image size={45} source={require('../../../assets/avatar.png')} />}
              />
            ))}
          </List.Section>  
        </View>
        <Portal>
          <Dialog
             visible={this.state.visible}
             onDismiss={this._hideDialog}>
            <Dialog.Title>Busca a un Interés</Dialog.Title>
            <Dialog.Content>
              <List.Section>
                <List.Subheader>Resultados</List.Subheader>
                {this.props.data.intereses &&
                  this.props.data.intereses.map(interes => (
                    <List.Item key={interes.id}
                    title={interes.nombre}
                    description={interes.descripcion}
                    left={() => <Avatar.Image size={45} source={require('../../../assets/avatar.png')} />}
                    onPress={() => this._addInteres(Interes)}
                  />
                ))}
                
              </List.Section>  
              
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
            onPress={ () => this.props.navigation.navigate("AppDrawer") }
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
    usuarios {
      id,
      nombres,
      apellidos,
      rut,
      institucion{
        nombre,
        rut,
        direccion
      }
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
})(Intereses)
