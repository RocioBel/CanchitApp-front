import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Row from "./rowCancha";
import { useNavigation } from '@react-navigation/native';
import GlobalContext from '../../components/context';

import s from '../../components/styles';

export default function ScrollViewCanchas() {
    const context = useContext(GlobalContext);
    const ip = 'https://secret-shore-39623.herokuapp.com/';
    const [canchas, setCanchas] = useState([]);

    useEffect(() => {

        const requestOptions = {
            method: "GET",
            headers: new Headers({
                'Authorization': `Bearer ${context.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }),
        }
        fetch(ip + 'api/canchas', requestOptions)
            .then((response) => response.json())
            .then((json) => setCanchas(json))
            .catch((error) => console.error(error));
    })

    return (
        <ScrollView style={s.container}>
          {(canchas[0] != undefined) ?
            (canchas.map((cancha) => (<Row key={cancha._id} cancha={cancha} />))) 
            : (<Text style={s.vacio}>No hay canchas</Text>)
          }
        </ScrollView>
    )

}

