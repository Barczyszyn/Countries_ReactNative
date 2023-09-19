import axios from 'axios';
import { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, FlatList } from 'react-native';

const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#fff'
    },
    title: {
        backgroundColor: '#006DFB',
        marginHorizontal: 20,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    title_text: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '900'
    },
    card: {
        backgroundColor: '#4DD0FF',
        margin: 10,
        marginHorizontal: 60,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    text: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600'
    }
});

const AdItem = ({ ad }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.text}>{ad}</Text>
        </View>
    )
}

const Ad = ({ route }) => {
    const [list, setList] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`https://rawcdn.githack.com/kamikazechaser/administrative-divisions-db/master/api/${route.params?.country}.json`)
            .then(response => {
                setList(response.data);
                setError(false);
            })
            .catch(error => {
                setError(true);
            });
    }, []);

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.title}>
            {error === false ?
                <Text style={styles.title_text}>Administrative Divisions</Text>
                :
                <Text style={styles.title_text}>Administrative divisions not found!</Text>
            }
            </View>
            {error === false ?
                <FlatList data={list} renderItem={({ item }) => <AdItem ad={item} />} />
                :
                ""
            }
        </SafeAreaView>
    );
};

export default Ad;