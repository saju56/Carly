import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  View,
  Image,
  Text,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function LoginView() {

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>carly</Text>
      <View style={styles.usernameInput}>
        <Ionicons name="person-outline" size={40} color="black" />
        <TextInput placeholder="username" style={styles.textField} />
      </View>
      <View style={styles.usernameInput}>
        <Ionicons name="ios-lock-closed-outline" size={40} color="black" />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          style={styles.textField}
        />
      </View>
      <Pressable style={styles.button} onPress={() =>
        navigation.navigate('AdminMenu')
      }>
        <Text style={styles.loginText}>login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DADEEA",
    alignItems: "center",
    justifyContent: "center",
  },
  usernameInput: {
    height: 60,
    width: 300,
    margin: 12,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "white",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textField: {
    fontSize: 25,
    marginLeft: 10,
  },
  logo: {
    fontSize: 64,
    padding: 20,
    letterSpacing: 16,
    textShadowColor: "white",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  button: {
    height: 60,
    width: 300,
    margin: 12,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  loginText: {
    letterSpacing: 4,
    fontSize: 25,
  },
});
