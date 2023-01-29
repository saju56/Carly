import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, Pressable, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Montserrat_400Regular, useFonts } from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Token } from "../App";

type MenuViewProps = NativeStackScreenProps<RootStackParamList, 'Menu'>

export default function MenuView({route, navigation} : MenuViewProps) {
  const [attributes, setAttributes] = useState(route.params)

  const handleLogout = async () => {
    await fetch('https://carly-backend-app.azurewebsites.net/authenticate/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${attributes.token.jwttoken}`
      },
    }).then((response) => {
      if (response.ok){
        return response
      }
      else{
        throw new Error("ERROR " + response.status)
      }
    }).then(() => {
      setAttributes({ token : {jwttoken: ""}, isAdmin: false, isLoggedIn: false})
      console.log("Success logging out.")
    }).catch((e) => {
      console.log("Error when trying to log out: " + e)
      setAttributes({ ...attributes, isLoggedIn: true})
    })
  };


  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      if (!attributes.isLoggedIn) {
        return;
      }

      e.preventDefault();

      Alert.alert(
        'Would you like to log out?',
        '',
        [
          { text: "No", style: 'cancel', onPress: () => {} },
          {
            text: 'Yes, log me out.',
            style: 'destructive',
            onPress: () => {
              handleLogout()
              navigation.dispatch(e.data.action)
            },
          },
        ]
      );
    }), [navigation]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>carly</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Cars', route.params)}
      >
        <Text style={styles.loginText}>cars</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Bookings', route.params)}
      >
        <Text style={styles.loginText}>bookings</Text>
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
    width: "100%",
  },
  logo: {
    fontSize: 64,
    padding: 20,
    letterSpacing: 16,
    textShadowColor: "white",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 80
  },
  button: {
    height: 85,
    width: 350,
    margin: 12,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "white",
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
    fontWeight: '600'
  },
});
