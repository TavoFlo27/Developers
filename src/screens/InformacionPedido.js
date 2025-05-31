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
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function InformacionPedido({ navigation, route }) {
  const [estado, setEstado] = useState('');
  const datosUsuario = route?.params?.usuario || null;
  const pedidoId = route?.params?.pedidoId || null;

  const estados = ['Preparando', 'En camino', 'Entregado'];

  useEffect(() => {
    let interval;

    const verificarEstado = async () => {
      if (!pedidoId) return;
      try {
        const pedidoRef = doc(db, 'pedidos', pedidoId);
        const pedidoSnap = await getDoc(pedidoRef);
        if (pedidoSnap.exists()) {
          const data = pedidoSnap.data();
          if (data.estado !== estado) {
            setEstado(data.estado);
          }
        }
      } catch (error) {
        console.error('Error al verificar estado del pedido:', error);
      }
    };

    interval = setInterval(verificarEstado, 1000); // cada segundo

    return () => clearInterval(interval);
  }, [pedidoId, estado]);

  const getEstiloEstado = (nombreEstado) => {
  const indexActual = estados.indexOf(estado);
  const indexBoton = estados.indexOf(nombreEstado);

  let backgroundColor = '#f2f2f2'; // gris claro por defecto

  if (estado === 'Entregado') {
    backgroundColor = '#90ee90'; // todos en verde
  } else if (indexBoton < indexActual) {
    backgroundColor = '#90ee90'; // verde si ya pasó
  } else if (indexBoton === indexActual) {
    backgroundColor = 'orange'; // naranja si es el actual
  }

  return {
    ...styles.botonEstado,
    backgroundColor,
    borderColor: '#000',
    borderWidth: 1,
  };
};


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

        {estados.map((e) => (
          <View key={e} style={getEstiloEstado(e)}>
            <Text style={styles.estado}>{e.toUpperCase()}...</Text>
          </View>
        ))}

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
