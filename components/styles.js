import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },

  contenedorSignin: {
    paddingTop: 80,
    flex: 1,
  },

  contenedorRegistro: {
    paddingTop: 20,
    paddingBottom: 20,
  },

  contenedorMenuLateral: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#DCDCDC",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    // rowUnderlay: 'rgba(154, 154, 154, 0.2)',
  },

  contenedorListado: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 30,
    paddingLeft: 30,
  },

  contenedorPicker: {
    borderWidth: 1,
    borderRadius: 0,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#4F77A4",
  },

  containerBoton: {
    alignItems: "center",
    marginTop: 10,
  },

  containerBotonHome: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },

  containerIngreso: {
    paddingTop: 15,
    marginTop: 30,
  },

  contenedorRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  contenedorRowList: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#CCD2DA",
  },

  contenedorSubtitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#4F77A4",
  },
  contenedorMas: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 30,
    alignItems: "center",
  },

  contenedorSwitch: {
    paddingTop: 9,
    flex: 1,
    alignItems: "center",
    paddingLeft: 20,
    flexDirection: "row",
  },

    contenedorSwitch: {
        paddingTop: 9,
        flex: 1,
        alignItems: "center",
        paddingLeft: 20,
        flexDirection: 'row',
    },

    contenedorImagen: {
        paddingTop: 50,
        alignItems: 'center'
    },

  botoneraSuperior: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },

  botoneraInferior: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  botoneraDerecha: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
  },

  boton: {
    width: 300,
    height: 40,
    backgroundColor: "#720876",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
  },

  textoBoton: {
    color: "white",
    fontSize: 15,
  },

  iconoUser: {
    paddingTop: 10,
    paddingRight: 20,
  },

  iconoMenu: {
    paddingTop: 10,
    paddingLeft: 20,
  },

  iconoSignin: {
    paddingLeft: 20,
    marginTop: 20,
  },

  iconoList: {
    color: "gray",
    paddingLeft: 50,
  },

  iconoListClaro: {
    color: "white",
    paddingLeft: 50,
  },

  iconoDerecho: {
    paddingLeft: 25,
  },

  iconoIzquierdo: {
    paddingRight: 25,
  },

  iconoEditar: {
    color: "gray",
  },

  imagenReserva: {
    width: 150,
    height: 150,
  },
  imagenHome: {
    resizeMode: "contain",
    marginTop: 50,
    width: 400,
    height: 200,
  },

  home: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    textAlign: "center",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
  },

  titulo: {
    textAlign: "center",
    fontSize: 40,
    marginBottom: 90,
    marginTop: 50,
    fontStyle: "italic",
    fontWeight: "bold",
  },

  subtitulo: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 30,
    paddingTop: 50,
    paddingBottom: 20,
    borderEndWidth:1
  },

  subtituloAdmin: {
    fontSize: 24,
    color: "white",
  },

  texto: {
    fontSize: 15,
    textAlign: "left",
    alignContent: "center",
    marginTop: 20,
    marginTop: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  dato: {
    fontSize: 15,
    paddingLeft: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "gray",
    minWidth: 100,
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  itemList: {
    fontSize: 18,
    color: "gray",
  },

  box: {
    height: 40,
    width: 350,
    borderBottomWidth: 1,
    marginVertical: 30,
    alignContent: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },

  picker: {
    color: "white",
    backgroundColor: "#4F77A4",
  },

    validacionInput: {
        color: 'red',
        fontSize: 10,
        paddingHorizontal:20
    },
  link: {
    marginTop: 30,
    fontSize: 18,
    color: "#33A8FF",
    paddingVertical: 5,
  },

  reserva: {
    marginLeft: 40,
    marginTop: 30,
    marginBottom: 30,
  },

  vacio:{
    justifyContent: 'center',
    alignItems:'center',
    paddingTop:100,
    textAlign: 'center',
    color: 'gray',
    fontSize:15,
  }
});

export default styles;
