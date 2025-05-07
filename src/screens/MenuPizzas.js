import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const pizzas = [
  {
    id: "2",
    nombre: "PEPPERONI",
    ingredientes: "Clasica con extra Pepperoni, y queso mozzarella",
    precio: "$130.00",
    imagen: require("../assets/pizza_pepperoni.png"),
  },
  {
    id: "1",
    nombre: "HAWAIANA",
    ingredientes: "Jamón, piña, queso mozarella",
    precio: "$120.00",
    imagen: require("../assets/pizza_hawaiana.png"),
  },
  {
    id: "3",
    nombre: "MEXICANA",
    ingredientes: "Chorizo, jalapeños, frijoles, y queso mozarrella",
    precio: "$140.00",
    imagen: require("../assets/pizza_mexicana.png"),
  },
  {
    id: "4",
    nombre: "SUPREMA",
    ingredientes: "Pepperoni, champiñones, pimientos, y queso",
    precio: "$150.00",
    imagen: require("../assets/pizza_suprema.png"),
  },
];

export default function MenuPizzas({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.pizzaItem}>
      <Image source={item.imagen} style={styles.pizzaImage} />
      <View style={styles.pizzaInfo}>
        <View style={styles.pizzaTop}>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PizzaSeleccionada", {
                pizza: item,
                tamano: "Familiar",
                ingredientes: [],
                precioTotal: parseFloat(item.precio.replace("$", "")),
              })
            }
          >
            <Icon name="cart-plus" size={28} color="#333" />
          </TouchableOpacity>
        </View>
        <Text style={styles.ingredientes}>{item.ingredientes}</Text>
        <Text style={styles.precio}>{item.precio}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.navigate("PizzaSeleccionada")}>
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

        <Image
          source={require("../assets/pizzas_banner.png")}
          style={styles.banner}
        />
        <Text style={styles.pedidoTitle}>PEDIDO</Text>

        <FlatList
          data={pizzas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
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
  banner: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  pedidoTitle: {
    fontSize: 28,
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "OpenSans",
    color: "#000",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  lista: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  pizzaItem: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
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
    textShadowColor: "#000",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 0.5,
  },
  ingredientes: {
    fontSize: 20,
    marginVertical: 4,
  },
  precio: {
    fontSize: 25,
    color: "green",
    fontWeight: "bold",
  },
});
