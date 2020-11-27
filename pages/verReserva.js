import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import s from '../components/styles';
import BotoneraSuperior from '../components/botoneraSuperior';
import { ScrollView } from 'react-native-gesture-handler';

export default function VerReserva({route}) {

    const navigation = useNavigation();
    const { reserva } = route.params

    return (
        <ScrollView style={s.container} >
            <BotoneraSuperior />
            <Text style={s.subtitulo}>Reserva</Text>

            <View style={s.reserva}>
                <Text style={s.texto}>Cancha: {reserva.nroCancha} </Text>
                <Text style={s.texto}>Dia: {reserva.dia}</Text>
                <Text style={s.texto}>Hora: {reserva.hora}:00hs </Text>
            </View>

            <TouchableOpacity style={s.containerBoton} onPress={() => navigation.navigate('Home')}>
                <View style={s.boton}>
                    <Text style={s.textoBoton}>Volver</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={s.containerBoton} onPress={() => navigation.navigate('Home')}>
                <View style={s.boton}>
                    <Text style={s.textoBoton}>Cancelar Reserva</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
}

