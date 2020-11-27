import React, { useState, useEffect, useContext } from 'react';
import { Alert, Text, View, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Octicons';
import GlobalContext from '../../components/context';

import BotoneraSuperior from '../../components/botoneraSuperior';
import s from '../../components/styles'

export default function Cancha({ route }) {
    const context = useContext(GlobalContext);
    const { cancha } = route.params
    const [numero] = useState(cancha.numero.toString());
    const [precio, setPrecio] = useState(cancha.precio.toString());
    const [tipoElegido] = useState(cancha.descripcion)
    const isFocused = useIsFocused();

    const [puedeEnviar, setPuedeEnviar] = useState(false)
    const ip = 'https://secret-shore-39623.herokuapp.com/';
    const navigation = useNavigation();

    // Validacion de boton enviar
    useEffect(() => {

        setPuedeEnviar(numero != "" && tipoElegido != '0' && precio != "")

    }, [tipoElegido, numero, precio])

    async function guardarCancha() {

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
                    id: cancha._id,
                    descripcion: tipoElegido,
                    numero: numero,
                    precio: precio,
                })
            }

            //Almacenamos el response del fetch
            let response = await fetch(ip + 'api/canchas/' + cancha.id, requestOptions)
                .then((res) => res.json())
                .catch(err => {
                    console.log("Error: ", err)
                })
            console.log(response)
            //Dependiendo el response, mostramos un msj    
            if (!response) {
                Alert.alert('Error',"No se pudo modificar.")
            } else {
                Alert.alert("Los datos se modificaron con éxito.")
                navigation.navigate("Listado Canchas")
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


    return (
        <ScrollView style={s.container}>
            <BotoneraSuperior />
            <View style={s.contenedorSubtitulo}>
                <Text style={s.subtituloAdmin} >Editar cancha</Text>
            </View>
            <View style={s.containerIngreso}>
                <Text style={s.dato}>Número de cancha</Text>
                <TextInput
                    style={s.input}
                    editable={false}
                    value={numero}
                />
                <Text style={s.dato}>Tipo de Cancha</Text>
                <TextInput
                    style={s.input}
                    editable={false}
                    value={tipoElegido}
                />
                <Text style={s.dato}>Precio de reserva</Text>
                <TextInput
                    style={s.input}
                    value={precio}
                    placeholder="Precio"
                    onChangeText={(texto) => setPrecio(texto)}
                    keyboardType="numeric"
                />

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

