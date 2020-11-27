import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, Picker, Alert } from 'react-native';
import { NavigationHelpersContext, useNavigation, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';
import GlobalContext from '../../components/context';

import BotoneraSuperior from '../../components/botoneraSuperior';
import s from '../../components/styles';
import { ScrollView } from 'react-native-gesture-handler';


const AgregarCancha = () => {
    const context = useContext(GlobalContext);
    const [numero, setNumero] = useState("");
    const [precio, setPrecio] = useState("");
    const [tipoElegido, setTipoElegido] = useState([]);
    const [tipos, setTipos] = useState([]);
    const isFocused = useIsFocused();

    const [puedeEnviar, setPuedeEnviar] = useState(false)
    const navigation = useNavigation();
    const ip = 'https://secret-shore-39623.herokuapp.com/';
    // Validacion de boton enviar
    useEffect(() => {

        setPuedeEnviar(numero != "" && tipoElegido != '0' && precio != "")

    }, [tipoElegido, numero, precio])

    async function guardarCancha() {

        if (puedeEnviar) {
            //Conformación de componentes para el fetch
            const requestOptions = {
                method: "POST",
                headers: new Headers({
                    'Authorization': `Bearer ${context.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }),
                body: JSON.stringify({
                    descripcion: tipoElegido,
                    numero: numero,
                    precio: precio
                })
            }

            //Almacenamos el response del fetch
            let response = await fetch(ip + 'api/canchas/agregarCanchas', requestOptions)
                .then((res) => res.json())
                .catch(err => {
                    console.log("Error: ", err)
                })
            console.log(response)
            //Dependiendo el response, mostramos un msj    
            if (response === false) {
                Alert.alert("Error", "La cancha ya existe")
            } else {
                Alert.alert("La cancha se agregó con éxito")
                navigation.navigate('Listado Canchas')
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

    useEffect(() => {
        //adaptar con ip de la compu que ejecute: http://ip:3000/api...
        const requestOptions = {
            method: "GET",
            headers: new Headers({
                'Authorization': `Bearer ${context.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }),
        }
        fetch(ip + 'api/tipocancha/',requestOptions)
            .then((response) => response.json())
            .then((json) => setTipos(json))
            .catch((error) => console.error(error));
    }, [isFocused]);


    return (
        <ScrollView style={s.container}>
            <BotoneraSuperior />
            <View style={s.contenedorSubtitulo}>
                <Text style={s.subtituloAdmin} >Agregar cancha</Text>
            </View>
            <View style={s.contenedorRegistro}>
                <TextInput
                    style={s.input}
                    value={numero}
                    placeholder="Número"
                    onChangeText={(texto) => setNumero(texto)}
                    keyboardType="numeric"
                />
                <TextInput
                    style={s.input}
                    value={precio}
                    placeholder="Precio"
                    onChangeText={(texto) => setPrecio(texto)}
                    keyboardType="numeric"
                />
                <View style={s.contenedorPicker}>
                    <Picker
                        selectedValue={tipoElegido}
                        style={s.picker}
                        onValueChange={(itemValue, itemIndex) => setTipoElegido(itemValue)}
                    >
                        <Picker.Item label="Seleccionar tipo de cancha" value="0" />
                        {tipos.map((item, key) => (
                            <Picker.Item label={item.descripcion} value={item.descripcion} key={key} />)
                        )}
                    </Picker>
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
                        onPress={() => guardarCancha()}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default AgregarCancha;