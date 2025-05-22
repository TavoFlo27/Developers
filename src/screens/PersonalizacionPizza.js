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
  const { pizza, tamano: tamanoInicial = "", ingredientes: ingredientesIniciales = [], index } =
    route.params;

  const [tamano, setTamano] = useState(tamanoInicial);
  const [ingredientes, setIngredientes] = useState(ingredientesIniciales);
  const [precioTotal, setPrecioTotal] = useState(0);

  useEffect(() => {
    calcularPrecioTotal();
  }, [tamano, ingredientes]);

  const calcularPrecioTotal = () => {
    let precioBase = parseFloat(pizza.precio.replace("$", ""));
    let precioIngredientes = ingredientes.reduce(
      (sum, item) => sum + item.precio,
      0
    );
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

    const pizzaPersonalizada = {
      pizza,
      tamano,
      ingredientes,
      precioTotal,
    };

    navigation.navigate("PizzaSeleccionada", {
      pizzaPersonalizada,
      index,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={40} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../assets/pizza_icon.png")}
          style={styles.logo}
        />
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="notifications" size={40} color="black" />
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
              <Text>
                {t} (+${preciosTamano[t]})
              </Text>
            </View>
          ))}
        </RadioButton.Group>

        <Text style={styles.subtitulo}>Ingredientes adicionales:</Text>
        {ingredientesDisponibles.map((item) => (
          <View key={item.nombre} style={styles.checkboxItem}>
            <Checkbox
              status={
                ingredientes.find((i) => i.nombre === item.nombre)
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => toggleIngrediente(item)}
            />
            <Text>
              {item.nombre} (+${item.precio})
            </Text>
          </View>
        ))}

        <Text style={styles.total}>
          Precio total: ${precioTotal.toFixed(2)}
        </Text>

        <Button
          mode="contained"
          style={styles.boton}
          labelStyle={{ color: "#000", fontWeight: "bold" }}
          onPress={handleAgregar}
        >
          Guardar cambios
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: "#fff",
    elevation: 4,
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  container: {
    padding: 15,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imagenPizza: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  nombrePizza: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  subtitulo: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  boton: {
    marginTop: 20,
    backgroundColor: "yellow",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
});
