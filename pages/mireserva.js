import React, { useState, useContext } from 'react';
import { Text, View, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import s from '../components/styles';
import BotoneraSuperior from '../components/botoneraSuperior';
import { ScrollView } from 'react-native-gesture-handler';
import GlobalContext from '../components/context';

export default function MiReserva() {
    const navigation = useNavigation();
    const context = useContext(GlobalContext);
    const [respuesta, setRespuesta] = useState('');
    const ip = 'https://secret-shore-39623.herokuapp.com/';
    const [nroCancha, setNroCancha] = useState('' || context.objetoReserva.nroCancha);
    const [dia, setDia] = useState('' || context.objetoReserva.dia);
    const [hora, setHora] = useState('' || context.objetoReserva.hora);


    async function cancelarReserva() {

        const requestOptions = {
            method: "POST",
            headers: new Headers({
                'Authorization': `Bearer ${context.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                usuario: context.usuario,
                reserva: context.objetoReserva,
            })
        }

        await fetch(ip + 'api/reservas/cancelacionReserva/', requestOptions)
            .then((res) => res.json())
            .then((json) => setRespuesta(json))
            .catch(err => {
                console.log("Error: ", err)
            })
        context.cambioDatos(context.usuario, context.token, 'reserva cancelada', context.objetoReserva);
        Alert.alert("Reserva cancelada.")
        navigation.navigate("Home");

    }

    function cancelar() {

        Alert.alert(
            "¿Está seguro que desea cancelar su reserva?",
            "",
            [
                {
                    text: "Cancelar",
                    onPress: console.log("cancelado")
                },
                {
                    text: "Confirmar",
                    onPress: cancelarReserva
                }
            ],
            { cancelable: false })
    };


    return (
        <ScrollView style={s.container} >
            <BotoneraSuperior />
            <View style={s.contenedorSubtitulo}>
                <Text style={s.subtituloAdmin} >Mi reserva</Text>
            </View>
            <View style={s.contenedorImagen}>
                <Image
                    style={s.imagenReserva}
                    source={{
                        uri: 'https://images.vexels.com/media/users/3/132234/isolated/preview/ac198c217df0bbc58195e48afd92de5e-jugador-de-futbol-tiro-pelota-by-vexels.png',
                    }}
                />
            </View>
            <View style={s.contenedorMenuLateral}>
                <View style={s.contenedorListado}>
                    <View>
                        <Text style={s.itemList}>{`Usted reservó la cancha número ${nroCancha} para el día ${dia.split('T')[0]} a las ${hora}:00hs`}</Text>
                    </View>
                </View>
            </View>


            <TouchableOpacity style={s.containerBoton} onPress={() => cancelar()}>
                <View style={s.boton}>
                    <Text style={s.textoBoton}>Cancelar reserva</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>


    );
}



