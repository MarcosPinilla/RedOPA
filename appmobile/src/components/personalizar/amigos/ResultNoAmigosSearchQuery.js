import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { ActivityIndicator } from 'react-native-paper';
import { View, StyleSheet, Text, FlatList } from 'react-native'
import CreateAmigoMutation from './CreateAmigoMutation';

    
const NO_AMIGOS_SEARCH = gql`
    query searchNoAmigos($textSearch: String) {
        searchNoAmigos(textSearch: $textSearch) {
            id,
            alias,
            cuenta {
                nombres,
                apellidos,
                rut,
                fotoUrl
            }
        }
    }
`;

const NoAmigoSearch = (props) => {
    const { textSearch, handleChange, hideDialog } = props;
    
    const { data, loading, error } = useQuery(NO_AMIGOS_SEARCH, {
        fetchPolicy: 'cache-and-network',
        variables: { textSearch: textSearch }
    });

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    
    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorMessage}>Ha ocurrido un error,</Text>
                <Text style={styles.errorMessage}>Por favor intente otra vez</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {(data.searchNoAmigos.length === 0) 
                ? <View style={styles.centerContainer}>
                    <Text style={styles.errorMessage}>No se han encontrado resultados</Text>
                </View>
                : <FlatList
                    data={data.searchNoAmigos}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <CreateAmigoMutation
                            alumno={item}
                            handleChange={handleChange}
                            hideDialog={hideDialog}
                            key={item.id}
                            />
                        );
                    }}
                />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        paddingTop: 10
    },
    centerContainer: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessage: {
        fontSize: 15,
        fontFamily: 'niramit-semibold',
        color: '#57457F'
    }
});


export default NoAmigoSearch;
