import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  RefreshControl,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, UserAttributes } from "../App";

export type Car = {
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

export type ImageURL = {
  uri: string
}

type CarsViewProps = NativeStackScreenProps<RootStackParamList, "Cars">;

export default function CarsView({ route, navigation }: CarsViewProps) {
  const [cars, setCars] = useState<Car[]>([])
  const [selectedId, setSelectedId] = useState<String>()
  const [isLoading, setIsLoading] = useState(false)
  const attributes: UserAttributes = route.params

  const getCars = async () => {
    setIsLoading(true)
    await fetch("https://carly-backend-app.azurewebsites.net/logic/api/cars", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${attributes.token.jwttoken}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.ok) return response.json()
      else throw new Error("ERROR " + response.status)
    }).then((cars) => {
      setCars(cars)
      console.log("Success fetching cars.")
    }).catch((e) => {
      console.log("Error when trying to fetch cars: " + e)
    })
    setIsLoading(false)
  }

  useEffect(() => {
    getCars()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.headerTextBold}>available</Text>
          <Text style={styles.headerText}>cars</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Menu", attributes)}
          style={({ pressed }) => [{ borderColor: pressed ? 'transparent' : 'black' }, { backgroundColor: pressed ? 'black' : 'transparent' }, styles.button ]}>
          {({ pressed }) => (
            <Text style={[{ color: pressed ? 'white' : 'black' }, styles.menuText]}>
              home
            </Text>
          )}
        </Pressable>
      </View>
      <FlatList
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getCars} />
        }
        contentContainerStyle={styles.listContainer}
        data={cars}
        renderItem={({ item, index }) =>
          item.id !== selectedId ? (
            <Pressable
              style={styles.listElement}
              onPress={() => setSelectedId(item.id)}
            >
              <Image
                style={{ flex: 0.5, width: 100, height: 60 }}
                source={{ uri: `https://carly-backend-app.azurewebsites.net/logic/api/cars/image2/${item.id}`}}
              />
              <View style={{ flex: 0.7, marginLeft: 10 }}>
                <Text style={styles.headerCarTextBold}>{item.brand}</Text>
                <Text style={styles.headerCarText}>{item.model}</Text>
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
                  source={{ uri: `https://carly-backend-app.azurewebsites.net/logic/api/cars/image2/${item.id}`}}
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
                  <Text style={styles_ext.text}>{item.vin}</Text>
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
