import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Montserrat_400Regular, useFonts } from "@expo-google-fonts/montserrat";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, UserAttributes } from "../App";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CarFilled } from "@ant-design/icons";
import { CollapsedItem } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import { ImageURL } from "./CarsView";

type BookingsViewProps = NativeStackScreenProps<RootStackParamList, "Bookings">;

type Booking = {
  id: String;
  carId: String;
  endDate: String;
  startDate: String;
  userId: String;
  name: String;
  lastname: String
};

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

export default function BookingsView({ route, navigation }: BookingsViewProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const attributes: UserAttributes = route.params;
  const [selectedId, setSelectedId] = useState<String>();
  const [currCar, setCurrCar] = useState<Car>();
  const [cost, setCost] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [carImages, setCarImages] = useState<ImageURL[]>([])

  const getCarImages = async (carId: String) => {
    console.log(carId)
    await fetch(`https://carly-backend-app.azurewebsites.net/logic/api/cars/${carId}/image`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${attributes.token.jwttoken}`,
            'Content-Type': 'application/octet-stream'
        }
    }).then((response) => {
        if (response.ok) return response.blob()
        else throw new Error("ERROR " + response.status)
    }).then((data) => {
        console.log(data)
        const reader = new FileReader()
        reader.readAsDataURL(data)
        if (reader.result !== null) {
          setCarImages([ ...carImages, { uri: reader.result as string}])
        }
        console.log("Success fetching car image.")
    }).catch((e) => {
        console.log("Error when trying to fetch car image: " + e)
    })
  }

  //   admin so all bookings
  const getBookings = async () => {
    await fetch("https://carly-backend-app.azurewebsites.net/logic/api/bookings", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${attributes.token.jwttoken}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.ok) 
        return response.json();
      else
        throw new Error("ERROR " + response.status);
    }).then((bookings) => {
      setBookings(bookings);
      console.log("Success fetching bookings.");
    })
    .catch((e) => {
      console.log("Error when trying to fetch bookings: " + e);
    });
  }
  
  useEffect(() => {
    bookings.forEach(async (booking) => [
      await getCarImages(booking.carId)
    ])
  }, [bookings])


  useEffect(() => {
    getBookings();
  }, [])

  const handleExtension = async (
    id: String,
    carId: String,
    userId: String,
    startDate: String,
    endDate: String
  ) => {
    setSelectedId(id);

    await fetch(`https://carly-backend-app.azurewebsites.net/logic/api/cars/${carId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${attributes.token.jwttoken}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.ok) return response.json();
      else {
        throw new Error("ERROR " + response.status);
      }
    }).then((car) => {
      setCurrCar(car);
      console.log("Success fetching car.");
      let d_from = new Date(startDate.substring(0, 10));
      let d_to = new Date(endDate.substring(0, 10));
      let utc1 = Date.UTC(
        d_from.getFullYear(),
        d_from.getMonth(),
        d_from.getDate()
      );
      let _MS_PER_DAY = 1000 * 60 * 60 * 24;
      let utc2 = Date.UTC(
        d_to.getFullYear(),
        d_to.getMonth(),
        d_to.getDate()
      );
      setCost((Math.floor(utc2 - utc1) / _MS_PER_DAY) * car.pricePerDay);
    }).catch((e) => {
      console.log("Error when trying to fetch car: " + e);
    });
  }

  const handleCancel = async (id: String) => {
    if (!attributes.isLoggedIn) {
      return;
    }

    Alert.alert(
      'Would you like to cancel this booking?',
      '',
      [
        { text: "No", style: 'cancel', onPress: () => {} },
        {
          text: 'Yes, cancel the booking.',
          style: 'destructive',
          onPress: async () => {
            await fetch(`https://carly-backend-app.azurewebsites.net/logic/api/bookings/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${attributes.token.jwttoken}`,
              },
            }).then((response) => {
              if (response.ok) return response.json()
              else throw new Error("ERROR " + response.status)
            }).then(() => {
              console.log("Success cancelling booking.")
            }).catch((e) => {
              console.log("Error when trying to cancel booking: " + e)
            });
            getBookings()
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.headerTextBold}>current</Text>
          <Text style={styles.headerText}>bookings</Text>
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
        contentContainerStyle={styles.listContainer}
        data={bookings}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getBookings} />
        }
        renderItem={({ item, index }) =>
          item.id !== selectedId ? (
            <Pressable
              style={styles.listElement}
              onPress={() =>
                handleExtension(
                  item.id,
                  item.carId,
                  item.userId,
                  item.startDate,
                  item.endDate
                )
              }
            >
              <Image
                style={{ flex: 0.5, width: 100, height: 60 }}
                source={carImages}
              />
              <View style={{ flex: 0.7, marginLeft: 10 }}>
                <Text style={styles.headerCarTextBold}>booking no {index + 1}</Text>
                <Text style={styles.headerCarText}>#{item.id.substring(0,6).toUpperCase()}</Text>
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
                  source={carImages}
                />
                <Text style={styles_ext.headerCarTextBold}>
                  {currCar?.brand}
                </Text>
                <Text style={styles_ext.headerCarText}>{currCar?.model}</Text>
              </View>
              <View style={styles_ext.info}>
                <View>
                  <Text style={styles_ext.textB}>vin:</Text>
                  <Text style={styles_ext.textB}>booking:</Text>
                  <Text style={styles_ext.textB}>name:</Text>
                  <Text style={styles_ext.textB}>surname:</Text>
                  <Text style={styles_ext.textB}>from:</Text>
                  <Text style={styles_ext.textB}>to:</Text>
                </View>
                <View>
                  <Text style={styles_ext.text}>{currCar?.vin}</Text>
                  <Text style={styles_ext.text}>#{item.id.substring(0,6).toUpperCase()}</Text>
                  <Text style={styles_ext.text}>{item.name}</Text>
                  <Text style={styles_ext.text}>{item.lastname}</Text>
                  <Text style={styles_ext.text}>
                    {item.startDate.substring(0, 10)}
                  </Text>
                  <Text style={styles_ext.text}>
                    {item.endDate.substring(0, 10)}
                  </Text>
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
                <View style={{ flexDirection: "column" }}>
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                      ${cost}/
                    </Text>
                    <Text style={{ fontWeight: "normal", fontSize: 20 }}>
                      booking
                    </Text>
                  </View>
                  <Pressable
                    style={styles_ext.cancelButton}
                    onPress={() => handleCancel(item.id)}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      cancel
                    </Text>
                  </Pressable>
                </View>
                <AntDesign name="up" size={60} style={{ margin: 10 }} />
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
    padding: 8,
    fontSize: 22,
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
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    textAlign: "right",
  },
  cancelButton: {
    width: 210,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
});
