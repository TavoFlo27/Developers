import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Registro({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const handleRegistro = async () => {
    if (
      !nombre ||
      !usuario ||
      !telefono ||
      !domicilio ||
      !contrasena ||
      !confirmarContrasena
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios");
    } else if (contrasena !== confirmarContrasena) {
      Alert.alert("Error", "Las contraseñas no coinciden");
    } else {
      try {
        const storedUsers = await AsyncStorage.getItem("usuarios");
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const usuarioExistente = users.find((u) => u.usuario === usuario);
        if (usuarioExistente) {
          Alert.alert("Error", "El nombre de usuario ya está en uso");
          return;
        }

        const userData = {
          nombre,
          usuario,
          telefono,
          domicilio,
          contrasena,
          tipoUsuario: "Cliente", 
        };

        users.push(userData);
        await AsyncStorage.setItem("usuarios", JSON.stringify(users));

        Alert.alert("Registro exitoso", "¡Cuenta creada correctamente!");
        navigation.navigate("InicioSesion");
      } catch (error) {
        Alert.alert("Error", "Hubo un problema al guardar los datos");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Image
          source={require("../assets/pizza_icon.png")}
          style={styles.logo}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("InicioSesion")}
          style={styles.backButton}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>REGÍSTRATE</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        mode="outlined"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
        theme={{ roundness: 30 }}
      />

      <Text style={styles.label}>Usuario</Text>
      <TextInput
        mode="outlined"
        value={usuario}
        onChangeText={setUsuario}
        style={styles.input}
        theme={{ roundness: 30 }}
      />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        mode="outlined"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
        style={styles.input}
        theme={{ roundness: 30 }}
      />

      <Text style={styles.label}>Domicilio</Text>
      <TextInput
        mode="outlined"
        value={domicilio}
        onChangeText={setDomicilio}
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

      <Text style={styles.label}>Confirmar Contraseña</Text>
      <TextInput
        mode="outlined"
        secureTextEntry
        value={confirmarContrasena}
        onChangeText={setConfirmarContrasena}
        style={styles.input}
        theme={{ roundness: 30 }}
      />

      <Button mode="contained" onPress={handleRegistro} style={styles.boton}>
        REGÍSTRATE
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 25,
    paddingBottom: 30,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    position: "relative",
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: -15,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  backText: {
    fontSize: 30,
    color: "black",
  },
  subtitulo: {
    fontSize: 35,
    color: "skyblue",
    fontFamily: "Bukhari",
    alignSelf: "center",
    marginVertical: 15,
    marginTop: -15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    marginBottom: 12,
    borderRadius: 30,
  },
  boton: {
    marginTop: 15,
    backgroundColor: "#007bff",
    borderRadius: 30,
  },
});
