import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, Pressable, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Montserrat_400Regular, useFonts } from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Token } from "../App";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

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
      <MaterialCommunityIcons name="car-side"></MaterialCommunityIcons>
      <MaterialCommunityIcons name="car-pickup"></MaterialCommunityIcons>
      <MaterialCommunityIcons name="car-sports"></MaterialCommunityIcons>
      <Pressable
          onPress={() => navigation.navigate('Cars', route.params)}
          style={({ pressed }) => [{ backgroundColor: pressed ? 'black' : 'white' }, styles.button ]}>
          {({ pressed }) => (
            <>
              <MaterialIcons name="directions-car" style={[{ color: pressed ? 'white' : 'black'}, styles.buttonIcons]}></MaterialIcons>
              <Text style={[{ color: pressed ? 'white' : 'black'}, styles.loginText]}>cars</Text>  
            </>
          )}
      </Pressable>
      <Pressable
          onPress={() => navigation.navigate('Bookings', route.params)}
          style={({ pressed }) => [{ backgroundColor: pressed ? 'black' : 'white' }, styles.button ]}>
          {({ pressed }) => (
            <>
              <MaterialCommunityIcons name="calendar-month" style={[{ color: pressed ? 'white' : 'black'}, styles.buttonIcons]}></MaterialCommunityIcons>
              <Text style={[{ color: pressed ? 'white' : 'black'}, styles.loginText]}>bookings</Text>  
            </>
          )}
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
  buttonIcons: {
    alignSelf: 'center',
    fontSize: 30,
    position: 'absolute',
    left: 30
  },
  logo: {
    fontSize: 80,
    padding: 20,
    letterSpacing: 16,
    textShadowColor: "white",
    textShadowOffset: { width: 3, height: 0 },
    textShadowRadius: 3,
    height: '40%'
  },
  button: {
    height: 80,
    width: '80%',
    margin: 12,
    padding: 10,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
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
    letterSpacing: 0,
    fontSize: 25,
    fontWeight: '600'
  },
});
