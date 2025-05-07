import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

export default function InformacionPedido() {
  const [estado, setEstado] = useState('Preparando'); // Estado inicial simulado

  // Simulación del cambio de estado cada cierto tiempo (solo para pruebas)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (estado === 'Preparando') setEstado('En camino');
      else if (estado === 'En camino') setEstado('Entregado');
    }, 5000); // Cambia de estado cada 5 segundos

    return () => clearTimeout(timer);
  }, [estado]);

  const getEstiloEstado = (actual) => {
    return {
      ...styles.botonEstado,
      backgroundColor: estado === actual ? '#90ee90' : '#f2f2f2',
      borderColor: '#000',
      borderWidth: 1,
    };
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Pizza Developer’s Ing" />
        <Appbar.Action icon="bell" onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.container}>
        <Text style={styles.titulo}>INFORMACIÓN DEL PEDIDO</Text>

        <View style={getEstiloEstado('Preparando')}>
          <Text style={estado === 'Preparando' ? styles.estadoActivo : styles.estado}>PREPARANDO...</Text>
        </View>
        <View style={getEstiloEstado('En camino')}>
          <Text style={estado === 'En camino' ? styles.estadoActivo : styles.estado}>EN CAMINO...</Text>
        </View>
        <View style={getEstiloEstado('Entregado')}>
          <Text style={estado === 'Entregado' ? styles.estadoActivo : styles.estado}>ENTREGADO...</Text>
        </View>
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
    padding: 25,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  botonEstado: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  estado: {
    fontSize: 16,
    color: 'black',
  },
  estadoActivo: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
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
