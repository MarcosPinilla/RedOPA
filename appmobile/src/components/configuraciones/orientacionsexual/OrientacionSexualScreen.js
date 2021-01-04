import React, { useState } from 'react'
import { View, StyleSheet } from "react-native";
import { Text, Card } from 'react-native-paper';
import OrientacionSexualQuery from './OrientacionSexualQuery';
import AddOrientacionSexualMutation from './AddOrientacionSexualMutation';

const OrientacionSexualScreen = (props) => {

  const { goTo, orientation} = props;
  const [orientacionSexual, setOrientacionSexual] = useState(null);
  
  return(
    <View style={ styles.container }>
      <View style={ styles.titleContainer }>
        <Text style={ styles.title }>Orientación <Text style={ styles.identificacion }>sexual</Text></Text>
      </View>

      <Card style={ styles.card }>
        <View style={ styles.subtitleContainer }>
          <Text style={ styles.subtitle }>En cuanto a tu orientación sexual, ¿cómo te identificas?</Text>
        </View>

        <Card.Content>
          <OrientacionSexualQuery orientation={orientation} setOrientacionSexual={setOrientacionSexual} orientacionSexual={orientacionSexual}/>
          <AddOrientacionSexualMutation orientacionSexual={orientacionSexual} goTo={goTo}/>
        </Card.Content>
      </Card>
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
  identificacion: {
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
    fontSize: 16,
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

export default OrientacionSexualScreen;