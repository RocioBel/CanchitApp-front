import React, { useState, useEffect, useContext } from 'react';
import { Alert, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Octicons';


import BotoneraSuperior from '../components/botoneraSuperior';
import s from '../components/styles'
import GlobalContext from '../components/context';


//Cuando tengamos el usuario guardado en una variable de entorno, 
//debemos finalizar la codificación de la conexión a la API.
//Actualmente no reconoce bien el id con lo cual no funciona.

const Perfil = ({ guardarUsuario }) => {

    const context = useContext(GlobalContext);
    const [email] = useState(context.usuario.email)
    const [nombre, setNombre] = useState(context.usuario.nombre);
    const [errorNombre, setErrorNombre] = useState('');
    const [apellido, setApellido] = useState(context.usuario.apellido);
    const [errorApellido, setErrorApellido] = useState('');
    const [telefono, setTelefono] = useState(context.usuario.telefono);
    const [errorTelefono, setErrorTelefono] = useState('');
    const [id, setId] = useState(context.usuario._id);

    const [puedeEnviar, setPuedeEnviar] = useState(false)
    const ip = 'https://secret-shore-39623.herokuapp.com/';
    const navigation = useNavigation();


    // Validacion de boton enviar
    useEffect(() => {

        setPuedeEnviar(email.length > 3 && nombre.length > 1 && apellido.length > 1 && telefono != 0 && telefono.length >= 8)

    }, [email, nombre, apellido, telefono])

    async function guardarUsuario() {

        if (puedeEnviar) {

            //Conformación de componentes para el fetch

            const requestOptions = {
                method: "PUT",
                headers: new Headers({
                    'Authorization': `Bearer ${context.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    email: email,
                    nombre: nombre,
                    apellido: apellido,
                    telefono: telefono,
                    admin: false
                })
            }

            //Almacenamos el response del fetch
            let response = await fetch(ip + 'api/usuarios/', requestOptions)
                .then((res) => res.json())
                .catch(err => {
                    console.log("Error: ", err)
                })
            //Dependiendo el response, mostramos un msj    
            if (response === true) {
                Alert.alert("Sus datos se modificaron con éxito.")
                navigation.navigate("Home")
                
            } else {
                Alert.alert("No hubo modificación de datos.")
            }

        } else {
            //Mensaje de error cuando falta algún campo o hay algún campo inválido
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

        const regAlfabetico = /^[a-zA-Z ]+$/
        const regNumerico = /^[0-9]+$/
        switch (tipo) {
            case 'nombre':
                if (dato == "") {
                    setErrorNombre("El campo nombre no puede quedar vacío.");
                    setNombre("");
                } else if (regAlfabetico.test(dato)) {
                    setErrorNombre("")
                    setNombre(dato);
                } else {
                    setErrorNombre("El formato del campo nombre debe ser alfabético.");
                }
                break;
            case 'apellido':
                if (dato == "") {
                    setErrorApellido("El campo apellido nombre no puede quedar vacío.");
                    setApellido("");
                }
                if (regAlfabetico.test(dato)) {
                    setErrorApellido("");
                    setApellido(dato);
                } else {
                    setErrorApellido("El formato del campo apellido debe ser alfabético.");
                }
                break;
        }

    }


    return (
        <ScrollView style={s.container}>
            <BotoneraSuperior />
            <View style={s.contenedorSubtitulo}>
                <Text style={s.subtituloAdmin} >Mi perfil</Text>
            </View>
            <View style={s.contenedorRegistro}>
                <Text style={s.dato}>Email</Text>
                <TextInput
                    style={s.input}
                    editable={false}
                    value={email}
                />
                <Text style={s.dato}>Nombre</Text>
                <TextInput
                    style={s.input}
                    placeholder="Nombre"
                    value={nombre}
                    onChangeText={(text) => validar(text, 'nombre')}
                />
                <Text style={s.validacionInput}>{errorNombre}</Text>
                <Text style={s.dato}>Apellido</Text>
                <TextInput
                    style={s.input}
                    placeholder="Apellido"
                    value={apellido}
                    onChangeText={(text) => validar(text, 'apellido')}
                />
                <Text style={s.validacionInput}>{errorApellido}</Text>
                <Text style={s.dato}>Teléfono</Text>
                <TextInput
                    style={s.input}
                    placeholder="Teléfono"
                    value={telefono}
                    onChangeText={(text) => setTelefono(text)}
                    keyboardType="numeric"
                />
                <Text style={s.validacionInput}>{errorTelefono}</Text>


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
                        onPress={() => guardarUsuario()}
                    />
                </View>

                <TouchableOpacity style={s.containerBoton} onPress={() => navigation.navigate("Cambiar Contraseña")}>
                    <View>
                        <Text style={s.link}>Cambiar contraseña</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

export default Perfil;
