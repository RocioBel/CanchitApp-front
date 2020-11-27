import React, {useContext} from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import s from './styles';
import IconoMenu from './iconoMenu';
import IconoUser from './iconoUser';
import IconoPassword from './iconoPassword';
import NombreApp from './nombreApp';
import GlobalContext from './context';

export default function BotoneraSuperior() {
    const context = useContext(GlobalContext);
    const navigation = useNavigation();

    return (
        <View style={s.botoneraSuperior} >
            <IconoMenu />
            <NombreApp />
            {context.usuario.admin === true ?
                <IconoPassword />
                :
                <IconoUser />
            }

        </View>
    );
}


