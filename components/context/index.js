import React from 'react';

const authData = {
    usuario: '',
    token: '',
    reserva: '',
    objetoReserva:''
}

export default React.createContext(authData);