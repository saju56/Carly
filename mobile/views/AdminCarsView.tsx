import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type Car = {
  id: String;
  brand: String;
  model: String;
  status: boolean;
  seats: number;
  doors: number;
  fuelType: String;
  mileage: number;
  vin: number;
  year: number;
  pricePerDay: number;
  city: String;
  bodyType: String;
};

export default function AdminCarsView() {
  const [cars, setCars] = useState<Car[]>([]);

  const getCars = async () => {
    const response = await fetch("http://192.168.0.213:8080/logic/api/cars");
    const data = await response.json();
    setCars(data);
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{cars}</Text>
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
  header: {
    fontSize: 40,
  },
  headerBold: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
