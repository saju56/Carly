import { NavigationContainer } from "@react-navigation/native";
import LoginView from "./views/LoginView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuView from "./views/MenuView";
import BookingsView from "./views/BookingsView";
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
  isAdmin: Boolean,
  isLoggedIn: Boolean
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen name="Menu" component={MenuView} />
          <Stack.Screen name="Bookings" component={BookingsView} />
          <Stack.Screen name="Cars" component={CarsView} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
