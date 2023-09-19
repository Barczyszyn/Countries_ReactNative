import axios from 'axios';
import { useState, useEffect } from 'react';
import { TouchableOpacity, SafeAreaView, View, Text, StyleSheet, StatusBar, Image } from 'react-native';

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
    bold: {
        color: '#000',
        fontSize: 22,
        marginTop: 15,
        fontWeight: 'bold'
    },
    normal: {
        color: '#000',
        fontSize: 22,
        marginTop: 15,
        fontWeight: 'normal'
    },
    logo: {
        width: 200,
        height: 120,
    },
    button: {
        borderWidth: 0,
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
        marginTop: 15,
        width: 150,
        alignItems: 'center'
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    }
});

const Country = ({ navigation, route }) => {
    const [flag, setFlag] = useState();
    const [name, setName] = useState();
    const [region, setRegion] = useState();
    const [sub, setSub] = useState();
    const [population, setPopulation] = useState();
    const [area, setArea] = useState();
    const [capital, setCapital] = useState();
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        if (!clicked) {
            setClicked(true);
            navigation.navigate('Ad', { country: route.params?.alt });
        }
        setClicked(false);
    };

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${route.params?.country}`)
            .then(response => {
                setFlag(response.data[0].flags.png);
                setName(response.data[0].name.official);
                setRegion(response.data[0].region);
                setSub(response.data[0].subregion);
                setArea(response.data[0].area);
                setPopulation(response.data[0].population);
                setCapital(response.data[0].capital[0]);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.card}>
                <Image style={styles.logo} source={{
                    uri: flag
                }} />
                <View>
                    <Text style={styles.bold}>Name:
                        <Text style={styles.normal}> {name}</Text>
                    </Text>
                    <Text style={styles.bold}>Region:
                        <Text style={styles.normal}> {region}</Text>
                    </Text>
                    <Text style={styles.bold}>Subregion:
                        <Text style={styles.normal}> {sub}</Text>
                    </Text>
                    <Text style={styles.bold}>Area:
                        <Text style={styles.normal}> {area} km²</Text>
                    </Text>
                    <Text style={styles.bold}>Population:
                        <Text style={styles.normal}> {population} inhabitants</Text>
                    </Text>
                    <Text style={styles.bold}>Capital:
                        <Text style={styles.normal}> {capital}</Text>
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button} onPress={() => handleClick()}>
                    <Text style={styles.btnText}>Administrative</Text>
                    <Text style={styles.btnText}>Divisions</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Country;