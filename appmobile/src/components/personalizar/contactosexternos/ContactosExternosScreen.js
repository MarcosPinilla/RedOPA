import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Portal, Text, Button, Dialog, TextInput, Card } from 'react-native-paper';
import ContactosExternosQuery from './ContactosExternosQuery';
import CreateContactoExternoMutation from './CreateContactoExternoMutation';
import { ScrollView } from 'react-native-gesture-handler';

const ContactosExternosScreen = (props) => {

  const { goTo, handleChange, showDialog, hideDialog, visible, recargarContactosExternos, contactoExterno } = props;

  return (
    <View style={styles.container}>
      <View style={ styles.titleContainer }>
        <Text style={ styles.title }>¿Quiénes son las <Text style={ styles.personas }>personas fuera del liceo</Text> en quiénes más confías?</Text>
      </View>

      <Card style= { styles.card }>
        <View style={ styles.subtitleContainer }>
          <Text style={ styles.subtitle }>Necesitamos sus nombres, <Text style={ styles.telefono }>número de teléfono</Text> y el vínculo que tienes con la persona.</Text>
        </View>

        <Card.Content>
          <Button onPress={showDialog} mode='contained' style={ styles.agregarButton }>
            <Text style={ styles.agregarText }>Agregar contacto</Text>
          </Button>

          <Portal>
            <Dialog
                visible={visible}
                onDismiss={hideDialog} 
                style={ styles.dialog }>
              <Dialog.Content>
                <TextInput
                  label='Nombre'
                  mode="flat"
                  theme={{ colors: { placeholder: '#57457F', text: '#57457F', background: 'transparent', primary: '#57457F'} }}
                  selectionColor='#57457F'
                  underlineColor='#57457F'
                  placeholderTextColor= '#57457F'
                  value={contactoExterno.nombre}
                  returnKeyType="next"
                  keyboardType="default"
                  onSubmitEditing={() => this.telefonoInput.focus()}
                  onChangeText={(nombre) => handleChange("nombre", nombre)}
                  inlineImageLeft= 'user'
                />
                <TextInput
                  label='Teléfono'
                  mode="flat"
                  theme={{ colors: { placeholder: '#57457F', text: '#57457F', background: 'transparent', primary: '#57457F'} }}
                  selectionColor='#57457F'
                  underlineColor='#57457F'
                  placeholderTextColor= '#57457F'
                  returnKeyType="next"
                  keyboardType="number-pad"
                  value={contactoExterno.telefono}
                  ref={(input) => this.telefonoInput = input}
                  onSubmitEditing={() => this.correoInput.focus()}
                  onChangeText={(telefono) => handleChange("telefono", telefono)}
                  inlineImageLeft= 'user'
                />
                <TextInput
                  label='Vínculo'
                  mode="flat"
                  theme={{ colors: { placeholder: '#57457F', text: '#57457F', background: 'transparent', primary: '#57457F'} }}
                  selectionColor='#57457F'
                  underlineColor='#57457F'
                  placeholderTextColor= '#57457F'
                  value={contactoExterno.correo}
                  returnKeyType="next"
                  keyboardType="default"
                  ref={(input) => this.correoInput = input}
                  onChangeText={(correo) => handleChange("correo", correo)}
                  inlineImageLeft= 'user'
                />
              </Dialog.Content>
              <View style= { styles.containerButtons }>
                <Button
                  style={styles.button}
                  onPress={hideDialog}
                >
                  <Text style={ styles.buttonText }>Cancelar</Text>
                </Button>
                <CreateContactoExternoMutation handleChange={handleChange} hideDialog={hideDialog} contactoExterno={contactoExterno}/>
              </View>
            </Dialog>
          </Portal>

          <ScrollView style={ styles.scrollContactosExternos}>
            <ContactosExternosQuery recargarContactosExternos={recargarContactosExternos} handleChange={handleChange}/>
          </ScrollView>
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
          onPress={ () => goTo("PersonalizarInteresesAlumno") }
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
  personas: {
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
  telefono: {
    fontSize: 12,
    fontFamily: 'niramit-bold',
  },
  agregarButton: {
    borderRadius: 25,
    backgroundColor: '#B3FFFD',
    height: 50,
    marginHorizontal: 20,
  },
  agregarText: {
    fontFamily: 'nunito-bold',
    fontSize: 22,
    paddingBottom: 3,
  },
  dialog: {
  },
  scrollContactosExternos: {
    marginTop: 10,
    height: 170,
  },
  containerButtons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'niramit-semibold',
  },
});

export default ContactosExternosScreen;