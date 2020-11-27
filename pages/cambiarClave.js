import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useNavigation, StackActions, useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Octicons';
import GlobalContext from '../components/context';

import BotoneraSuperior from '../components/botoneraSuperior';
import s from '../components/styles'

//Falta método en el back para hacer el cambio de clave

const cambiarClave = ({ cambiarClave }) => {

    const context = useContext(GlobalContext);
    const [email, setEmail] = useState(context.usuario.email);
    const [password, setPassword] = useState('');
    const [nuevapassword, setNuevaPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorNuevaPassword, setErrorNuevaPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const popAction = StackActions.popToTop();
    const isFocused = useIsFocused();

    const [puedeEnviar, setPuedeEnviar] = useState(false)

    const navigation = useNavigation();
    const ip = 'https://secret-shore-39623.herokuapp.com/';

    useEffect(() => {

        setPassword('');
        setNuevaPassword('');
        setConfirmPassword('');

    }, [isFocused])

    // Validacion de boton enviar
    useEffect(() => {

        setPuedeEnviar((password.length >= 4) && (nuevapassword.length >= 4) && (confirmPassword == nuevapassword) && (nuevapassword != password))

    }, [password, nuevapassword, confirmPassword])

    async function modificarClave() {
        if (puedeEnviar) {
            //Conformación de componentes para el fetch
            console.log(nuevapassword)
            const requestOptions = {
                method: "PUT",
                headers: new Headers({
                    'Authorization': `Bearer ${context.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }),
                body: JSON.stringify({
                    email: email,
                    password: password,
                    nuevaPassword: nuevapassword,
                })
            }

            //Almacenamos el response del fetch
            let response = await fetch(ip + 'api/usuarios/modificarContrasena/', requestOptions)
                .then((res) => res.json())
                .catch(err => {
                    console.log("Error: ", err)
                })
            //Dependiendo el response, mostramos un msj    
            if (response === "Contraseña incorrecta") {
                Alert.alert("Error", "La contraseña actual es errónea");
            } else {
                Alert.alert("Contraseña modificada con éxito");
                navigation.dispatch(popAction);
                navigation.navigate("Home");
            } 
        }else {
            Alert.alert(
                "Error",
                "¡Revisar los campos completados!",
                [{
                    text: "Cancelar",
                    onPress: console.log('Yes Pressed'),
                }]
            )
        }
    }

    function validar(dato, tipo) {

        switch (tipo) {
            case 'Contraseña Actual':
                if (dato == "") {
                    setErrorPassword("El campo contraseña no puede quedar vacío.");
                    setPassword("");
                } else if (dato.length < 4 || dato.length > 8) {
                    setErrorPassword("La contraseña debe tener un mínimo de 4 carateres y un máximo de 8 caracteres.");
                    setPassword("");
                } else {
                    setErrorPassword("");
                    setPassword(dato);
                }
                break;
            case 'Contraseña Nueva':
                if (dato == "") {
                    setErrorNuevaPassword("El campo contraseña no puede quedar vacío.")
                    setNuevaPassword("");
                } else if (dato.length < 4 || dato.length > 8) {
                    setErrorNuevaPassword("La contraseña debe tener un mínimo de 4 carateres y un máximo de 8 caracteres.");
                    setNuevaPassword("");
                } else {
                    setErrorNuevaPassword("");
                    setNuevaPassword(dato);
                }
                break;
            case 'Confirmar Contraseña':
                if (dato == "") {
                    setErrorConfirmPassword("El campo de confirmación de contraseña no puede quedar vacío.")
                    setConfirmPassword("");
                } else if (dato !== nuevapassword) {
                    setErrorConfirmPassword("La contraseña no coincide con la ingresada en el campo anterior.")
                    setConfirmPassword("");
                } else {
                    setErrorConfirmPassword("");
                    setConfirmPassword(dato);
                }
                break;
        }

    }


    return (
        <ScrollView style={s.container}>
            <BotoneraSuperior />
            <View style={s.contenedorSubtitulo}>
                <Text style={s.subtituloAdmin} >Cambiar contraseña</Text>
            </View>
            <View style={s.containerIngreso}>

                <TextInput
                    style={s.input}
                    placeholder="Contraseña actual"
                    secureTextEntry={true}
                    onChangeText={(text) => validar(text, 'Contraseña Actual')}
                    maxLength={8}
                />
                <Text style={s.validacionInput}>{errorPassword}</Text>
                <TextInput
                    style={s.input}
                    placeholder="Nueva contraseña"
                    secureTextEntry={true}
                    onChangeText={(text) => validar(text, 'Contraseña Nueva')}
                    maxLength={8}
                />
                <Text style={s.validacionInput}>{errorNuevaPassword}</Text>
                <TextInput
                    style={s.input}
                    placeholder="Confirmar nueva contraseña"
                    secureTextEntry={true}
                    onChangeText={(text) => validar(text, 'Confirmar Contraseña')}
                    maxLength={8}
                />
                <Text style={s.validacionInput}>{errorConfirmPassword}</Text>
            </View>


            <View style={s.botoneraInferior}>
                <Icon
                    name='x'
                    size={40}
                    color='#000'
                    style={s.iconoDerecho}
                    onPress={() => navigation.goBack()}
                />
                <Icon
                    name='check'
                    size={40}
                    color='#000'
                    style={s.iconoIzquierdo}
                    onPress={modificarClave}
                />
            </View>

        </ScrollView>
    )
}

export default cambiarClave;