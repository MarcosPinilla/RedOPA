import React from 'react';
import gql from 'graphql-tag';
import { View, Picker, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

const GET_IDENTIDADES_GENERO = gql`
  query {
    identidadesGeneroQuery {
      id,
      nombre,
      descripcion,
    }
  }
`;

function IdentidadGeneroQuery (props) {
  const { setIdentidadGenero, identidadGenero } = props;
  const { data, loading, error, refetch } = useQuery(GET_IDENTIDADES_GENERO, {
    onCompleted() {
      if (data.identidadesGeneroQuery?.length > 0 && identidadGenero == null) {
        setIdentidadGenero(data.identidadesGeneroQuery[0]);
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
        selectedValue={identidadGenero}
        onValueChange={ (itemValue, itemIndex) =>
          setIdentidadGenero(itemValue)
        }
      >
        { data.identidadesGeneroQuery &&
          data.identidadesGeneroQuery.map( identidadGenero => (
            <Picker.Item
              style={ styles.item }
              key={ identidadGenero.id }
              label={ identidadGenero.nombre }
              value={ identidadGenero }
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

export default IdentidadGeneroQuery;