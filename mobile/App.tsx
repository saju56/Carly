import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginView from "./views/LoginView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminMenuView from "./views/AdminMenuView";
import AdminBookingsView from "./views/AdminBookingsView";
import AdminCarsView from "./views/AdminCarsView";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen
          name="Login"
          component={LoginView}
        />
        <Stack.Screen name="AdminMenu" component={AdminMenuView} />
        <Stack.Screen name="AdminBookings" component={AdminBookingsView} />
        <Stack.Screen name="AdminCars" component={AdminCarsView} />
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
