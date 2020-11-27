import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import GlobalContext from '../components/context';
import Spinner from 'react-native-loading-spinner-overlay';

import BotoneraSuperior from '../components/nombreApp';
import s from '../components/styles'

//Falta mejorar mensajes de error en cada input
//Ver si cuando se registra se tiene que loguear automáticamente
export default function AgregarUsuario() {
    const context = useContext(GlobalContext);
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [nombre, setNombre] = useState("");
    const [errorNombre, setErrorNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [errorApellido, setErrorApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [errorTelefono, setErrorTelefono] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [errorContraseña, setErrorContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");
    const [errorConfirmarContraseña, setErrorConfirmarContraseña] = useState("");
    const [loading, setLoading] = useState(false);

    const [puedeEnviar, setPuedeEnviar] = useState(false)
    const navigation = useNavigation();
    const ip = 'https://secret-shore-39623.herokuapp.com/';

    // Validacion de boton enviar
    useEffect(() => {
        setPuedeEnviar(
            email != "" &&
            nombre != "" & 
            apellido != "" &&
            telefono != "" &&
            contraseña != "" && 
            confirmarContraseña != ""
        );
    }, [email, nombre, apellido, telefono, contraseña, confirmarContraseña]);
  
    const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };

    async function guardarUsuario() {
        if (puedeEnviar) {
            //Conformación de componentes para el fetch
            const headers = new Headers();
            headers.append("Content-type", "application/json")
            const requestOptions = {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    email: email,
                    password: contraseña,
                    nombre: nombre,
                    apellido: apellido,
                    telefono: telefono,
                    admin: false,
                    montoADevolver: 0
                })
            }
            //Almacenamos el response del fetch
            let response = await fetch(ip + 'api/usuarios/agregarUsuario', requestOptions)
                .then((res) => res.json())
                .catch(err => {
                    console.log("Error: ", err)
                })
            //Dependiendo el response, mostramos un msj   
            const usuarioPersistido = response.usuarioPersistido;
            const token = response.token;
            if (!usuarioPersistido) {
                setTimeout(() => {
                    Alert.alert("Error", "El mail ya se encuentra registrado.")
                  }, 3010); 
            } else {
                datosLogin(usuarioPersistido, token);
                setTimeout(() => {
                    Alert.alert("Usted se registró con éxito.")
                    navigation.navigate("Home")
                  }, 3010);
            }
            function datosLogin(usuario, token) {
                context.cambioDatos(usuario, token, context.reserva, context.objetoReserva);
            }
        } else {
            //Mensaje de error cuando falta algún campo o hay algún campo inválido
            setTimeout(() => {
                Alert.alert(
                    "Error",
                    "¡Revisar los campos completados!",
                    [{
                        text: "Cancelar",
                        onPress: console.log('Yes Pressed'),
                    }]
                )
              }, 3010); 
        }
    }
    function imprimirMsj(campo){
       return (`El campo ${campo} no puede quedar vacío`)
    }

    function validar(dato, tipo) {

        const regAlfabetico = /^[a-zA-Z]+$/
        const regMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        switch (tipo) {
            case 'email':
                if (dato == "") {
                    setErrorEmail(imprimirMsj('email'));
                    setEmail("");
                } else if (regMail.test(dato)) {
                    setErrorEmail("")
                    setEmail(dato);
                } else {
                    setErrorEmail("El formato del email es inválido.");
                    setEmail("");
                }
                break;
            case 'nombre':
                if (dato == "") {
                    setErrorNombre(imprimirMsj('nombre'));
                    setNombre("");
                } else if (regAlfabetico.test(dato)) {
                    setErrorNombre("")
                    setNombre(dato);
                } else {
                    setErrorNombre("El formato del campo nombre debe ser alfabético.");
                    setNombre("");
                }
                break;
            case 'apellido':
                if (dato == "") {
                    setErrorApellido(imprimirMsj('apellido'));
                    setApellido("");
                } else if (regAlfabetico.test(dato)) {
                    setErrorApellido("");
                    setApellido(dato);
                } else {
                    setErrorApellido("El formato del campo apellido debe ser alfabético.");
                    setApellido("");
                }
                break;
            case 'contraseña':
                if (dato == "") {
                    setErrorContraseña(imprimirMsj('contraseña'))
                    setContraseña("");
                } else if (dato.length < 4 || dato.length > 8) {
                    setErrorContraseña("La contraseña debe tener un mínimo de 4 carateres y un máximo de 8 caracteres.");
                    setContraseña("");
                } else {
                    setErrorContraseña("");
                    setContraseña(dato);
                }
                break;
            case 'confirmacion':
                if (dato == "") {
                    setErrorConfirmarContraseña(imprimirMsj('confirmación de contraseña'))
                    setConfirmarContraseña("");
                } else if (dato !== contraseña) {
                    setErrorConfirmarContraseña("La contraseña no coincide con la ingresada en el campo anterior.")
                    setConfirmarContraseña("");
                } else {
                    setErrorConfirmarContraseña("");
                    setConfirmarContraseña(dato);
                }
                break;
            case 'telefono':
                if (dato == "") {
                    setErrorTelefono(imprimirMsj("teléfono"))
                    setTelefono("");
                } else if (dato < 100000) {
                    setErrorTelefono("Debe ingresar un número de teléfono válido")
                    setTelefono("");
                } else {
                    setErrorTelefono("");
                    setTelefono(dato);
                }
                break;
        }

    }

    return (
        <ScrollView style={s.contenedorRegistro}>
            <BotoneraSuperior />
            <View style={s.containerIngreso}>
                <Spinner
                    visible={loading}
                    textContent={'Loading...'}
                />
                <TextInput
                    style={s.input}
                    placeholder="Email"
                    onChangeText={(text) => validar(text, 'email')}
                    keyboardType="email-address"
                />
                <Text style={s.validacionInput}>{errorEmail}</Text>
                <TextInput
                    style={s.input}
                    placeholder="Nombre"
                    onChangeText={(text) => validar(text, 'nombre')}
                />
                <Text style={s.validacionInput}>{errorNombre}</Text>
                <TextInput
                    style={s.input}
                    placeholder="Apellido"
                    onChangeText={(text) => validar(text, 'apellido')}
                />
                <Text style={s.validacionInput}>{errorApellido}</Text>
                <TextInput
                    style={s.input}
                    placeholder="Teléfono"
                    onChangeText={(text) => validar(text, 'telefono')}
                    keyboardType="phone-pad"
                />
                <Text style={s.validacionInput}>{errorTelefono}</Text>
                <TextInput
                    style={s.input}
                    placeholder="Contraseña"
                    maxLength={8}
                    secureTextEntry={true}
                    onChangeText={(text) => validar(text, 'contraseña')}
                />
                <Text style={s.validacionInput}>{errorContraseña}</Text>
                <TextInput
                    style={s.input}
                    placeholder="Confirmar contraseña"
                    maxLength={8}
                    secureTextEntry={true}
                    onChangeText={(text) => validar(text, 'confirmacion')}
                />
                <Text style={s.validacionInput}>{errorConfirmarContraseña}</Text>
            </View>
            <TouchableOpacity style={s.containerBoton} onPress={() => { guardarUsuario(), startLoading() }}>
                <View style={s.boton}>
                    <Text style={s.textoBoton}>Confirmar</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={s.containerBoton} onPress={() => navigation.goBack()}>
                <View style={s.boton}>
                    <Text style={s.textoBoton}>Cancelar</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}
