import * as React from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useState, useContext, useEffect } from 'react';
import GlobalContext from './components/context'

//Ingreso y egreso - Cliente/Admin
import SignIn from './pages/signin';
import Salir from './components/salir';
//Home Cliente/Admin
import PagPrincCliente from './pages/homeCliente';
import PagPrincAdmin from './pages/homeAdmin';
import CambiarPassword from './pages/cambiarClave';
//Cliente - Usuario
import AgregarUsuario from './pages/AgregarUsuario';
import Perfil from './pages/perfil';
import CambiarClave from './pages/cambiarClave';
//Cliente - Reserva 
import NuevaReserva from './pages/nuevareserva';
import PagoReserva from './pages/pagoReserva';
import MiReserva from './pages/mireserva';
//Admin - Reservas
import ListadoReservas from './pages/ListadoReservas/misReservas';
import VerReserva from './pages/verReserva';
import SeteoAtencion from './pages/seteoAtencion';
//Admin - Canchas
import ListadoCanchas from './pages/ListadoCanchas/misCanchas';
import AgregarCancha from "./pages/ListadoCanchas/agregarCancha";
import EditarCancha from './pages/ListadoCanchas/editarCancha';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function Reserva() {
  return (
    <Stack.Navigator initialRouteName="Nueva Reserva">
      <Stack.Screen name="Nueva Reserva" component={NuevaReserva} options={{ headerShown: false }} />
      <Stack.Screen name="Pago Reserva" component={PagoReserva} options={{ headerShown: false }} />
      <Stack.Screen name="Mi Reserva" component={MiReserva} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function MiPerfil() {
  return (
    <Stack.Navigator initialRouteName="Mi Perfil">
      <Stack.Screen name="Mi Perfil" component={Perfil} options={{ headerShown: false }} />
      <Stack.Screen name="Cambiar Contraseña" component={CambiarClave} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function AdminReservas() {
  return (
    <Stack.Navigator initialRouteName="Listado Reservas">
      <Stack.Screen name="Listado Reservas" component={ListadoReservas} options={{ headerShown: false }} />
      <Stack.Screen name="Modificar Reserva" component={VerReserva} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function AdminCanchas() {
  return (
    <Stack.Navigator initialRouteName="Listado Canchas">
      <Stack.Screen name="Listado Canchas" component={ListadoCanchas} options={{ headerShown: false }} />
      <Stack.Screen name="Agregar Cancha" component={AgregarCancha} options={{ headerShown: false }} />
      <Stack.Screen name="Editar Cancha" component={EditarCancha} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function HomeAdmin() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Menu" component={PagPrincAdmin} />
      <Drawer.Screen name="Días y Horarios de Atención" component={SeteoAtencion} />
      <Drawer.Screen name="Listado Canchas" component={AdminCanchas} />
      <Drawer.Screen name="Listado Reservas" component={AdminReservas} />
      <Drawer.Screen name="Cambiar Password" component={CambiarPassword} />
      <Drawer.Screen name="Salir" component={Salir} />
    </Drawer.Navigator>
  );
}

function HomeCliente() {

  const context = useContext(GlobalContext);
  const ip = 'https://secret-shore-39623.herokuapp.com/';
  const [response, setResponse] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {

    buscarReserva();

  }, [context])

  async function buscarReserva() {

    const requestOptions = {
      method: "GET",
      headers: new Headers({
        'Authorization': `Bearer ${context.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
    }

    await fetch(ip + 'api/reservas/miReserva/' + context.usuario.email, requestOptions)
      .then((res) => res.json())
      .then((json) => setResponse(json))
      .catch(err => {
        console.log("Error: ", err)
      })


      context.cambioDatos(context.usuario, context.token, context.reserva, response);

  }

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={PagPrincCliente} />
      {response === false ?
        <Drawer.Screen name="Nueva Reserva" component={Reserva} />
        :
        <Drawer.Screen name="Mi Reserva" component={MiReserva} />
      }
      <Drawer.Screen name="Mi perfil" component={MiPerfil} />
      <Drawer.Screen name="Salir" component={Salir} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [authData, setAuthData] = useState({
    usuario: '',
    token: '',
    reserva: '',
    objetoReserva: '',
    cambioDatos: (usuario, token, reserva, objetoReserva) => {
      setAuthData({ ...authData, usuario: usuario, token: token, reserva: reserva, objetoReserva: objetoReserva })
    },

  })

  return (
    <GlobalContext.Provider value={authData}>
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Sign In">
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Registrarme" component={AgregarUsuario} />
          {authData.usuario.admin === false ?
            <Stack.Screen name="Home" component={HomeCliente} options={{ headerShown: false }} />
            :
            <Stack.Screen name="Home" component={HomeAdmin} options={{ headerShown: false }} />
          }
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
