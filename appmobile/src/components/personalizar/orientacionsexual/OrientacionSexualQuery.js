import React from 'react';
import gql from 'graphql-tag';
import { View, Picker, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

const GET_ORIENTACIONES_SEXUALES = gql`
  query {
    orientacionesSexualesQuery {
      id,
      nombre,
      descripcion,
    }
  }
`;

function OrientacionSexualQuery (props) {
  const { setOrientacionSexual, orientacionSexual } = props;
  const { data, loading, error, refetch } = useQuery(GET_ORIENTACIONES_SEXUALES, {
    onCompleted() {
      if (data.orientacionesSexualesQuery?.length > 0 && orientacionSexual == null) {
        setOrientacionSexual(data.orientacionesSexualesQuery[0]);
      }
    }
  });

  if (loading) {
    return(
      <View style={ styles.container }>
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
    <View style={ styles.container }>
      <Picker
        mode="dialog"
        style={ styles.picker }
        selectedValue={orientacionSexual}
        onValueChange={ (itemValue, itemIndex) =>
          setOrientacionSexual(itemValue)
        }
      >
        { data.orientacionesSexualesQuery &&
          data.orientacionesSexualesQuery.map( orientacionSexual => (
            <Picker.Item
              style={ styles.item }
              key={ orientacionSexual.id }
              label={ orientacionSexual.nombre }
              value={ orientacionSexual }
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

export default OrientacionSexualQuery;