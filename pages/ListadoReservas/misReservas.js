import React from 'react';
import { Text, View } from 'react-native';

import s from '../../components/styles';
import BotoneraSuperior from '../../components/botoneraSuperior';
import Listado from './scrollViewReservas';

export default function ScrollViewCanchas() {
    return (
        <View style={s.container}>
            <BotoneraSuperior />
            <View style={s.contenedorSubtitulo}>
                <Text style={s.subtituloAdmin} >Mis reservas</Text>
            </View>
            <Listado/>
        </View>
    )

}

