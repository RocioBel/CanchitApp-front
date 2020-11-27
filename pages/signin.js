import React , { useEffect, useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import {  Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';
import GlobalContext from '../components/context';
import Spinner from 'react-native-loading-spinner-overlay';

import BotoneraSuperior from '../components/nombreApp';
import s from '../components/styles';
import { ScrollView } from 'react-native-gesture-handler';

export default function SignIn() {
    const context = useContext(GlobalContext);
    const [email, setEmail] = useState('' || context.usuario);
    const [contraseña, setContraseña] = useState('' || context.usuario);
    const [puedeEnviar, setPuedeEnviar] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const ip = 'https://secret-shore-39623.herokuapp.com/';
    const isFocused = useIsFocused();


    useEffect(() => {
        setEmail('');
        setContraseña('');
    }, [isFocused]);

    useEffect(() => {
        setPuedeEnviar(email.length > 3 && contraseña.length >= 4 )
    }, [email, contraseña])

    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2500);
      };

    async function ingresar() {
        if(puedeEnviar){
            const headers = new Headers();

            headers.append("Content-type", "application/json")
            const requestOptions = {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    email: email,
                    password: contraseña,
                })
            }

            let response = await fetch(ip + 'api/usuarios/login', requestOptions)
                .then((res) => res.json())
                .catch(err => {
                    console.log("Error: ", err)
                })
            
            function datosLogin(usuario, token) {
                  context.cambioDatos(usuario, token, context.reserva, context.objetoReserva);
            }

            if(!response) {
                setTimeout(() => {
                    Alert.alert("Error", "Credenciales inválidas.")
                  }, 2500);    
            } else {
                datosLogin(response.usuario, response.token);
                setTimeout(() => {
                    navigation.navigate("Home");
                }, 2500);
            } 
            
        } else {
            setTimeout(() => {
                Alert.alert("Error", "Falta completar algún campo.")
            }, 3000); 
        }
    };

    function registrarme() {
        navigation.navigate("Registrarme");
    };

    return (
        <ScrollView style={s.contenedorSignin} >
            <BotoneraSuperior />
            <View style={s.containerIngreso}>
            <Spinner
                    visible={loading}
                    textContent={'Loading...'}
                />
                <StatusBar style="auto" />
                <View style={s.contenedorRow}>
                    <Icon
                        name='person'
                        size={20}
                        color='#000'
                        style={s.iconoSignin}
                    />
                    <TextInput
                        style={s.box}
                        onChangeText={text => setEmail(text)}
                        value={email}
                        placeholder='Ingresa tu usuario'
                        keyboardType="email-address"
                    />
                </View>
                <View style={s.contenedorRow}>
                    <Icon
                        name='lock'
                        size={20}
                        color='#000'
                        style={s.iconoSignin}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={s.box}
                        onChangeText={text => setContraseña(text)}
                        value={contraseña}
                        placeholder='Ingresa tu contraseña'
                    />
                </View>

                <TouchableOpacity style={s.containerBoton} onPress={() => {ingresar(), startLoading() }}>
                    <View style={s.boton}>
                        <Text style={s.textoBoton}>Ingresar</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={s.containerBoton} onPress={registrarme}>
                    <View>
                        <Text style={s.link}>Registrarme</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
