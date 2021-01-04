import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, AsyncStorage } from 'react-native'
import FotoMutation from './FotoMutation'
import AliasFoto from './FotoQuery';
import { Text, Card, Button, Avatar, TextInput} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

const FotoScreen = (props) => {

  const { goTo, user, handleChange, setFotoStorage} = props;

  const [alias, setAlias] = useState(null);

  const _chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 0.5,
      exif: true
    });
    
    let fotoResize = await ImageManipulator.manipulateAsync(result.uri, [
      {resize: { width: 640 }},
    ], {
      base64: true,
    });
    
    let fotoData = '';
    if (fotoResize.uri.match(/.jpg/)) {
      fotoData = 'data:image/jpeg;base64,' + fotoResize.base64;
    } else if (result.uri.match(/.png/)) {
      fotoData = 'data:image/png;base64,' + fotoResize.base64;
    }   

    handleChange('fotoStorage', fotoData)
    handleChange('foto', fotoData);
  };

  return (
    <View style={styles.container}>
      <View style={ styles.titleContainer }>
        <Text style={ styles.title }>Cuéntanos, ¿cómo te gusta que <Text style={ styles.digan }>te digan</Text>?</Text>
      </View>

      <Card style= { styles.card }>

        <Card.Content>
          <AliasFoto 
            alias={alias}
            setAlias={setAlias}
          />
          <View style={ styles.avatarContainer }>
            <Avatar.Image style= { styles.avatarBack } size={230} theme={{ colors: { primary: '#f0ffff' } }}/>
            <Avatar.Image style= { styles.avatar } size={180} theme={{ colors: { primary: '#e4ffff' } }} source={{uri: user.fotoStorage}} />
            <TouchableOpacity style= { styles.avatar2 } onPress={() => _chooseImage()}>
              <Avatar.Image  size={50} theme={{ colors: { primary: '#57457F' } }} source={require('../../../../assets/camera.png')} />
            </TouchableOpacity>
          </View>
          <View style={ styles.subtitleContainer }>
            <Text style={ styles.subtitle }>(¡Psst! Suba una foto tuya, que no se te olvide)</Text>
          </View>
        </Card.Content>
      </Card>

      <View style= { styles.containerButtons }>
        <Button
          style={styles.button}
          onPress={ () => props.goBack() }
        >
          <Text style={ styles.buttonText }>Más tarde</Text>
        </Button>
        <FotoMutation
          goTo={goTo}
          user={user}
          setFotoStorage={setFotoStorage}   
          alias={alias}     
        />
      </View>
    </View>
  )
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
  digan: {
    fontSize: 22,
    fontFamily: 'niramit-bold',
    textAlign: 'center',
  },
  card: {
    borderRadius: 10,
    flex: 6, 
  },
  avatarContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  avatarBack: {
    alignSelf: 'center',
    marginBottom: -215,
  },
  avatar: {
    marginTop: 10,
    alignSelf: 'center',
  },
  avatar2: {
    marginTop: -25,
    marginLeft: 170,
    alignSelf: 'center'
  },
  subtitleContainer: {
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'niramit-regular',
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

export default FotoScreen;