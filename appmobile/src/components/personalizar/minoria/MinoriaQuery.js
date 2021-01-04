import React from 'react';
import gql from 'graphql-tag';
import { View, Picker, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

const GET_MINORIAS = gql`
  query {
    minoriasQuery {
      id,
      nombre,
      descripcion
    }
  }
`;

function MinoriasQuery (props) {
  const { handleChange, minoria } = props;
  const { data, loading, error, refetch } = useQuery(GET_MINORIAS);

  if (loading) {
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
        selectedValue={minoria}
        onValueChange={(itemValue, itemIndex) => 
          handleChange('minoria', itemValue)
        }
      >
        {data.minoriasQuery &&
          data.minoriasQuery.map(minoria=> (
            <Picker.Item
              style={ styles.item }
              key={minoria.id}
              label={minoria.nombre}
              value={minoria}
            />
      ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  picker: {
    fontSize: 16,
    fontFamily: 'niramit-semibold',
    color: '#57457F',
    marginBottom: 20,
    textAlign: 'center'
  },
  item: {
    fontSize: 16,
    fontFamily: 'niramit-semibold',
    color: '#57457F'
  }
})

export default MinoriasQuery;