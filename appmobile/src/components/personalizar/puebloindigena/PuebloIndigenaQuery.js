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
  const { setPuebloIndigena, puebloIndigena } = props;
  const { data, loading, error, refetch } = useQuery(GET_PUEBLOS_INDIGENAS, 
    {
      onCompleted({ response }) {
        if (data.pueblosIndigenasQuery.length > 0 && puebloIndigena == null) {
          setPuebloIndigena(data.pueblosIndigenasQuery[0]);
        }
      }
    }  
  );

  if (loading) {
    return(
      <View style={ styles.container }>
        <Picker
          mode="dropdown"
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
    <View style={ styles.container }>
      <Picker
        mode="dropdown"
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
  container: {
    backgroundColor: '#F6F6F6',
    height: 50,
    marginBottom: 20,
  },
  picker: {
    fontSize: 16,
    fontFamily: 'niramit-semibold',
    color: '#57457F',
    textAlign: 'center',
  },
  item: {
    fontSize: 16,
    fontFamily: 'niramit-semibold',
    color: '#57457F',
  }
});

export default PuebloIndigenaQuery;