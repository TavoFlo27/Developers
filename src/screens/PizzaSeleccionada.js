import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-paper";

export default function PizzaSeleccionada({ route, navigation }) {
  const { carrito = [], nuevaPizza } = route.params || {};

  const [carritoActualizado, setCarritoActualizado] = React.useState(() => {
    if (nuevaPizza) {
      return [...carrito, nuevaPizza];
    }
    return carrito;
  });

  const pizzaActual = carritoActualizado[carritoActualizado.length - 1];

  const handlePagar = () => {
    navigation.navigate("Pago", {
      carrito: carritoActualizado,
    });
  };

  const handlePersonalizar = () => {
    if (!pizzaActual) return;
    navigation.navigate("PersonalizacionPizza", {
      pizza: pizzaActual.pizza,
      tamano: pizzaActual.tamano,
      ingredientes: pizzaActual.ingredientes,
      precioBase: parseFloat(pizzaActual.pizza.precio.replace("$", "")),
      carrito: carritoActualizado,
    });
  };

  const handleAgregarOtra = () => {
    navigation.navigate("MenuPizzas", {
      carrito: carritoActualizado,
    });
  };

  const handleEliminarPizza = (index) => {
    const nuevoCarrito = carritoActualizado.filter((_, i) => i !== index);
    setCarritoActualizado(nuevoCarrito);

    if (nuevoCarrito.length === 0) {
      navigation.navigate("MenuPizzas", { carrito: [] });
    }
  };

  if (carritoActualizado.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay pizzas seleccionadas.</Text>
        <Button mode="contained" onPress={() => navigation.navigate("MenuPizzas")}>
          Agregar Pizza
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={handleAgregarOtra}>
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

      <View style={styles.seleccionadaBar}>
        <TouchableOpacity onPress={handleAgregarOtra}>
          <Icon name="cart-plus" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.pizzaSeleccionadaTexto}>PIZZAS SELECCIONADAS</Text>
      </View>

      <ScrollView style={styles.listaPizzas}>
        {carritoActualizado.map((pizzaItem, index) => (
          <View key={index} style={styles.pizzaItem}>
            <Image source={pizzaItem.pizza.imagen} style={styles.pizzaImage} />
            <View style={styles.pizzaInfo}>
              <View style={styles.pizzaTop}>
                <Text style={styles.nombre}>{pizzaItem.pizza.nombre}</Text>
                <TouchableOpacity onPress={() => handleEliminarPizza(index)}>
                  <Icon name="cart-minus" size={28} color="black" />
                </TouchableOpacity>
              </View>

              <Text style={styles.detalle}>Tamaño: {pizzaItem.tamano}</Text>

              <Text style={styles.detalle}>Ingredientes:</Text>
              <Text style={styles.ingrediente}>- {pizzaItem.pizza.ingredientes}</Text>

              <Text style={styles.detalle}>Ingredientes adicionales:</Text>
              {pizzaItem.ingredientes.length > 0 ? (
                pizzaItem.ingredientes.map((item, i) => (
                  <Text key={i} style={styles.ingrediente}>
                    - {item.nombre}
                  </Text>
                ))
              ) : (
                <Text style={styles.ingrediente}>Sin ingredientes adicionales</Text>
              )}

              <Text style={styles.precio}>Total: ${pizzaItem.precioTotal.toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.botonesContainer}>
        <Button
          mode="contained"
          style={[styles.boton, { backgroundColor: "#FFD700" }]}
          onPress={handlePersonalizar}
          disabled={!pizzaActual}
          labelStyle={styles.botonLabelNegro}
        >
          PERSONALIZAR PIZZA
        </Button>

        <Button
          mode="contained"
          style={[styles.boton, { backgroundColor: "#4CAF50" }]}
          onPress={handlePagar}
          disabled={carritoActualizado.length === 0}
          labelStyle={styles.botonLabelNegro}
        >
          MÉTODO DE PAGO
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
  seleccionadaBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  pizzaSeleccionadaTexto: {
    fontSize: 30,
    fontFamily: "OpenSans",
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000",
  },
  listaPizzas: {
    maxHeight: 400,
    marginBottom: 10,
  },
  pizzaItem: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  pizzaImage: {
    width: 170,
    height: 170,
    borderRadius: 17,
  },
  pizzaInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  pizzaTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nombre: {
    fontSize: 25,
    fontFamily: "OpenSans",
    color: "#000",
  },
  detalle: {
    fontSize: 18,
    marginTop: 4,
  },
  ingrediente: {
    fontSize: 16,
    marginLeft: 10,
  },
  precio: {
    fontSize: 25,
    color: "green",
    fontWeight: "bold",
    marginTop: 10,
  },
  botonesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    gap: 12,
  },
  boton: {
    alignSelf: "center",
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 30,
  },
  botonLabelNegro: {
    color: "#000",
    fontSize: 25,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
});