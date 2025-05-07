import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';

export default function PizzaSeleccionada({ route, navigation }) {
  const { pizza, tamano = "Familiar", ingredientes = [], precioTotal = 130.00 } = route.params;

  const handleModificar = () => {
    navigation.goBack();
  };

  const handlePagar = () => {
    navigation.navigate('Pago', {
      pizza,
      tamano,
      ingredientes,
      precioTotal,
    });
  };

  const handlePersonalizar = () => {
    navigation.navigate('PersonalizacionPizza', {
      pizza,
      tamano,
      ingredientes,
      precioBase: parseFloat(pizza.precio.replace("$", "")),
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Barra superior */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.navigate("MenuPizzas")}>
          <Icon name="menu" size={50} color="#000" />
        </TouchableOpacity>

        <Image
          source={require("../assets/pizza_icon.png")}
          style={styles.logoGrande}
        />

        <TouchableOpacity onPress={() => alert("Notificaciones")}>
          <Icon name="bell" size={50} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Contenido principal */}
      <View style={styles.container}>
        <Image source={pizza.imagen} style={styles.imagen} />
        <Text style={styles.nombre}>{pizza.nombre}</Text>
        <Text style={styles.detalle}>Tamaño: {tamano}</Text>
        <Text style={styles.detalle}>Ingredientes adicionales:</Text>

        {ingredientes.length > 0 ? (
          ingredientes.map((item, index) => (
            <Text key={index} style={styles.ingrediente}>- {item.nombre}</Text>
          ))
        ) : (
          <Text style={styles.ingrediente}>Sin ingredientes adicionales</Text>
        )}

        <Text style={styles.precio}>Total: ${precioTotal.toFixed(2)}</Text>

        <Button mode="contained" style={styles.botonPersonalizar} onPress={handlePersonalizar}>
          Personalizar Pizza
        </Button>

        <Button mode="contained" style={styles.botonPagar} onPress={handlePagar}>
          Proceder al pago
        </Button>

        <Button mode="contained" style={styles.botonModificar} onPress={handleModificar}>
          Modificar
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: "#fff",
    elevation: 4,
  },
  logoGrande: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
  imagen: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detalle: {
    fontSize: 16,
    marginTop: 10,
  },
  ingrediente: {
    fontSize: 14,
    color: '#555',
  },
  precio: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  botonPersonalizar: {
    backgroundColor: '#FFD700',
    marginBottom: 10,
    width: '100%',
  },
  botonPagar: {
    backgroundColor: 'green',
    marginBottom: 10,
    width: '100%',
  },
  botonModificar: {
    backgroundColor: 'orange',
    width: '100%',
  },
});
