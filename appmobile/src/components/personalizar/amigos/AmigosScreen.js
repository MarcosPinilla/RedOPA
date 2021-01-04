import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Portal, Text, Button, Dialog, List, Card, TextInput } from 'react-native-paper';
import NoAmigos from './NoAmigosQuery';
import { ScrollView } from 'react-native-gesture-handler';
import AmigosQuery from './AmigosQuery';
import ResultNoAmigosSearchQuery from './ResultNoAmigosSearchQuery';

 

const AmigosScreen = (props) => {

  const { goTo, handleChange, showDialog, hideDialog, visible, recargarAmigos, nombre, handleChangeTextSearch, textSearch } = props;

  /*
    componentWillReceiveProps(nextProps) {
      if (this.props.location.key !== nextProps.location.key) {
        this.props.feedQuery.refetch()
      }
    }
  */

  return (
    <View style={styles.container}>
      <View style={ styles.titleContainer }>
        <Text style={ styles.title }>¿Quiénes son tus <Text style={ styles.mejores }>mejores amigos</Text> del liceo?</Text>
      </View>

      <Card style= { styles.card }>
        <View style={ styles.subtitleContainer }>
          <Text style={ styles.subtitle }>Selecciona seee amigos en <Text style={ styles.orden }>orden de amistad</Text></Text>
        </View>

        <Card.Content style={ styles.friendsContainer }>
          <Button onPress={showDialog} mode='contained' style={ styles.buscarButton }>
            <Text style={styles.buscarText}>Buscar amigo</Text>
          </Button>
          <ScrollView style={ styles.scrollAmigos}>
            <AmigosQuery recargarAmigos={recargarAmigos} handleChange={handleChange}/>
          </ScrollView>

          <Portal >
            <Dialog
                visible={visible}
                onDismiss={hideDialog}>
              <Dialog.Content>
                <TextInput
                  label='Nombre de tu amigo'
                  mode="flat"
                  theme={{ colors: { placeholder: '#57457F', text: '#57457F', background: 'transparent', primary: '#57457F'} }}
                  selectionColor='#57457F'
                  underlineColor='#57457F'
                  placeholderTextColor= '#57457F'
                  returnKeyType="search"
                  defaultValue={textSearch}
                  onChangeText={(actual) => handleChangeTextSearch(actual)}
                />
                {((nombre?.length ?? 0) === 0) 
                  ? <NoAmigos
                    handleChange={handleChange} 
                    hideDialog={hideDialog} 
                    visible={visible} 
                  /> 
                  : <ResultNoAmigosSearchQuery
                    textSearch={nombre}
                    handleChange={handleChange} 
                    hideDialog={hideDialog} 
                    visible={visible}
                  />
                } 
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}><Text style={ styles.buttonText }>Cerrar</Text></Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          
        </Card.Content>
      </Card>

      <View style= { styles.containerButtons }>
        <Button
          style={styles.button}
          onPress={ () => goTo("LoginScreen") }
        >
          <Text style={ styles.buttonText }>Cancelar</Text>
        </Button>
        <Button
          style={styles.button}
          onPress={ () => goTo("PersonalizarFuncionarios") }
        >
          <Text style={ styles.buttonText }>Siguiente</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  friendsContainer: {
    flex: 1,
  },  
  container: {
    padding: 25,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F6F6F6',
  },
  titleContainer: {
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  title: {
    fontSize: 22,
    fontFamily: 'niramit-regular',
    textAlign: 'center',
  },
  mejores: {
    fontSize: 22,
    fontFamily: 'niramit-bold',
    textAlign: 'center',
  },
  card: {
    borderRadius: 10,
    flex: 6, 
    paddingTop: 25,
    marginTop: 10,
  },
  subtitleContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'niramit-regular',
  },
  orden: {
    fontSize: 12,
    fontFamily: 'niramit-bold',
  },
  buscarButton: {
    borderRadius: 25,
    backgroundColor: '#B3FFFD',
    height: 50,
    marginHorizontal: 30,
    justifyContent: 'center'
  },
  buscarText: {
    fontFamily: 'nunito-bold',
    fontSize: 22,
    paddingBottom: 3,
  },
  scrollArea: {
    height: 300,
  },
  scrollAmigos: {
    marginTop: 10,
    height: 170,
  },
  containerButtons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'niramit-semibold',
  },
});

export default AmigosScreen;