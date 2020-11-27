import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';

import s from '../../components/styles';
import BotoneraSuperior from '../../components/botoneraSuperior';
import Listado from './scrollViewCanchas';

export default function ScrollViewCanchas() {

    const navigation = useNavigation();

    return (
        <View style={s.container}>
            <BotoneraSuperior />
            <View style={s.contenedorSubtitulo}>
                <Text style={s.subtituloAdmin} >Mis canchas</Text>
                <View style={s.contenedorMas}>
                    <Icon
                        name='plus'
                        size={28}
                        color='#000'
                        style={s.iconoListClaro}
                        onPress={() => navigation.navigate('Agregar Cancha')}
                    />
                </View>
            </View>
            <Listado/>
        </View>
    )

}

