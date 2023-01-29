import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginView from "./views/LoginView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminMenuView from "./views/AdminMenuView";
import AdminBookingsView from "./views/AdminBookingsView";
import { createContext, useContext } from "react";
import AdminCarsView from "./views/AdminCarsView";

export type RootStackParamList = {
  Login: undefined,
  Menu: undefined,
  Bookings: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Context = createContext({ jwtToken: "", isAdmin: false })

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Context.Provider value={{jwtToken: "", isAdmin: false}}>
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen name="Menu" component={AdminMenuView} />
          <Stack.Screen name="Bookings" component={AdminBookingsView} />
        </Context.Provider>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
