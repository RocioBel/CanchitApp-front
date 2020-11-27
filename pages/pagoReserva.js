import React, { useState, useEffect, useContext } from 'react';
import { Alert, Text, View, TextInput } from 'react-native';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';
import GlobalContext from '../components/context';

import BotoneraSuperior from '../components/botoneraSuperior';
import s from '../components/styles'
import { ScrollView } from 'react-native-gesture-handler';
import context from '../components/context';


export default function NuevaReserva() {
    const [tarjeta, setTarjeta] = useState([]);
    const [errorTarjeta, setErrorTarjeta] = useState([])
    const [vto, setVto] = useState([]);
    const [errorVto, setErrorVto] = useState([]);
    const [cvv, setCvv] = useState([]);
    const [errorCvv, setErrorCvv] = useState([]);
    const context = useContext(GlobalContext);
    const popAction = StackActions.popToTop();

    const [puedeEnviar, setPuedeEnviar] = useState(false)

    const { tipo, dia, hora, nroCancha, precio } = useRoute().params;
    const navigation = useNavigation();
    const ip = 'https://fast-tor-75300.herokuapp.com/';

    // Validacion de boton enviar
    useEffect(() => {
        setPuedeEnviar(tarjeta != '' && vto != '' && cvv != '')
    }, [tarjeta, vto, cvv])

    function pagar() {
        if (puedeEnviar == true) {
            Alert.alert(
                "Confirmar pago y reserva",
                "Usted seleccionó la " + tipo + ' número ' + nroCancha + ' para el día '
                + dia.substring(0, 10) + ' a las ' + hora + ':00hs por un valor de $' + precio + '. ¿Confirma el pago?',
                [
                    {
                        text: "Cancelar",
                        onPress: console.log('Yes Pressed'),
                    },
                    {
                        text: "Confirmar", onPress: guardarReserva
                    }
                ],
                { cancelable: false })
        } else {
            Alert.alert(
                "Error",
                "¡Corroborar los datos ingresados!",
                [{
                    text: "Cancelar",
                    onPress: console.log('Yes Pressed'),
                }]
            )
        }


    };

    async function guardarReserva() {

        const requestOptions = {
            method: "POST",
            headers: new Headers({
                'Authorization': `Bearer ${context.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                nroCancha: nroCancha,
                dia: dia,
                hora: hora,
                suspendida: false,
                email: context.usuario.email
            })
        }

        let response = await fetch(ip + 'api/reservas/agregarReserva/', requestOptions)
            .then((res) => res.json())
            .catch(err => {
                console.log("Error: ", err)
            })

        if (response.dia === undefined) {
            Alert.alert("Error", "La cancha no se encuentra disponible en esa fecha y hora.")
        } else {
            context.cambioDatos(context.usuario, context.token, 'nueva reserva', context.objetoReserva);
            navigation.dispatch(popAction);
            navigation.navigate("Home");
        }

    }

    function imprimirMsj(campo) {
        return (`El campo ${campo} no puede quedar vacío`)
    }

    function validar(dato, tipo) {
        const regDate = /(((0)[0-9])|((1)[0-2]))(\/)\d{2}$/
        switch (tipo) {
            case 'numero':
                if (dato == '') {
                    setErrorTarjeta(imprimirMsj('tarjeta'));
                } else if (dato.length < 16) {
                    setErrorTarjeta('El número de la tarjeta debe contener 16 dígitos')
                    setTarjeta("");
                } else {
                    setErrorTarjeta("");
                    setTarjeta(dato);
                }
                break;
            case 'vencimiento':
                if (dato == "") {
                    setErrorVto(imprimirMsj('vencimiento'));
                    setVto("");
                } else if (regDate.test(dato)) {
                    setErrorVto("")
                    setVto(dato);
                } else {
                    setErrorVto("La fecha de vencimiento es inválida.");
                    setVto(dato);
                }
                break;
            case 'cvv':
                if (dato == "") {
                    setErrorCvv(imprimirMsj('CVV'));
                    setCvv("");
                } else if (dato.length < 3) {
                    setErrorCvv("El código de seguridad debe contener 3 dígitos.");
                    setCvv("");
                } else {
                    setErrorCvv("");
                    setCvv(dato);
                }
                break;
        }
    }

    return (
        <ScrollView style={s.container}>
            <BotoneraSuperior />
            <View style={s.contenedorSubtitulo}>
                <Text style={s.subtituloAdmin} >Pago con Tarjeta de Crédito</Text>
            </View>

            <View style={s.contenedorRegistro}>
                <Text style = {s.subtitulo}>Importe a pagar: ${precio}</Text>
                <Text style={s.dato}>Número</Text>
                <TextInput
                    style={s.input}
                    placeholder="0000 0000 0000 0000"
                    onChangeText={(texto) => validar(texto, 'numero')}
                    keyboardType="numeric"
                    maxLength={16}
                />
                <Text style={s.validacionInput}>{errorTarjeta}</Text>
                <Text style={s.dato}>Vencimiento</Text>
                <TextInput
                    style={s.input}
                    placeholder="MM/YY"
                    onChangeText={(texto) => validar(texto, 'vencimiento')}
                    keyboardType="numbers-and-punctuation"
                    maxLength={5}
                />
                <Text style={s.validacionInput}>{errorVto}</Text>
                <Text style={s.dato}>CVV</Text>
                <TextInput
                    style={s.input}
                    placeholder="Código de Seguridad"
                    onChangeText={(texto) => validar(texto, 'cvv')}
                    keyboardType="numeric"
                    maxLength={3}
                />
                <Text style={s.validacionInput}>{errorCvv}</Text>

                <View style={s.botoneraInferior}>
                    <Icon
                        name='x'
                        size={40}
                        color='#000'
                        style={s.iconoDerecho}
                        onPress={() => navigation.goBack()}
                    />
                    <Icon
                        name='check'
                        size={40}
                        color='#000'
                        style={s.iconoIzquierdo}
                        onPress={() => pagar()}
                    />
                </View>
            </View>

        </ScrollView>
    )
}

