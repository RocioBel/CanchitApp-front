import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';

import s from './styles';

export default function IconoExit(){
    const navigation = useNavigation();

    return (
        <View>
            <Icon 
                name='key' 
                size={30} 
                color='#000' 
                style= {s.iconoUser}
                onPress={() => navigation.navigate('Cambiar Password')}
            />
        </View>
    );
  }

  