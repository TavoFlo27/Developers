import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Modal,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const HeaderBar = ({ carrito, usuario }) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const rutas = [
    { nombre: "Menú de Pizzas", ruta: "MenuPizzas" },
    { nombre: "Personalización", ruta: "PersonalizacionPizza" },
    { nombre: "Pizza Seleccionada", ruta: "PizzaSeleccionada" },
    { nombre: "Pago del Pedido", ruta: "Pago" },
    { nombre: "Seguimiento Pedido", ruta: "InformacionPedido" },
  ];

  const navegarARuta = (ruta) => {
    setMenuVisible(false);
    navigation.navigate(ruta, { usuario, carrito });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
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

      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuContainer}>
            {rutas.map(({ nombre, ruta }) => (
              <TouchableOpacity
                key={ruta}
                style={styles.menuItem}
                onPress={() => navegarARuta(ruta)}
              >
                <Text style={styles.menuText}>{nombre}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    height: 60,
  },
  logoGrande: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-start",
  },
  menuContainer: {
    backgroundColor: "#fff",
    width: 250,
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 10,
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 18,
  },
});

export default HeaderBar;
