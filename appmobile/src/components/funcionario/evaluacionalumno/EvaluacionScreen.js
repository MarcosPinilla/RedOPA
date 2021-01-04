import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, TextInput} from 'react-native-paper'
import AlumnosQuery from './AlumnosQuery';
import AlumnosSearchQuery from './AlumnosSearchQuery';

const EvaluacionScreen = (props) => {

  const { goTo, handleChange, nombre, textSearch } = props;

  return (
    <View style={styles.background}>
      <Text style={styles.titleText}>Lista de Alumnos</Text>
      <View style={styles.container}>
        <TextInput
          label='Buscar'
          mode="flat"
          theme={{ colors: { placeholder: '#57457F', text: '#57457F', background: 'transparent', primary: '#57457F'} }}
          selectionColor='#57457F'
          underlineColor='#57457F'
          placeholderTextColor= '#57457F'
          returnKeyType="search"
          defaultValue={textSearch}
          onChangeText={(actual) => handleChange(actual)}
          style={ styles.input }
        /> 
        {
          (nombre != '')
          ? <AlumnosSearchQuery goTo={goTo} textSearch={textSearch}/>
          : <AlumnosQuery goTo={goTo} handleChange={handleChange}/>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    marginHorizontal: 25,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 25, 
    backgroundColor: '#ffffff',
  },
  background: {
    flex: 1,
    backgroundColor: '#F6F6F6'
  },
  titleText : {
    fontFamily: 'niramit-regular',
    color: '#57457F',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 25
  },
  text :{
    fontFamily: 'niramit-regular',
    color: '#57457F',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 25
  },
  input: {
    marginHorizontal: 20,
    marginBottom: 5,
  },
});

export default EvaluacionScreen;
