import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function InformacionPedido({ navigation, route }) {
  const [estado, setEstado] = useState('Preparando');

  const datosUsuario = route?.params?.usuario || null;
  const pedidoId = route?.params?.pedidoId || null;

  useEffect(() => {
    const timer1 = setTimeout(() => {
      actualizarEstado('En camino');
    }, 10 * 60 * 1000); // 10 minutos

    const timer2 = setTimeout(() => {
      actualizarEstado('Entregado');
    }, 20 * 60 * 1000); // 20 minutos

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const actualizarEstado = async (nuevoEstado) => {
    setEstado(nuevoEstado);
    if (pedidoId) {
      try {
        const pedidoRef = doc(db, 'pedidos', pedidoId);
        await updateDoc(pedidoRef, { estado: nuevoEstado });
      } catch (error) {
        console.error('Error al actualizar estado del pedido:', error);
      }
    }
  };

  const getEstiloEstado = (actual) => ({
    ...styles.botonEstado,
    backgroundColor: estado === actual ? '#90ee90' : '#f2f2f2',
    borderColor: '#000',
    borderWidth: 1,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={50} color="black" />
        </TouchableOpacity>
        <Image
          source={require('../assets/pizza_icon.png')}
          style={styles.logo}
        />
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="notifications" size={50} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleRow}>
          <View style={styles.shadowBackground}>
            <Text style={styles.titulo}>INFORMACIÓN DEL PEDIDO</Text>
          </View>
        </View>

        <Text style={styles.subtitulo}>ESTADO DEL PEDIDO</Text>

        <View style={getEstiloEstado('Preparando')}>
          <Text style={estado === 'Preparando' ? styles.estadoActivo : styles.estado}>
            PREPARANDO...
          </Text>
        </View>
        <View style={getEstiloEstado('En camino')}>
          <Text style={estado === 'En camino' ? styles.estadoActivo : styles.estado}>
            EN CAMINO...
          </Text>
        </View>
        <View style={getEstiloEstado('Entregado')}>
          <Text style={estado === 'Entregado' ? styles.estadoActivo : styles.estado}>
            ENTREGADO...
          </Text>
        </View>

        <Text style={[styles.subtitulo, { marginTop: 40 }]}>INFORMACIÓN DEL USUARIO</Text>

        {datosUsuario ? (
          <View style={styles.datosUsuario}>
            <Text style={styles.datoTitulo}>NOMBRE:</Text><Text style={styles.datoValor}>{datosUsuario.nombre}</Text>
            <Text style={styles.datoTitulo}>TELÉFONO:</Text><Text style={styles.datoValor}>{datosUsuario.telefono}</Text>
            <Text style={styles.datoTitulo}>DOMICILIO:</Text><Text style={styles.datoValor}>{datosUsuario.domicilio}</Text>
          </View>
        ) : (
          <Text>Cargando información del usuario...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: '#fff',
    elevation: 4,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  container: {
    padding: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  shadowBackground: {
    backgroundColor: 'yellow',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: 'yellow',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginVertical: 10,
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
  datosUsuario: {
    marginTop: 10,
    width: '100%',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  datoTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  datoValor: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
});
