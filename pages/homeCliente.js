import React, { useEffect, useState, useContext } from 'react';
import { Picker, Text, View, TouchableOpacity, Image } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BotoneraSuperior from '../components/botoneraSuperior';
import { ScrollView } from 'react-native-gesture-handler';
import GlobalContext from '../components/context';

import s from '../components/styles'

export default function Home() {

    const navigation = useNavigation();
    const context = useContext(GlobalContext);
    


    function chequeoReserva() {
        if (context.objetoReserva != false) {
            navigation.navigate("Mi Reserva");
        } else {
            navigation.navigate("Nueva Reserva");
        }
    }


    return (
        <ScrollView style={s.container} >
            <BotoneraSuperior />

            <View style={s.contenedorImagen}>
                <Image
                    style={s.imagenHome}
                    source={{
                        uri: 'https://www.futbolsalou.com/content/imgsxml/panel_destacadocampos/imagen1965.png',
                    }}
                />
            </View>

            <View style={s.botonera}>
                <TouchableOpacity style={s.containerBotonHome} onPress={() => chequeoReserva()}>
                    <View style={s.boton}>
                    {context.objetoReserva === false ?
                    <Text style={s.textoBoton}>Nueva reserva</Text>
                    :
                    <Text style={s.textoBoton}>Mi reserva</Text>
                    }
                        
                    </View>
                </TouchableOpacity>


            </View>

        </ScrollView >
    );
}