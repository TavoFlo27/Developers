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
  const { carrito = [], nuevaPizza, usuario } = route.params || {};

  const [carritoActualizado, setCarritoActualizado] = React.useState(() => {
    if (nuevaPizza) return [...carrito, nuevaPizza];
    return carrito;
  });

  React.useEffect(() => {
    if (
      route.params?.pizzaPersonalizada &&
      typeof route.params.index === "number"
    ) {
      const nuevoCarrito = [...carritoActualizado];
      if (nuevoCarrito[route.params.index]) {
        nuevoCarrito[route.params.index] = route.params.pizzaPersonalizada;
        setCarritoActualizado(nuevoCarrito);
      }
    }
  }, [route.params?.pizzaPersonalizada]);

  const pizzasValidas = carritoActualizado.filter(
    (item) =>
      item && item.pizza && item.tamano && item.ingredientes && item.precioTotal
  );

  const handlePagar = () => {
    navigation.navigate("Pago", { carrito: pizzasValidas, usuario });
  };

  const handleAgregarOtra = () => {
    navigation.navigate("MenuPizzas", { carrito: pizzasValidas, usuario });
  };

  const handleEliminarPizza = (index) => {
    const nuevoCarrito = carritoActualizado.filter((_, i) => i !== index);
    setCarritoActualizado(nuevoCarrito);
    if (nuevoCarrito.length === 0) {
      navigation.navigate("MenuPizzas", { carrito: [], usuario });
    }
  };

  if (pizzasValidas.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay pizzas seleccionadas.</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("MenuPizzas", { usuario })}
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

      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {pizzasValidas.map((pizzaItem, index) => (
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

                <Text style={styles.precio}>
                  Total: ${pizzaItem.precioTotal.toFixed(2)}
                </Text>

                <Button
                  mode="contained"
                  style={[styles.botonPersonalizar, { backgroundColor: "#FF9800" }]}
                  labelStyle={styles.botonLabelNegro}
                  onPress={() =>
                    navigation.navigate("PersonalizacionPizza", {
                      pizza: pizzaItem.pizza,
                      tamano: pizzaItem.tamano,
                      ingredientes: pizzaItem.ingredientes,
                      index: index,
                      carrito: pizzasValidas,
                      usuario,
                    })
                  }
                >
                  ✏
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
            disabled={pizzasValidas.length === 0}
            labelStyle={styles.botonLabelNegro}
          >
            MÉTODO DE PAGO
          </Button>
        </View>
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
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollContent: {
    paddingBottom: 20,
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
  botonPersonalizar: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
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
