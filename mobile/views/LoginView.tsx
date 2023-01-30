import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserAttributes } from "../App";
import { Token } from "../App";
import { RootStackParamList } from "../App";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

type LoginViewProps = NativeStackScreenProps<RootStackParamList, 'Login'>

type Credentials = {
  username: string,
  password: string
}

type Validations = {
  unRequire: Boolean,
  pwRequire: Boolean
}

export default function LoginView({route, navigation} : LoginViewProps) {
  const [credentials, setCredentials] = useState<Credentials>({ username : "", password : "" })
  const [credInvalid, setCredInvalid] = useState(false)
  const [attributes, setAttributes] = useState<UserAttributes>({ token: { jwttoken : "" }, isAdmin: true, isLoggedIn: false})
  const [validator, setValidator] = useState<Validations>({ unRequire: false, pwRequire: false })

  useEffect(()=>{
    if (credentials.password === "" && credentials.username === "")
      setValidator({ pwRequire: true, unRequire: true })
    else if (credentials.username === "")
      setValidator({ pwRequire: false, unRequire: true })
    else if (credentials.password === "")
      setValidator({ pwRequire: true, unRequire: false })
    else
      setValidator({ pwRequire: false, unRequire: false })
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

  useFocusEffect(
    useCallback(() => {
      return () => {
        setAttributes({ token : {jwttoken: ""}, isAdmin: false, isLoggedIn: false})
        setCredentials({
          username: "",
          password: ""
        })
        setValidator({ unRequire: false, pwRequire: false })
      }
    }, [navigation])
  )

  useEffect(() => {
    if (!credInvalid && attributes.isLoggedIn)
      navigation.navigate('Menu', attributes)
  }, [credInvalid, attributes.isLoggedIn])

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>carly</Text>
      <View style={styles.containerButtons}>
        <View style={styles.usernameInput}>
          <Ionicons name="person-outline" color="black" style={styles.buttonIcons}/>
          <TextInput placeholder="username" textAlign={'center'} style={styles.textField} onChangeText={(username) => {
            setCredentials({
              username: username,
              password: credentials.password
            })
          }} value={credentials.username}/>
        </View>
        { validator.unRequire ? <Text style={styles.textFailure}>Username field cannot be empty.</Text> : <></> }
        <View style={styles.usernameInput}>
          <Ionicons name="ios-lock-closed-outline" color="black" style={styles.buttonIcons}/>
          <TextInput placeholder="password" secureTextEntry={true} style={styles.textField}  textAlign={'center'} onChangeText={(password) => {
            setCredentials({
            username: credentials.username,
            password: password
            })
          }} value={credentials.password}/>
        </View>
        { validator.pwRequire ? <Text style={styles.textFailure}>Password field cannot be empty.</Text> : <></> }
        {
          attributes.isLoggedIn ? <Text style={styles.textSuccess}>Success!</Text> : ( credInvalid ? <Text style={styles.textFailure}>Invalid credentials. Try again.</Text> : <></> ) 
        }
        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [{ backgroundColor: pressed ? 'white' : 'lightblue' }, styles.button ]}>
          {({ pressed }) => (
            <>
              <Text style={[{ color: pressed ? 'lightblue' : 'white' }, styles.loginText]}>
                log in
              </Text>
              <MaterialCommunityIcons name="arrow-right" style={[{ color: pressed ? 'lightblue' : 'white' }, styles.buttonIconsArrow]}></MaterialCommunityIcons>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    margin: 'auto',
    backgroundColor: "#DADEEA",
    alignItems: "center",
    justifyContent: "center",
    width: '100%'
  },
  containerButtons: {
    width: '100%'
  },
  buttonIcons: {
    alignSelf: 'center',
    fontSize: 24,
    position: 'absolute',
    left: 20
  },
  buttonIconsArrow: {
    alignSelf: 'center',
    fontSize: 30,
    position: 'absolute',
    right: 30,
  },
  usernameInput: {
    height: 60,
    margin: 12,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 22,
    width: '100%'
  },
  logo: {
    fontSize: 64,
    padding: 20,
    letterSpacing: 16,
    textShadowColor: "white",
    textShadowOffset: { width: 3, height: 0 },
    textShadowRadius: 4,
    marginBottom: "20%",
  },
  button: {
    height: 80,
    width: '80%',
    margin: 12,
    padding: 10,
    borderRadius: 50,
    display: "flex",
    alignSelf: 'center',
    flexDirection: 'row',
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
    fontSize: 28,
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
