import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';

import s from './styles'

export default function IconoUser(){

    const navigation = useNavigation(); 

    return (
        <View>
            <Icon 
                name='person' 
                size={30} 
                color='#000' 
                style= {s.iconoUser}
                onPress={() => navigation.navigate('Mi perfil')}
            />
        </View>
    );
  }

  