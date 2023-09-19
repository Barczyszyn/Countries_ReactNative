import { useState } from 'react';
import { SafeAreaView, StatusBar, TouchableOpacity, Text, TextInput, StyleSheet, Alert } from 'react-native';

const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        alignItems: 'strech',
        backgroundColor: '#fff'
    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 15,
        marginHorizontal: 50
    },
    button: {
        borderWidth: 0,
        backgroundColor: '#00BBFF',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 15,
        alignItems: 'center'
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    }
});

const LoginScreen = ({ navigation }) => {
    const [emailValue, setEmailValue] = useState();
    const [pswValue, setPswValue] = useState();

    const onPressButton = () => {
        if (emailValue !== undefined && pswValue !== undefined) {
            if (emailValue.length >= 1 && pswValue.length >= 1) {
                navigation.navigate('Home');
            } else {
                Alert.alert(
                    'Error!',
                    'It is required e-mail and password!',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false },
                );
            }
        } else {
            Alert.alert(
                'Error!',
                'It is required e-mail and password!',
                [
                    { text: 'OK' },
                ],
                { cancelable: false },
            );
        }
    }

    return (
        <SafeAreaView style={styles.page}>
            <TextInput
                style={styles.textInput}
                onChangeText={setEmailValue}
                placeholder='Type your e-mail' keyboardType='email-address'
            />
            <TextInput
                style={styles.textInput}
                onChangeText={setPswValue}
                placeholder='Type your password' secureTextEntry={true}
            />
            <TouchableOpacity
                style={styles.button} onPress={onPressButton}>
                <Text style={styles.btnText}>LOGIN</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default LoginScreen;