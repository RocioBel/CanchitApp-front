import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TextInput, Picker, Alert, Switch } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';
import GlobalContext from '../components/context';

import BotoneraSuperior from '../components/botoneraSuperior';
import s from '../components/styles';
import { ScrollView } from 'react-native-gesture-handler';


export default function SeteoAtencion() {
    const [horaIni, setHoraIni] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [diasAtencion, setDiasAtencion] = useState([]);

    const [puedeEnviar, setPuedeEnviar] = useState(false)
    const navigation = useNavigation();
    const ip = 'https://secret-shore-39623.herokuapp.com/';
    const isFocused = useIsFocused();
    const context = useContext(GlobalContext);

    const [lunes, setLunes] = useState(true);
    const toggleSwitchLunes = () => setLunes(previousState => !previousState);
    const [martes, setMartes] = useState(true);
    const toggleSwitchMartes = () => setMartes(previousState => !previousState);
    const [miercoles, setMiercoles] = useState(true);
    const toggleSwitchMiercoles = () => setMiercoles(previousState => !previousState);
    const [jueves, setJueves] = useState(true);
    const toggleSwitchJueves = () => setJueves(previousState => !previousState);
    const [viernes, setViernes] = useState(true);
    const toggleSwitchViernes = () => setViernes(previousState => !previousState);
    const [sabado, setSabado] = useState(true);
    const toggleSwitchSabado = () => setSabado(previousState => !previousState);
    const [domingo, setDomingo] = useState(true);
    const toggleSwitchDomingo = () => setDomingo(previousState => !previousState);

    // Validacion de boton enviar
    useEffect(() => {

        setPuedeEnviar(horaIni != '' && horaFin != '')

    }, [horaFin, horaIni])

    useEffect(() => {

        const requestOptions = {
            method: "GET",
            headers: new Headers({
                'Authorization': `Bearer ${context.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }),
        }

        fetch(ip + 'api/horariosAtencion/', requestOptions)
            .then((response) => response.json())
            .then((json) => setHoraIni(json.horarioDeInicio))
            .catch((error) => console.error(error));

        fetch(ip + 'api/horariosAtencion/', requestOptions)
            .then((response) => response.json())
            .then((json) => setHoraFin(json.horarioDeCierre))
            .catch((error) => console.error(error));

        fetch(ip + 'api/diasNoAtencion/', requestOptions)
            .then((response) => response.json())
            // .then((json)=>console.log(json.dias.dias.length))
            .then((json) => {
                for (let i = 0; i < json.dias.dias.length; i++) {
                    switch (json.dias.dias[i]) {
                        case 0:
                            setLunes(false);
                            break;
                        case 1:
                            setMartes(false);
                            break;
                        case 2:
                            setMiercoles(false);
                            break;
                        case 3:
                            setJueves(false);
                            break;
                        case 4:
                            setViernes(false);
                            break;
                        case 5:
                            setSabado(false);
                            break;
                        case 6:
                            setDomingo(false);
                            break;
                        default:
                            break;
                    }
                }
            }
            )
            .catch((error) => console.error(error));

    }, [])

    async function guardarAtencion() {
        const dias = [lunes, martes, miercoles, jueves, viernes, sabado, domingo];
        for (let i = 0; i < (dias.length); i++) {
            if (dias[i] === false) {
                diasAtencion.push(i);
            }
        }


        if (puedeEnviar) {

            //Fetch para el horario
            //Conformación de componentes para el fetch
            const requestOptionsHora = {
                method: "PUT",
                headers: new Headers({
                    'Authorization': `Bearer ${context.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }),
                body: JSON.stringify({
                    horarioDeInicio: horaIni,
                    horarioDeCierre: horaFin,
                })
            }

            //Almacenamos el response del fetch
            let responseHora = await fetch(ip + 'api/horariosAtencion/modificarHorario', requestOptionsHora)
                .then((res) => res.json())
                .catch(err => {
                    console.log("Error: ", err)
                })

            //Fetch para los días
            //Conformación de componentes para el fetch
            const requestOptionsDia = {
                method: "PUT",
                headers: new Headers({
                    'Authorization': `Bearer ${context.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }),
                body: JSON.stringify({
                    dias: diasAtencion
                })
            }

            //Almacenamos el response del fetch
            let responseDia = await fetch(ip + 'api/diasNoAtencion/modificarDias', requestOptionsDia)
                .then((res) => res.json())
                .catch(err => {
                    console.log("Error: ", err)
                })

            //Dependiendo el response, mostramos un msj    
            if (responseDia === true && responseHora == true) {
                Alert.alert("Horario modificado con éxito")
                navigation.navigate("Menu")
            } else {
                Alert.alert("Error", "No se pudo modificar los días/horarios de atención.")
            }

        } else {
            //Mensaje de error cuando falta algún campo o hay algún campo inválido
            Alert.alert(
                "Error",
                "¡Revisar los campos completados!",
                [{
                    text: "Cancelar",
                    onPress: console.log('Yes Pressed'),
                }]
            )
        }
    }


    return (
        <ScrollView style={s.container}>
            <BotoneraSuperior />
            <View style={s.contenedorSubtitulo}>
                <Text style={s.subtituloAdmin} >Horarios y días de atención</Text>
            </View>
            <View style={s.contenedorRegistro}>
                <Text style={s.dato}>Horario de apertura:</Text>
                <TextInput
                    style={s.input}
                    value={horaIni}
                    placeholder="Horario de inicio"
                    onChangeText={(input) => setHoraIni(input)}
                    keyboardType="numeric"
                    editable={true}
                />
                <Text style={s.dato}>Horario de cierre:</Text>
                <TextInput
                    style={s.input}
                    value={horaFin}
                    placeholder="Horario de cierre"
                    onChangeText={(input) => setHoraFin(input)}
                    keyboardType="numeric"
                />

                <Text style={s.dato}>Seleccione los días de atención:</Text>
                <View style={s.contenedorRegistro}>
                    <View style={s.contenedorSwitch}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#3ca602" }}
                            thumbColor={lunes ? "#daf5cb" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchLunes}
                            value={lunes}
                        />
                        <Text>Lunes</Text>
                    </View>
                    <View style={s.contenedorSwitch}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#3ca602" }}
                            thumbColor={martes ? "#daf5cb" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchMartes}
                            value={martes}
                        />
                        <Text>Martes</Text>
                    </View>
                    <View style={s.contenedorSwitch}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#3ca602" }}
                            thumbColor={miercoles ? "#daf5cb" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchMiercoles}
                            value={miercoles}
                        />
                        <Text>Miércoles</Text>
                    </View>

                    <View style={s.contenedorSwitch}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#3ca602" }}
                            thumbColor={jueves ? "#daf5cb" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchJueves}
                            value={jueves}
                        />
                        <Text>Jueves</Text>
                    </View>
                    <View style={s.contenedorSwitch}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#3ca602" }}
                            thumbColor={viernes ? "#daf5cb" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchViernes}
                            value={viernes}
                        />
                        <Text>Viernes</Text>
                    </View>
                    <View style={s.contenedorSwitch}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#3ca602" }}
                            thumbColor={sabado ? "#daf5cb" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchSabado}
                            value={sabado}
                        />
                        <Text>Sábado</Text>
                    </View>

                    <View style={s.contenedorSwitch}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#3ca602" }}
                            thumbColor={domingo ? "#daf5cb" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchDomingo}
                            value={domingo}
                        />
                        <Text>Domingo</Text>
                    </View>

                </View>

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
                        onPress={() => guardarAtencion()}
                    />
                </View>
            </View>
        </ScrollView>
    )
}
