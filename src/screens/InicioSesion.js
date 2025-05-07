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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InicioSesion({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleLogin = async () => {
    try {
      // Verificación para el cajero (usuario fijo)
      if (usuario === "ADMINISTRADOR" && contrasena === "PASSWORD") {
        Alert.alert("Acceso concedido", "Bienvenido, Cajero");
        navigation.navigate("MenuPizzas");
        return;
      }

      // Verificación de usuarios registrados (clientes)
      const storedUsers = await AsyncStorage.getItem("usuarios");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userFound = users.find(
        (u) => u.usuario === usuario && u.contrasena === contrasena
      );

      if (userFound) {
        Alert.alert("¡Bienvenido!");
        navigation.navigate("MenuPizzas");
      } else {
        Alert.alert("Error", "Usuario o contraseña incorrectos");
      }
    } catch (error) {
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
    color: "black",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },
  logo: {
    width: 350,
    height: 200,
    resizeMode: "contain",
    margin: 0,
    padding: 0,
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
    fontFamily: "OpenSans",
    color: "black",
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
    borderRadius: 5,
    marginTop: 15,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    borderRadius: 30,
  },
});
