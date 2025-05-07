import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Appbar, Button, RadioButton } from 'react-native-paper';

export default function Pago({ route }) {
  const { pizza, tamano, ingredientes, precioTotal } = route.params;
  const [metodoPago, setMetodoPago] = useState('');
  const [pagoProcesado, setPagoProcesado] = useState(false);

  const handlePagar = () => {
    if (!metodoPago) {
      Alert.alert('Error', 'Debe seleccionar un método de pago');
      return;
    }

    // Aquí podrías agregar lógica real de pago
    setPagoProcesado(true);
    Alert.alert('Pago exitoso', `Se ha procesado el pago por $${precioTotal.toFixed(2)}`);
  };

  const handleTicket = () => {
    Alert.alert(
      'Ticket generado',
      `Pizza: ${pizza.nombre}\nTamaño: ${tamano}\nIngredientes: ${
        ingredientes.length > 0
          ? ingredientes.map(i => i.nombre).join(', ')
          : 'Sin adicionales'
      }\nMétodo de pago: ${metodoPago}\nTotal: $${precioTotal.toFixed(2)}`
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Pizza Developer’s Ing" />
        <Appbar.Action icon="bell" onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.container}>
        <Text style={styles.titulo}>Método de Pago</Text>

        <RadioButton.Group onValueChange={setMetodoPago} value={metodoPago}>
          <View style={styles.radio}>
            <RadioButton value="Tarjeta" />
            <Text>Pago con tarjeta</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton value="Efectivo" />
            <Text>Efectivo</Text>
          </View>
        </RadioButton.Group>

        <Button
          mode="contained"
          onPress={handlePagar}
          disabled={!metodoPago}
          style={styles.botonPagar}
        >
          PAGAR PEDIDO
        </Button>

        {pagoProcesado && (
          <Button mode="contained" onPress={handleTicket} style={styles.botonTicket}>
            TICKET
          </Button>
        )}
      </View>

      <View style={styles.menuInferior}>
        <Text style={styles.icono}>🏠</Text>
        <Text style={styles.icono}>🔍</Text>
        <Text style={styles.icono}>📞</Text>
        <Text style={styles.icono}>👤</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    flex: 1,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  botonPagar: {
    backgroundColor: 'green',
    marginTop: 20,
    width: '100%',
  },
  botonTicket: {
    backgroundColor: 'blue',
    marginTop: 15,
    width: '100%',
  },
  menuInferior: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e6e6e6',
    paddingVertical: 10,
  },
  icono: {
    fontSize: 24,
  },
});
