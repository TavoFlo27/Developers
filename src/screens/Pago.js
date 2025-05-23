import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Button, Provider as PaperProvider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function Pago({ route, navigation }) {
  const { pizza, tamano, ingredientes, precioTotal } = route.params;
  const [metodoPago, setMetodoPago] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [pagoProcesado, setPagoProcesado] = useState(false);

  const handlePagar = () => {
    if (!metodoPago) {
      Alert.alert("Error", "Debe seleccionar un método de pago");
      return;
    }

    setPagoProcesado(true);
    Alert.alert("Pago exitoso", `Se ha procesado el pago por $${precioTotal.toFixed(2)}`);
  };

  const handleTicket = () => {
    Alert.alert(
      "Ticket generado",
      `Pizza: ${pizza.nombre}\nTamaño: ${tamano}\nIngredientes: ${
        ingredientes.length > 0
          ? ingredientes.map((i) => i.nombre).join(", ")
          : "Sin adicionales"
      }\nMétodo de pago: ${metodoPago}\nTotal: $${precioTotal.toFixed(2)}`
    );
  };

  return (
    <PaperProvider>
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

        <View style={styles.container}>
          <View style={styles.titleRow}>
            <View style={styles.shadowBackground}>
              <Text style={styles.titulo}>MÉTODO DE PAGO</Text>
            </View>
            <Ionicons name="card-outline" size={32} color="black" style={styles.iconTerminal} />
          </View>

          <TouchableOpacity
            onPress={() => setDialogVisible(true)}
            style={styles.selector}
          >
            <Text style={styles.selectorText}>
              {metodoPago ? metodoPago.toUpperCase() : "SELECCIONAR"}
            </Text>
            <Ionicons name="chevron-down" size={24} color="black" />
          </TouchableOpacity>

          <Modal
            visible={dialogVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setDialogVisible(false)}
          >
            <Pressable style={styles.modalOverlay} onPress={() => setDialogVisible(false)}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecciona un método de pago</Text>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setMetodoPago("Tarjeta");
                    setDialogVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>PAGO CON TARJETA</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setMetodoPago("Efectivo");
                    setDialogVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>EFECTIVO</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>

          <Button
            mode="contained"
            onPress={handlePagar}
            disabled={!metodoPago}
            style={styles.botonPagar}
          >
            PAGAR PEDIDO
          </Button>

          {pagoProcesado && (
            <Button
              mode="contained"
              onPress={handleTicket}
              style={styles.botonTicket}
            >
              TICKET
            </Button>
          )}
        </View>
      </SafeAreaView>
    </PaperProvider>
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
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  shadowBackground: {
    backgroundColor: "yellow",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "yellow",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  iconTerminal: {
    marginLeft: 10,
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  selectorText: {
    fontSize: 16,
    color: "black",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalText: {
    fontSize: 16,
  },
  botonPagar: {
  backgroundColor: "green",
  paddingHorizontal: 24,
  paddingVertical: 10,
  borderRadius: 12,
  borderWidth: 2,
  alignSelf: "center",
},

  botonTicket: {
    backgroundColor: "blue",
    marginTop: 15,
    width: "100%",
  },
});
