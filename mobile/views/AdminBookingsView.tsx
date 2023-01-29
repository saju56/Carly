import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

type Booking = {
  id: String;
  carId: String;
  endDate: String;
  startDate: String;
  userId: String;
};

async function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  return await fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as TResponse);
}

export default function AdminBookingsView() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState<String>();

  //   admin so all bookings
  const getBookings = async () => {
    try {
      let response: Booking[] | null = [];
      await request<Booking[]>(
        "http://192.168.0.213:8080/logic/api/bookings"
      ).then((bookings) => (response = bookings));
      setBookings(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.headerTextBold}>current</Text>
          <Text style={styles.headerText}>bookings</Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("AdminMenu")}
        >
          <Text style={styles.menuText}>home</Text>
        </Pressable>
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={bookings}
        renderItem={({ item, index }) =>
          item.id !== selectedId ? (
            <Pressable
              style={styles.listElement}
              onPress={() => setSelectedId(item.id)}
            >
              <Image
                style={{ flex: 0.5, width: 100, height: 60 }}
                source={{
                  uri: `http://192.168.0.213:8080/logic/api/cars/${item.carId}/image2`,
                }}
              />
              <View style={{ flex: 0.7, marginLeft: 10 }}>
                <Text style={styles.headerCarTextBold}>booking no</Text>
                <Text style={styles.headerCarText}>{index + 1}</Text>
              </View>
              <AntDesign name="right" size={40} style={{ margin: 10 }} />
            </Pressable>
          ) : (
            <Pressable
              style={styles_ext.listElement}
              onPress={() => setSelectedId("")}
            >
              <View style={styles_ext.photoName}>
                <Image
                  style={styles_ext.image}
                  source={{
                    uri: `http://192.168.0.213:8080/logic/api/cars/${item.carId}/image2`,
                  }}
                />
                <Text style={styles_ext.headerCarTextBold}>{item.brand}</Text>
                <Text style={styles_ext.headerCarText}>{item.model}</Text>
              </View>
              <View style={styles_ext.info}>
                <View>
                  <Text style={styles_ext.textB}>vin:</Text>
                  <Text style={styles_ext.textB}>year:</Text>
                  <Text style={styles_ext.textB}>mileage:</Text>
                  <Text style={styles_ext.textB}>fuel type:</Text>
                  <Text style={styles_ext.textB}>doors:</Text>
                  <Text style={styles_ext.textB}>seats:</Text>
                </View>
                <View>
                  <Text style={styles_ext.text}>{}</Text>
                  <Text style={styles_ext.text}>{item.year}</Text>
                  <Text style={styles_ext.text}>{item.mileage}</Text>
                  <Text style={styles_ext.text}>{item.fuelType}</Text>
                  <Text style={styles_ext.text}>{item.doors}</Text>
                  <Text style={styles_ext.text}>{item.seats}</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <Text style={{ fontWeight: "bold", fontSize: 40 }}>
                    ${item.pricePerDay}/
                  </Text>
                  <Text style={{ fontWeight: "normal", fontSize: 25 }}>
                    day
                  </Text>
                </View>
                <AntDesign name="up" size={40} style={{ margin: 10 }} />
              </View>
            </Pressable>
          )
        }
        maxToRenderPerBatch={7}
        initialNumToRender={15}
      />
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
  headerText: {
    fontSize: 35,
  },
  headerTextBold: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: -15,
  },
  infoText: {
    fontSize: 14,
  },
  topBar: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  button: {
    width: 150,
    height: 60,
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: "100%",
    marginTop: 20,
  },
  menuText: {
    fontSize: 25,
    fontWeight: "600",
  },
  listElement: {
    height: 110,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    flexDirection: "row",
    alignItems: "center",
  },
  listContainer: {
    paddingHorizontal: "5%",
    paddingVertical: 10,
  },
  headerCarTextBold: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: -10,
  },
  headerCarText: {
    fontSize: 25,
  },
});

const styles_ext = StyleSheet.create({
  listElement: {
    padding: 15,
    height: 600,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    alignItems: "center",
  },
  info: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  image: {
    width: 300,
    height: 160,
  },
  listContainer: {
    paddingHorizontal: "5%",
    paddingVertical: 10,
  },
  headerCarTextBold: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: -10,
  },
  headerCarText: {
    fontSize: 25,
  },
  photoName: {
    alignItems: "center",
  },
  textB: {
    fontSize: 25,
    fontWeight: "bold",
  },
  text: {
    fontSize: 25,
    textAlign: "right",
  },
});
