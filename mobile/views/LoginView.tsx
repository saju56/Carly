import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";

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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { UserAttributes } from "../App";
import { Token } from "../App";
import { RootStackParamList } from "../App";

type LoginViewProps = NativeStackScreenProps<RootStackParamList, 'Login'>

type Credentials = {
  username: String,
  password: String
}

type Validations = {
  unRequire: Boolean,
  pwRequire: Boolean
}

export default function LoginView(props: LoginViewProps) {
  const [credentials, setCredentials] = useState<Credentials>({ username : "init", password : "init" })
  const [credInvalid, setCredInvalid] = useState(false)
  const [attributes, setAttributes] = useState<UserAttributes>({ token: { jwttoken : "" }, isAdmin: true, isLoggedIn: false})
  const [validator, setValidator] = useState<Validations>({ unRequire: false, pwRequire: false })

  useEffect(()=>{
    if (credentials.username === "")
      setValidator({ ...validator, unRequire: true })
    else
      setValidator({ ...validator, unRequire: false })
  }, [credentials])

  const handleLogin = async () => {
    await fetch('https://carly-backend-app.azurewebsites.net/authenticate', {
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
    }).then((token : Token) => {
      console.log("Success logging in.")
      console.log(token.jwttoken)
      setAttributes({ token : token, isAdmin: attributes.isAdmin, isLoggedIn: true})
      setCredInvalid(false)
    }).catch((e) => {
      console.log("Error when trying to log in: " + e)
      setCredInvalid(true)
      setAttributes({ ...attributes, isLoggedIn: false})
    })
  };

  useEffect(() => {
    if (!credInvalid && attributes.isLoggedIn)
      props.navigation.navigate('Menu', attributes)
  }, [credInvalid, attributes.isLoggedIn])

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>carly</Text>
      <View>
        <View style={styles.usernameInput}>
          <Ionicons name="person-outline" size={30} color="black"/>
          <TextInput placeholder="username" style={styles.textField} onChangeText={(username) => {
            setCredentials({
              username: username,
              password: credentials.password
            })
          }}/>
        </View>
        { validator.unRequire ? <Text style={styles.textFailure}>Username field cannot be empty.</Text> : <></> }
        <View style={styles.usernameInput}>
          <Ionicons name="ios-lock-closed-outline" size={30} color="black"/>
          <TextInput placeholder="password" secureTextEntry={true} style={styles.textField} onChangeText={(password) => {
            setCredentials({
            username: credentials.username,
            password: password
            })
          }}/>
        </View>
        { validator.pwRequire ? <Text style={styles.textFailure}>Password field cannot be empty.</Text> : <></> }
        {
          attributes.isLoggedIn ? <Text style={styles.textSuccess}>Success!</Text> : ( credInvalid ? <Text style={styles.textFailure}>Invalid credentials. Try again.</Text> : <></> ) 
        }
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
    fontSize: 25,
    fontWeight: '600'
  },
  textFailure: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red'
  },
  textSuccess: {
    fontSize: 14,
    textAlign: 'center',
    color: 'green'
  },
});
