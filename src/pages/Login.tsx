import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import globalStyles, { colors } from '../styles';
import { auth } from '../auth';

export default function Login() {

    const [emailText, setEmailText] = React.useState<string>();
    const [passwordText, setPasswordText] = React.useState<string>();

    const navigation = useNavigation();

    async function loginApplication() {
        await axios.post('http://joaogsdc-products-list-com-br.umbler.net/auth', {
            email: emailText,
            password: passwordText
        })
            .then(response => auth.token = response.data.token)
            .catch(error => auth.token = '');
    }

    function handleNavigateToApplication(): void {

        loginApplication();

        if (auth.token === '') {
            return;
        }

        navigation.navigate('ProductsCategory');
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: colors.themeColor, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: colors.white, fontSize: 36, marginBottom: 15 }}>GRFood</Text>
                <View>
                    <View>
                        <Text style={{ color: colors.white, fontSize: 24 }}>E-mail</Text>
                        <TextInput value={emailText} style={globalStyles.input} onChangeText={text => setEmailText(text)} />
                    </View>

                    <View>
                        <Text style={{ color: colors.white, fontSize: 24 }}>Senha</Text>
                        <TextInput secureTextEntry={true} value={passwordText} style={globalStyles.input} onChangeText={text => setPasswordText(text)} />
                    </View>
                </View>

                <TouchableOpacity style={globalStyles.button} onPress={handleNavigateToApplication}><Text style={{ color: colors.white }}>Entrar</Text></TouchableOpacity>
            </View>
        </>
    );
}
