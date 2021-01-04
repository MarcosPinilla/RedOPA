import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Portal, Text, Button, Dialog, List, Card, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import NoContactosSearch from './NoContactosSearchQuery';
import ContactosQuery from './ContactosQuery';
import NoContactosQuery from './NoContactosQuery';

const ContactosScreen = (props) => {

  const { goTo, handleChange, showDialog, hideDialog, visible, recargarContactos, nombre, textSearch, setTextSearch } = props;

  return (
    <View style={styles.container}>
      <View style={ styles.titleContainer }>
        <Text style={ styles.title }>¿Quiénes son los <Text style={ styles.funcionarios }>funcionarios de tu liceo</Text> en quiénes más confías?</Text>
      </View>

      <Card style= { styles.card }>
        <View style={ styles.subtitleContainer }>
          <Text style={ styles.subtitle }>Selecciona cinco funcionarios en <Text style={ styles.orden }>orden de confianza</Text></Text>
        </View>

        <Card.Content>
          <Button onPress={showDialog} mode='contained' style={ styles.buscarButton }>
            <Text style={ styles.buscarText }>Buscar funcionario</Text>
          </Button>
          <ScrollView style={ styles.scrollContactos }>
            <ContactosQuery recargarContactos={recargarContactos} handleChange={handleChange}/>
          </ScrollView>

          <Portal>
            <Dialog
                visible={visible}
                onDismiss={hideDialog}>
              <Dialog.Content>
                <TextInput
                  label='Nombre del funcionario'
                  mode="flat"
                  theme={{ colors: { placeholder: '#57457F', text: '#57457F', background: 'transparent', primary: '#57457F'} }}
                  selectionColor='#57457F'
                  underlineColor='#57457F'
                  placeholderTextColor= '#57457F'
                  returnKeyType="search"
                  defaultValue={textSearch}
                  onChangeText={(actual) => setTextSearch(actual)}
                  style={ styles.input }
                />
                <View style={styles.scrollArea}>
                {
                  (nombre != '') 
                  ? <NoContactosSearch handleChange={handleChange} hideDialog={hideDialog} textSearch={textSearch}/>
                  : <NoContactosQuery handleChange={handleChange} hideDialog={hideDialog}/>
                }  
                </View>
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
          onPress={ () => goTo("PersonalizarContactosExternos") }
        >
          <Text style={ styles.buttonText }>Siguiente</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  funcionarios: {
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
    marginHorizontal: 15,
  },
  buscarText: {
    fontFamily: 'nunito-bold',
    fontSize: 22,
    paddingBottom: 3,
  },
  dialog: {
  },
  scrollArea: {
    height: 300,
  },
  scrollContactos: {
    marginTop: 10,
    height: 200,
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

export default ContactosScreen;