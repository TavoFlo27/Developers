import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import InicioSesion from "../screens/InicioSesion";
import Registro from "../screens/Registro";
import MenuPizzas from "../screens/MenuPizzas";
import PersonalizacionPizza from "../screens/PersonalizacionPizza";
import PizzaSeleccionada from "../screens/PizzaSeleccionada";
import Pago from "../screens/Pago";
import InformacionPedido from "../screens/InformacionPedido";
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InicioSesion">
        <Stack.Screen
          name="InicioSesion"
          component={InicioSesion}
          options={{ title: "Inicio de Sesión" }}
        />
        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{ title: "Registro" }}
        />
        <Stack.Screen
          name="MenuPizzas"
          component={MenuPizzas}
          options={{ title: "Menú de Pizzas" }}
        />
        <Stack.Screen
          name="PersonalizacionPizza"
          component={PersonalizacionPizza}
          options={{ title: "Personalización de Pizza" }}
        />
        <Stack.Screen
          name="PizzaSeleccionada"
          component={PizzaSeleccionada}
          options={{ title: "Pizza Seleccionada" }}
        />
        <Stack.Screen
          name="Pago"
          component={Pago}
          options={{ title: "Pago del Pedido" }}
        />
        <Stack.Screen
          name="InformacionPedido"
          component={InformacionPedido}
          options={{ title: "Seguimiento del Pedido" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
