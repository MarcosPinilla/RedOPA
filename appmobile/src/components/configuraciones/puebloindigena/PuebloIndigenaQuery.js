import React from 'react';
import gql from 'graphql-tag';
import { View, Picker, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

const GET_PUEBLOS_INDIGENAS = gql`
  query {
    pueblosIndigenasQuery {
      id,
      nombre,
      descripcion,
    }
  }
`;

function PuebloIndigenaQuery (props) {
  const { setPuebloIndigena, puebloIndigena, puebloI } = props;
  const { data, loading, error, refetch } = useQuery(GET_PUEBLOS_INDIGENAS, {
    onCompleted() {
      if (data.pueblosIndigenasQuery.length > 0 && puebloIndigena == null && puebloI ) {
        if (puebloI === '0') {
          setPuebloIndigena(data.pueblosIndigenasQuery[0]);
        } else {
          let puebloIn = data.pueblosIndigenasQuery.find((pi) => pi.id === puebloI);
          setPuebloIndigena(puebloIn);
        }
      }
    }
  });

  if (loading || !puebloIndigena) {
    return(
      <View>
        <Picker
          mode="dialog"
          enabled={ false }
          style={ styles.picker }
        >
          <Picker.Item
            style={ styles.item }
            key="1"
            label="Cargando..."
            value="carga"
          />
        </Picker>
      </View>
    );
  }

  return (
    <View>
      <Picker
        mode="dialog"
        style={ styles.picker }
        selectedValue={puebloIndigena}
        onValueChange={ (itemValue, itemIndex) =>
          setPuebloIndigena(itemValue)
        }
      >
        { data.pueblosIndigenasQuery &&
          data.pueblosIndigenasQuery.map( puebloIndigena => (
            <Picker.Item
              style={ styles.item }
              key={ puebloIndigena.id }
              label={ puebloIndigena.nombre }
              value={ puebloIndigena }
            />
          ))
        }
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    fontSize: 16,
    fontFamily: 'niramit-semibold',
    color: '#57457F',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    fontSize: 16,
    fontFamily: 'niramit-semibold',
    color: '#57457F',
  }
});

export default PuebloIndigenaQuery;