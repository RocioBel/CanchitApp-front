import React, {useContext} from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';
import GlobalContext from '../../components/context';

import s from '../../components/styles'

export default function Row({ cancha }) {
    const context = useContext(GlobalContext);
    const navigation = useNavigation();
    const ip = 'https://secret-shore-39623.herokuapp.com/';

    function editar() {
        navigation.navigate('Editar Cancha', { cancha })
    }

    function confirmarEliminar() {
        Alert.alert(
            "Confirmar eliminación de cancha",
            "¿Está seguro de que quiere eliminar la cancha número " + cancha.numero + "?",
            [
                {
                    text: "Cancelar",
                    onPress: console.log('Yes Pressed'),
                },
                {
                    text: "Confirmar", onPress: eliminar
                }
            ],
            { cancelable: false })
    }

    async function eliminar() {
        const id = cancha._id;

        const requestOptions = {
            method: "DELETE",
            headers: new Headers({
                'Authorization': `Bearer ${context.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }),
            body: JSON.stringify({
                id: id,
            })
        }

        let eliminacion = await fetch(ip + 'api/canchas/' + id, requestOptions)
            .then((res) => res.json())
            .catch(err => {
                console.log("Error: ", err)
            })

        if (eliminacion === true) {
            Alert.alert("La cancha se eliminó con éxito.")
        } else {
            Alert.alert("La cancha no se pudo eliminar")
        }

    }

    return (
        <View style={s.contenedorMenuLateral}>
            <View style={s.contenedorListado}>
                <View>
                    <Text style={s.itemList}>Número de cancha: {cancha.numero}</Text>
                    <Text style={s.itemList}>{cancha.descripcion}</Text>
                    <Text style={s.itemList}>Precio de reserva : ${cancha.precio}</Text>
                </View>
            </View>
            <View style={s.botoneraDerecha}>
                <TouchableOpacity underlayColor='rgba(154, 154, 154, 0,2'>
                    <Icon
                        name='trashcan'
                        size={30}
                        color='#000'
                        style={s.iconoEditar}
                        onPress={confirmarEliminar}
                    />
                </TouchableOpacity>
                <TouchableOpacity underlayColor = '#008b8b'>
                    <Icon
                        name='pencil'
                        size={30}
                        color='#000'
                        style={s.iconoEditar}
                        onPress={editar}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}