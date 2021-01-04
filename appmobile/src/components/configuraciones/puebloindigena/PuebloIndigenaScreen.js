import React, { useState } from 'react'
import { View, StyleSheet } from "react-native";
import { Text, Card } from 'react-native-paper';
import PuebloIndigenaQuery from './PuebloIndigenaQuery';
import AddPuebloIndigenaMutation from './AddPuebloIndigenaMutation';

const PuebloIndigenaScreen = (props) => {

  const [puebloIndigena, setPuebloIndigena] = useState(null);
  const { goTo, puebloI } = props;

  return(
    <View style={ styles.container }>
      <View style={ styles.titleContainer }>
        <Text style={ styles.title }>Grupo de <Text style={ styles.identificacion }>identificación</Text></Text>
      </View>

      <Card style={ styles.card }>
        <View style={ styles.subtitleContainer }>
          <Text style={ styles.subtitle }>¿Perteneces o eres descendiente de alguno de los siguientes pueblos indígenas?</Text>
        </View>

        <Card.Content>
          <PuebloIndigenaQuery puebloI={puebloI} setPuebloIndigena={ setPuebloIndigena } puebloIndigena={ puebloIndigena }/>
          <AddPuebloIndigenaMutation puebloIndigena={ puebloIndigena } goTo={ goTo }/>
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

export default PuebloIndigenaScreen;