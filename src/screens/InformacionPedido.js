import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import HeaderBar from "../navigation/Header.js";

export default function InformacionPedido({ route }) {
  const usuario = route?.params?.usuario || null;
  const [pedido, setPedido] = useState(null);
  const [estado, setEstado] = useState('');
  const estados = ['Preparando', 'En camino', 'Entregado'];

  useEffect(() => {
    const obtenerUltimoPedido = async () => {
      if (!usuario?.usuario) return;
      try {
        const querySnapshot = await getDocs(collection(db, 'pedidos'));
        const pedidosUsuario = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(p => p.usuario?.usuario === usuario.usuario)
          .sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds); // más reciente

        if (pedidosUsuario.length > 0) {
          setPedido(pedidosUsuario[0]);
          setEstado(pedidosUsuario[0].estado || '');
        }
      } catch (error) {
        console.error('Error al obtener pedido del usuario:', error);
      }
    };

    obtenerUltimoPedido();
  }, [usuario]);

  const getEstiloEstado = (nombreEstado) => {
    const indexActual = estados.indexOf(estado);
    const indexBoton = estados.indexOf(nombreEstado);
    let backgroundColor = '#f2f2f2';

    if (estado === 'Entregado') backgroundColor = '#90ee90';
    else if (indexBoton < indexActual) backgroundColor = '#90ee90';
    else if (indexBoton === indexActual) backgroundColor = 'orange';

    return {
      ...styles.botonEstado,
      backgroundColor,
      borderColor: '#000',
      borderWidth: 1,
    };
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderBar usuario={usuario} carrito={route?.params?.carrito || []} />

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

        {pedido ? (
          <>
            <Text style={[styles.subtitulo, { marginTop: 30 }]}>DETALLE DEL PEDIDO</Text>
            {pedido.carrito?.map((pizza, index) => (
              <View key={index} style={styles.pizzaCard}>
                <Text style={styles.texto}>
                  <Text style={{ fontWeight: 'bold' }}>Pizza {index + 1}:</Text> {pizza.pizza?.nombre || 'Sin nombre'}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ fontWeight: 'bold' }}>Ingredientes:</Text> {pizza.pizza?.ingredientes}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ fontWeight: 'bold' }}>Tamaño:</Text> {pizza.tamano || '-'}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ fontWeight: 'bold' }}>Ingredientes adicionales:</Text>{' '}
                  {pizza.ingredientes?.length > 0
                    ? pizza.ingredientes.map(i => i.nombre).join(', ')
                    : 'Sin adicionales'}
                </Text>
                <Text style={styles.texto}>
                  <Text style={{ fontWeight: 'bold' }}>Subtotal:</Text> ${pizza.precioTotal?.toFixed(2) || '0.00'}
                </Text>
              </View>
            ))}

            <Text style={[styles.subtitulo, { marginTop: 30 }]}>INFORMACIÓN DEL USUARIO</Text>
            <View style={styles.datosUsuario}>
              <Text style={styles.datoTitulo}>NOMBRE:</Text><Text style={styles.datoValor}>{usuario.nombre}</Text>
              <Text style={styles.datoTitulo}>TELÉFONO:</Text><Text style={styles.datoValor}>{usuario.telefono}</Text>
              <Text style={styles.datoTitulo}>DOMICILIO:</Text><Text style={styles.datoValor}>{usuario.domicilio}</Text>
            </View>
          </>
        ) : (
          <Text style={{ fontSize: 16, marginTop: 20 }}>No hay pedidos recientes.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  pizzaCard: {
    backgroundColor: '#e3e3e3',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    width: '100%',
  },
  texto: {
    fontSize: 16,
    marginVertical: 2,
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
