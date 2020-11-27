import React, { useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import GlobalContext from './context';

export default function Salir() {
    const context = useContext(GlobalContext);

    const navigation = useNavigation();

    useEffect(() => {
        context.cambioDatos('', '','','');
        navigation.navigate('Sign In');
    }, [])

    return null;

}
