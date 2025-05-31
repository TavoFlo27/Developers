import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from '../firebaseConfig';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

export default function VistaCajero({ navigation, route }) {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const usuario = route?.params?.usuario || {};

  useEffect(() => {
    if (usuario?.rol !== 'cajero') {
      Alert.alert('Acceso Denegado', 'Esta sección es solo para el cajero');
      navigation.goBack();
      return;
    }

    const obtenerPedidos = async () => {
      try {
        setCargando(true);
        const querySnapshot = await getDocs(collection(db, 'pedidos'));
        const lista = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPedidos(lista);
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
        Alert.alert('Error', 'No se pudieron cargar los pedidos');
      } finally {
        setCargando(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', obtenerPedidos);
    obtenerPedidos();

    return unsubscribe;
  }, [navigation, usuario?.rol]);

  const actualizarEstado = async (pedidoId, nuevoEstado) => {
    try {
      const ref = doc(db, 'pedidos', pedidoId);
      await updateDoc(ref, { estado: nuevoEstado });

      setPedidos(prev =>
        prev.map(p =>
          p.id === pedidoId ? { ...p, estado: nuevoEstado } : p
        )
      );

      Alert.alert('Éxito', 'Estado actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      Alert.alert('Error', 'No se pudo actualizar el estado');
    }
  };

  const eliminarPedido = (pedidoId) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Seguro que deseas eliminar este pedido?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'pedidos', pedidoId));
              setPedidos(prev => prev.filter(p => p.id !== pedidoId));
              Alert.alert('Éxito', 'Pedido eliminado correctamente');
            } catch (error) {
              console.error('Error al eliminar pedido:', error);
              Alert.alert('Error', 'No se pudo eliminar el pedido');
            }
          },
        },
      ]
    );
  };

  // Función para obtener el color de fondo según estado
  const colorFondoEstado = (estado) => {
    switch (estado) {
      case 'Preparando':
        return '#FFF9C4'; // amarillo claro
      case 'En camino':
        return '#FFCC80'; // naranja claro
      case 'Entregado':
        return '#C8E6C9'; // verde claro
      default:
        return '#f1f1f1'; // gris por defecto
    }
  };

  const renderPedido = ({ item }) => (
    <View style={[styles.card, { backgroundColor: colorFondoEstado(item.estado) }]}>
      <Text style={styles.titulo}>Pedido: {item.id}</Text>
      <Text style={styles.texto}>Cliente: {item.usuario?.nombre || 'Desconocido'}</Text>
      <Text style={styles.texto}>Teléfono: {item.usuario?.telefono || '-'}</Text>
      <Text style={styles.texto}>Domicilio: {item.usuario?.domicilio || '-'}</Text>
      <Text style={styles.texto}>Estado actual: {item.estado}</Text>

      <Text style={[styles.titulo, { marginTop: 10 }]}>Detalles de las Pizzas:</Text>
      {item.pizzas && item.pizzas.length > 0 ? (
        item.pizzas.map((pizza, index) => (
          <View key={index} style={styles.pizzaCard}>
            <Text style={styles.texto}>
              <Text style={{ fontWeight: 'bold' }}>Nombre:</Text> {pizza.nombre}
            </Text>
            <Text style={styles.texto}>
              <Text style={{ fontWeight: 'bold' }}>Tamaño:</Text> {pizza.tamaño}
            </Text>
            <Text style={styles.texto}>
              <Text style={{ fontWeight: 'bold' }}>Ingredientes:</Text> {pizza.ingredientes.join(', ')}
            </Text>
            <Text style={styles.texto}>
              <Text style={{ fontWeight: 'bold' }}>Cantidad:</Text> {pizza.cantidad || 1}
            </Text>
            <Text style={styles.texto}>
              <Text style={{ fontWeight: 'bold' }}>Precio:</Text> ${pizza.precio?.toFixed(2) || '0.00'}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.texto}>No hay pizzas en este pedido.</Text>
      )}

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={item.estado}
          onValueChange={(nuevoEstado) =>
            actualizarEstado(item.id, nuevoEstado)
          }
          style={styles.picker}
        >
          <Picker.Item label="Preparando" value="Preparando" />
          <Picker.Item label="En camino" value="En camino" />
          <Picker.Item label="Entregado" value="Entregado" />
        </Picker>
      </View>

      {/* Mostrar botón eliminar solo si está entregado */}
      {item.estado === 'Entregado' && (
        <TouchableOpacity
          style={styles.botonEliminar}
          onPress={() => eliminarPedido(item.id)}
        >
          <Text style={styles.textoBotonEliminar}>Eliminar Pedido</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={40} color="#000" />
        </TouchableOpacity>

        <Image
          source={require('../assets/pizza_icon.png')}
          style={styles.logoGrande}
        />

        <TouchableOpacity onPress={() => alert('Notificaciones')}>
          <Icon name="bell" size={40} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.header}>PEDIDOS REGISTRADOS</Text>
        {cargando ? (
          <Text>Cargando pedidos...</Text>
        ) : pedidos.length === 0 ? (
          <Text>No hay pedidos registrados.</Text>
        ) : (
          <FlatList
            data={pedidos}
            keyExtractor={(item) => item.id}
            renderItem={renderPedido}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: '#fff',
    elevation: 4,
  },
  logoGrande: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 16,
    marginVertical: 2,
  },
  pizzaCard: {
    backgroundColor: '#e3e3e3',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  pickerContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  botonEliminar: {
    marginTop: 15,
    backgroundColor: '#e53935',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotonEliminar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
