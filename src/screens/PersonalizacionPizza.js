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
  const {
    pizza = null,
    tamano: tamanoInicial = "",
    ingredientes: ingredientesInicial = [],
    index = null,
    carrito = [],
  } = route.params || {};

  const [tamano, setTamano] = useState(tamanoInicial);
  const [ingredientes, setIngredientes] = useState(ingredientesInicial);
  const [precioTotal, setPrecioTotal] = useState(0);

  // Estados para controlar la visibilidad de las secciones
  const [mostrarTamano, setMostrarTamano] = useState(false);
  const [mostrarIngredientes, setMostrarIngredientes] = useState(false);

  useEffect(() => {
    if (pizza) {
      calcularPrecioTotal();
    }
  }, [tamano, ingredientes]);

  const calcularPrecioTotal = () => {
    const precioBase = parseFloat(pizza.precio?.replace("$", "") || "0");
    const precioIngredientes = ingredientes.reduce(
      (sum, item) => sum + item.precio,
      0
    );
    const precioTam = preciosTamano[tamano] || 0;
    setPrecioTotal(precioBase + precioIngredientes + precioTam);
  };

  const toggleIngrediente = (item) => {
    setIngredientes((prev) => {
      const existe = prev.find((i) => i.nombre === item.nombre);
      if (existe) {
        return prev.filter((i) => i.nombre !== item.nombre);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleAgregar = () => {
    if (!tamano) {
      Alert.alert("Error", "Seleccione un tamaño para continuar");
      return;
    }

    const pizzaPersonalizada = {
      pizza,
      tamano,
      ingredientes,
      precioTotal,
    };

    navigation.navigate("PizzaSeleccionada", {
      pizzaPersonalizada,
      index,
      carrito,
    });
  };

  if (!pizza) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={{ fontSize: 18, color: "red" }}>
          Error: No se recibió la información de la pizza.
        </Text>
      </SafeAreaView>
    );
  }

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
        <Text style={styles.titulo}>PERSONALIZAR PIZZA</Text>

        <Image source={pizza.imagen} style={styles.imagenPizza} />
        <Text style={styles.nombrePizza}>{pizza.nombre}</Text>

        {/* Precio total arriba de tamaño */}
        <Text style={styles.precioTotal}>
          Total: ${precioTotal.toFixed(2)}
        </Text>

        {/* Botón para mostrar/ocultar tamaños */}
        <TouchableOpacity
          style={styles.seccionHeader}
          onPress={() => setMostrarTamano((prev) => !prev)}
        >
          <Text style={styles.subtitulo}>SELECCIONAR TAMAÑO</Text>
          <Ionicons
            name={mostrarTamano ? "chevron-up" : "chevron-down"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
        {mostrarTamano && (
          <RadioButton.Group onValueChange={setTamano} value={tamano}>
            {Object.entries(preciosTamano).map(([t, precio]) => (
              <View key={t} style={styles.radioItem}>
                <RadioButton value={t} />
                <Text style={styles.radioLabel}>
                  {t} (+${precio})
                </Text>
              </View>
            ))}
          </RadioButton.Group>
        )}

        {/* Botón para mostrar/ocultar ingredientes */}
        <TouchableOpacity
          style={styles.seccionHeader}
          onPress={() => setMostrarIngredientes((prev) => !prev)}
        >
          <Text style={styles.subtitulo}>INGREDIENTES ADICIONALES</Text>
          <Ionicons
            name={mostrarIngredientes ? "chevron-up" : "chevron-down"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
        {mostrarIngredientes && (
          ingredientesDisponibles.map((item, index) => (
            <View key={index} style={styles.checkboxItem}>
              <Checkbox
                status={
                  ingredientes.some((i) => i.nombre === item.nombre)
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => toggleIngrediente(item)}
              />
              <Text style={styles.checkboxLabel}>
                {item.nombre} (+${item.precio})
              </Text>
            </View>
          ))
        )}

        <Button
          mode="contained"
          style={[styles.botonAgregar, { backgroundColor: "#4CAF50" }]}
          labelStyle={styles.botonLabel}
          onPress={handleAgregar}
        >
          LISTO
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  color: "black",
  backgroundColor: "yellow",
  paddingHorizontal: 20,
  paddingVertical: 8,
  borderRadius: 30,  // bordes circulares
  overflow: "hidden",
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
  },
  seccionHeader: {
    width: "100%",
    marginTop: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
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
    color: "red",
    marginVertical: 20,
  },
  botonAgregar: {
    backgroundColor: "#4CAF50", // Verde
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginTop: 30,
  },

  botonLabel: {
    fontSize: 20,
    color: "black",
  },
});
