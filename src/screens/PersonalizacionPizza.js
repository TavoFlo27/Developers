import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { RadioButton, Checkbox, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const ingredientesDisponibles = [
  { nombre: "Extra queso", precio: 10 },
  { nombre: "Champiñones", precio: 12 },
  { nombre: "Tocino", precio: 15 },
  { nombre: "Jalapeños", precio: 8 },
  { nombre: "Pimientos", precio: 10 },
];

const preciosTamano = {
  Pequeña: 0,
  Mediana: 20,
  Grande: 40,
};

export default function PersonalizacionPizza({ route, navigation }) {
  const { pizza, tamano: tamanoInicial = "", ingredientes: ingredientesInicial = [], index, carrito = [] } = route.params || {};

  if (!pizza) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Error: No se recibió la información de la pizza.</Text>
      </SafeAreaView>
    );
  }

  const [tamano, setTamano] = useState(tamanoInicial);
  const [ingredientes, setIngredientes] = useState(ingredientesInicial);
  const [precioTotal, setPrecioTotal] = useState(0);

  useEffect(() => {
    calcularPrecioTotal();
  }, [tamano, ingredientes]);

  const calcularPrecioTotal = () => {
    let precioBase = parseFloat(pizza.precio.replace("$", ""));
    let precioIngredientes = ingredientes.reduce((sum, item) => sum + item.precio, 0);
    let precioTam = preciosTamano[tamano] || 0;
    setPrecioTotal(precioBase + precioIngredientes + precioTam);
  };

  const toggleIngrediente = (item) => {
    const existe = ingredientes.find((i) => i.nombre === item.nombre);
    if (existe) {
      setIngredientes(ingredientes.filter((i) => i.nombre !== item.nombre));
    } else {
      setIngredientes([...ingredientes, item]);
    }
  };

  const handleAgregar = () => {
    if (!tamano) {
      Alert.alert("Error", "Seleccione un tamaño para continuar");
      return;
    }
    // Construir la pizza personalizada para actualizar el carrito
    const pizzaPersonalizada = {
      pizza,
      tamano,
      ingredientes,
      precioTotal,
    };

    // Navegar regresando la pizza personalizada y el índice para actualizar
    navigation.navigate("PizzaSeleccionada", {
      pizzaPersonalizada,
      index,
      carrito,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={50} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../assets/pizza_icon.png")}
          style={styles.logo}
        />
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="notifications" size={50} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>PERSONALIZA TU PIZZA</Text>

        <Image source={pizza.imagen} style={styles.imagenPizza} />
        <Text style={styles.nombrePizza}>{pizza.nombre}</Text>

        <Text style={styles.subtitulo}>Selecciona el tamaño:</Text>
        <RadioButton.Group onValueChange={setTamano} value={tamano}>
          {Object.keys(preciosTamano).map((t) => (
            <View key={t} style={styles.radioItem}>
              <RadioButton value={t} />
              <Text style={styles.radioLabel}>
                {t} (+${preciosTamano[t]})
              </Text>
            </View>
          ))}
        </RadioButton.Group>

        <Text style={styles.subtitulo}>Agrega ingredientes adicionales:</Text>
        {ingredientesDisponibles.map((item, index) => (
          <View key={index} style={styles.checkboxItem}>
            <Checkbox
              status={ingredientes.find((i) => i.nombre === item.nombre) ? "checked" : "unchecked"}
              onPress={() => toggleIngrediente(item)}
            />
            <Text style={styles.checkboxLabel}>
              {item.nombre} (+${item.precio})
            </Text>
          </View>
        ))}

        <Text style={styles.precioTotal}>Precio total: ${precioTotal.toFixed(2)}</Text>

        <Button
          mode="contained"
          style={styles.botonAgregar}
          labelStyle={styles.botonLabel}
          onPress={handleAgregar}
        >
          Guardar Personalización
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: "#fff",
    elevation: 4,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: "center",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },
  imagenPizza: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginVertical: 10,
  },
  nombrePizza: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    alignSelf: "flex-start",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  radioLabel: {
    fontSize: 18,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  checkboxLabel: {
    fontSize: 18,
  },
  precioTotal: {
    fontSize: 28,
    fontWeight: "bold",
    color: "green",
    marginVertical: 20,
  },
  botonAgregar: {
    backgroundColor: "#FF9800",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
  },
  botonLabel: {
    fontSize: 20,
    color: "black",
  },
});
