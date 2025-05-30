import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function InicioSesion({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleLogin = async () => {
    try {
      const usuariosRef = collection(db, "usuarios");

      // Buscar usuario con tipoUsuario: "Cliente"
      const clienteQuery = query(
        usuariosRef,
        where("usuario", "==", usuario),
        where("contrasena", "==", contrasena),
        where("tipoUsuario", "==", "Cliente")
      );
      const clienteSnapshot = await getDocs(clienteQuery);

      if (!clienteSnapshot.empty) {
        const userData = clienteSnapshot.docs[0].data();
        Alert.alert("¡Bienvenido!");
        navigation.navigate("MenuPizzas", { usuario: userData });
        return;
      }

      // Si no es cliente, buscar como admin
      const adminQuery = query(
        usuariosRef,
        where("usuario", "==", usuario),
        where("contrasena", "==", contrasena),
        where("tipoUsuario", "==", "admin")
      );
      const adminSnapshot = await getDocs(adminQuery);

      if (!adminSnapshot.empty) {
        const userData = adminSnapshot.docs[0].data();
        Alert.alert("Acceso concedido", "Bienvenido, Cajero");
        navigation.navigate("VistaCajero", { usuario: userData });
        return;
      }

      // Si no se encontró ninguno
      Alert.alert("Error", "Usuario o contraseña incorrectos");

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Alert.alert("Error", "Hubo un problema al verificar los datos");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/pizza_icon.png")}
          style={styles.logo}
        />
        <Text style={styles.bienvenido}>Bienvenido</Text>
      </View>

      <Text style={styles.label}>Usuario</Text>
      <TextInput
        mode="outlined"
        value={usuario}
        onChangeText={setUsuario}
        style={styles.input}
        theme={{ roundness: 30 }}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        mode="outlined"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
        style={styles.input}
        theme={{ roundness: 30 }}
      />

      <Button mode="contained" onPress={handleLogin} style={styles.botonLogin}>
        INICIAR SESIÓN
      </Button>

      <Text style={styles.textoRegistro}>¿No tienes cuenta?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
        <Text style={styles.botonRegistro}>REGÍSTRATE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 350,
    height: 200,
    resizeMode: "contain",
  },
  bienvenido: {
    fontSize: 40,
    color: "green",
    fontFamily: "Bukhari",
    marginTop: -15,
    textAlign: "center",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 30,
    marginBottom: 5,
    marginTop: 15,
    fontFamily: "OpenSans",
    color: "black",
  },
  input: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "white",
  },
  botonLogin: {
    backgroundColor: "green",
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 8,
    alignSelf: "center",
  },
  textoRegistro: {
    marginTop: 50,
    fontFamily: "OpenSans",
    color: "red",
    fontSize: 25,
  },
  botonRegistro: {
    fontFamily: "OpenSans",
    color: "black",
    backgroundColor: "#cce6ff",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 15,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});
