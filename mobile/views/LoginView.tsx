import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import { RootStackParamList } from "../App";
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
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type LoginViewProps = NativeStackScreenProps<RootStackParamList, 'Login'>

type Credentials = {
  username: String,
  password: String
}

export default function LoginView(props: LoginViewProps) {
  const navigation = useNavigation()
  const context = useContext(Context)
  
  const [credentials, setCredentials] = useState<Credentials>({ username : "", password : "" })
  const [credInvalid, setCredInvalid] = useState(false)
  const [store, setStore] = useState(context)

  const handleLogin = async () => {
    setCredInvalid(true)
    await fetch('http://192.168.1.10:8080/authenticate', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => {
      if (response.ok)
          return response.json()
      else{
        throw new Error("ERROR " + response.status)
      }
    }).then((token) => {
      setStore({jwtToken : token, isAdmin: store.isAdmin})
      setCredInvalid(false)
    }).catch((e) => {
      setCredInvalid(true)
      console.log("Error when trying to log in: " + e)
    })
  };

  useEffect(() => {
    if (!credInvalid) {
      props.navigation.navigate('Menu')
    }
  }, [credInvalid])

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>carly</Text>
      <View>
        <View style={styles.usernameInput}>
          <Ionicons name="person-outline" size={30} color="black"/>
          <TextInput placeholder="username" style={styles.textField} onChangeText={(username) => setCredentials({
            username : username,
            password: credentials.password
            })}/>
        </View>
        <View style={styles.usernameInput}>
          <Ionicons name="ios-lock-closed-outline" size={30} color="black"/>
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(password) => setCredentials({
              username : credentials.username,
              password: password
              })}
            style={styles.textField}
          />
        </View>
        { credInvalid ? <Text>{store.jwtToken}</Text> : <></> }
        <Pressable
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DADEEA",
    alignItems: "center",
    justifyContent: "center"
  },
  usernameInput: {
    height: 60,
    width: 320,
    margin: 12,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems:"center",
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
    width: 220,
  },
  logo: {
    fontSize: 64,
    padding: 20,
    letterSpacing: 16,
    textShadowColor: "white",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: "20%",
  },
  button: {
    height: 60,
    width: 320,
    margin: 12,
    padding: 10,
    borderRadius: 50,
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
    fontWeight: '600'
  },
});
