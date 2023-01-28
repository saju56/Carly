import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";


export default function LoginView() {
  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

