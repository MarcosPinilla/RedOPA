import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Portal, Text, Button, Dialog, List, Card, TextInput} from 'react-native-paper';
import InteresesAlumnoQuery from './InteresesAlumnoQuery';
import NoInteresesQuery from './NoInteresesQuery';
import { ScrollView } from 'react-native-gesture-handler';

const InteresesAlumnoScreen = (props) => {

  const { goTo, handleChange, showDialog, hideDialog, visible, recargarInteresesAlumno } = props;

  return (
    <View style={styles.container}>
      <View style={ styles.titleContainer }>
        <Text style={ styles.title }>¿Cuáles son los <Text style={ styles.temas }>temas</Text> que más te interesan?</Text>
      </View>

      <Card style= { styles.card }>
        <View style={ styles.subtitleContainer }>
          <Text style={ styles.subtitle }>Selecciona tus <Text style={ styles.intereses }>intereses</Text> (hobbies, deportes, música, etc) para agregarlos a una lista.</Text>
        </View>

        <Card.Content>
          <Button onPress={showDialog} mode='contained' style={ styles.buscarButton }>
            <Text style={ styles.buscarText }>Buscar intereses</Text>
          </Button>

          <Portal>
            <Dialog
                visible={visible}
                onDismiss={hideDialog} 
                style={ styles.dialog }>
              <Dialog.Content>
                <TextInput
                  label='Escribe un interés'
                  mode="flat"
                  theme={{ colors: { placeholder: '#57457F', text: '#57457F', background: 'transparent', primary: '#57457F'} }}
                  selectionColor='#57457F'
                  underlineColor='#57457F'
                  placeholderTextColor= '#57457F'
                  returnKeyType="next"
                  keyboardType="email-address"
                  onChangeText={(access) => handleChange("access", access)}
                  inlineImageLeft= 'user'
                />
                <Dialog.ScrollArea style={ styles.scrollArea }>
                  <ScrollView>
                    <List.Section>
                      <NoInteresesQuery handleChange={handleChange} hideDialog={hideDialog} visible={visible}/>
                    </List.Section>  
                  </ScrollView>
                </Dialog.ScrollArea>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}><Text style={ styles.buttonText }>Cerrar</Text></Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          <ScrollView style={ styles.scrollIntereses }>
            <InteresesAlumnoQuery recargarInteresesAlumno={recargarInteresesAlumno} handleChange={handleChange}/>
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
          onPress={ () => goTo("ConfirmarPersonalizacion") }
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
  temas: {
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
  intereses: {
    fontSize: 12,
    fontFamily: 'niramit-bold',
  },
  buscarButton: {
    borderRadius: 25,
    backgroundColor: '#B3FFFD',
    height: 50,
    marginHorizontal: 30,
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
  scrollIntereses: {
    marginTop: 10,
    height: 230,
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

export default InteresesAlumnoScreen;