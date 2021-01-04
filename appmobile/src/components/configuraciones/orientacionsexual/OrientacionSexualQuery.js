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
  const { setOrientacionSexual, orientacionSexual, orientation } = props;
  const { data, loading, error, refetch } = useQuery(GET_ORIENTACIONES_SEXUALES, {
    onCompleted() {
      if (data.orientacionesSexualesQuery.length > 0 && orientacionSexual == null && orientation ) {
        if (orientation === '0') {
          setOrientacionSexual(data.orientacionesSexualesQuery[0]);
        } else {
          let orientationS = data.orientacionesSexualesQuery.find((os) => os.id === orientation);
          setOrientacionSexual(orientationS);
        }
      }
    }
  });

  if (loading || !orientacionSexual) {
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

export default OrientacionSexualQuery;