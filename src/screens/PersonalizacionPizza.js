import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { RadioButton, Checkbox, Button, Appbar } from "react-native-paper";

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
  const { pizza } = route.params;
  const [tamano, setTamano] = useState("");
  const [ingredientes, setIngredientes] = useState([]);
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
    Alert.alert("Pizza agregada", `Total: $${precioTotal.toFixed(2)}`);
    // Aquí puedes navegar a la pantalla de revisión o carrito
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Pizza Developer’s Ing" />
        <Appbar.Action icon="bell" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={pizza.imagen} style={styles.imagen} />
        <Text style={styles.titulo}>{pizza.nombre}</Text>

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

        <Button mode="contained" style={styles.boton} onPress={handleAgregar}>
          Agregar al carrito
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  imagen: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  boton: {
    marginTop: 20,
    backgroundColor: "green",
  },
});
