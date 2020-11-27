import React, { useEffect, useState, useContext } from 'react';
import { Picker, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BotoneraSuperior from '../components/botoneraSuperior';
import { ScrollView } from 'react-native-gesture-handler';
import GlobalContext from '../components/context';

import s from '../components/styles'

export default function Home() {
    const navigation = useNavigation();
    const context = useContext(GlobalContext);
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

                <TouchableOpacity style={s.containerBotonHome} onPress={() => navigation.navigate("Días y Horarios de Atención")}>
                    <View style={s.boton}>
                        <Text style={s.textoBoton}>Días y Horarios de Atención</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={s.containerBotonHome} onPress={() => navigation.navigate("Listado Canchas")}>
                    <View style={s.boton}>
                        <Text style={s.textoBoton}>Listado de canchas</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={s.containerBotonHome} onPress={() => navigation.navigate("Listado Reservas")}>
                    <View style={s.boton}>
                        <Text style={s.textoBoton}>Listado de reservas</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

