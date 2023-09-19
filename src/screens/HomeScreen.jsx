import axios from 'axios';
import { useState, useEffect } from 'react';
import { TouchableOpacity, FlatList, SafeAreaView, View, Text, StyleSheet, StatusBar, Image } from 'react-native';

const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#fff'
    },
    card: {
        backgroundColor: '#4DD0FF',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    text: {
        color: '#000',
        fontSize: 18
    },
    logo: {
        width: 100,
        height: 60,
    }
});

const CountryItem = ({ country }) => {
    return (
        <View style={styles.card}>
            <Image style={styles.logo} source={{
                uri: country.flags.png
            }} />
            <Text style={styles.text}>Name: {country.name.common}</Text>
            <Text style={styles.text}>Region: {country.region}</Text>
        </View >
    )
}

const Countries = ({ navigation }) => {
    const [list, setList] = useState([]);
    const [clicked, setClicked] = useState(false);

    const handleClick = (item) => {
        if (!clicked) {
            setClicked(true);
            navigation.navigate('Details', {country: item.name.common, alt: item.altSpellings[0]});
        }
        setClicked(false);
    };

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                setList(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <SafeAreaView style={styles.page}>
            <FlatList data={list} renderItem={({ item }) =>
                <TouchableOpacity onPress={() => handleClick(item)}>
                    <CountryItem country={item} />
                </TouchableOpacity>
            } />
        </SafeAreaView>
    );
};

export default Countries;