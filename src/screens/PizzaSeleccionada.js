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

  const handlePagar = () => {
    navigation.navigate("Pago", {
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

  const handlePersonalizar = (pizzaItem, index) => {
    navigation.navigate("PersonalizacionPizza", {
      pizza: pizzaItem.pizza,
      tamano: pizzaItem.tamano,
      ingredientes: pizzaItem.ingredientes,
      precioBase: parseFloat(pizzaItem.pizza.precio.replace("$", "")),
      carrito: carritoActualizado,
      index,
    });
  };

  if (carritoActualizado.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay pizzas seleccionadas.</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("MenuPizzas")}
        >
          Agregar Pizza
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={handleAgregarOtra}>
          <Icon name="menu" size={40} color="#000" />
        </TouchableOpacity>

        <Image
          source={require("../assets/pizza_icon.png")}
          style={styles.logoGrande}
        />

        <TouchableOpacity onPress={() => alert("Notificaciones")}>
          <Icon name="bell" size={40} color="#000" />
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

              <Text style={styles.detalle}>Ingredientes base:</Text>
              <Text style={styles.ingrediente}>
                - {pizzaItem.pizza.ingredientes}
              </Text>

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

              <Text style={styles.precio}>
                Total: ${pizzaItem.precioTotal.toFixed(2)}
              </Text>

              <Button
                mode="contained"
                style={styles.botonPersonalizar}
                labelStyle={{ color: "#000", fontWeight: "bold" }}
                onPress={() => handlePersonalizar(pizzaItem, index)}
              >
                Personalizar
              </Button>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.botonesContainer}>
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
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  seleccionadaBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  pizzaSeleccionadaTexto: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000",
  },
  listaPizzas: {
    paddingHorizontal: 10,
  },
  pizzaItem: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  pizzaImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  detalle: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: "500",
  },
  ingrediente: {
    fontSize: 14,
    marginLeft: 10,
  },
  precio: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
    marginTop: 10,
  },
  botonesContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  boton: {
    alignSelf: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
  },
  botonLabelNegro: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  botonPersonalizar: {
    backgroundColor: "#FFD700",
    marginTop: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
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
