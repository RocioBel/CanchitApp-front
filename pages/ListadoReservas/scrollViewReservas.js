import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import Row from "./rowReserva";
import { useNavigation } from '@react-navigation/native';
import GlobalContext from '../../components/context';

import s from '../../components/styles';


export default function ScrollViewTurnos() {
    const context = useContext(GlobalContext);
    const ip = 'https://secret-shore-39623.herokuapp.com/';
    const [reservas, setReservas] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
      const requestOptions = {
          method: "GET",
          headers: { 'Authorization': `Bearer ${context.token}` }
      }
      fetch(ip + 'api/reservas/hoy', requestOptions)
          .then((response) => response.json())
          .then((json) => setReservas(json))
          .catch((error) => console.error(error));
    })

    return (
        <ScrollView style={s.container}>
          {(reservas[0] != undefined) ?
            (reservas.map((reserva) => (<Row key={reserva._id} reserva={reserva} />))) 
            : (<Text style={s.vacio}>No hay reservas</Text>)
          }
        </ScrollView>
    )
}

