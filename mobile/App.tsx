import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginView from "./views/LoginView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuView from "./views/MenuView";
import BookingsView from "./views/BookingsView";
import { createContext, useContext, useState } from "react";
import CarsView from "./views/CarsView";

export type RootStackParamList = {
  Login: UserAttributes,
  Menu: UserAttributes,
  Bookings: UserAttributes,
  Cars: UserAttributes
}

export type Token = {
  jwttoken : String
}

export type UserAttributes = {
  token: Token,
  isAdmin: Boolean
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Context = createContext<UserAttributes>({ token: { jwttoken : "" }, isAdmin: false })

export default function App() {
  const [token, setToken] = useState<Token>({jwttoken : ""})
  const [isAdmin, setIsAdmin] = useState(false)


  return (
    <Context.Provider value={{token: token, isAdmin: isAdmin}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen name="Menu" component={MenuView} />
          <Stack.Screen name="Bookings" component={BookingsView} />
          <Stack.Screen name="Cars" component={CarsView} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
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
