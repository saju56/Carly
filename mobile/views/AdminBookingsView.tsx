import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { Button, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Montserrat_400Regular, useFonts } from '@expo-google-fonts/montserrat';

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
  const [isLoading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsCount, setBookingsCount] = useState(0)

  //   admin so all bookings
  const getBookings = async () => {
    try {
      setLoading(true);
      let response : Booking[] | null = []
      await request<Booking[]>('http://192.168.1.10:8080/logic/api/bookings').then((bookings) => (response = bookings))
      setBookingsCount(Object.keys(response).length)
      setBookings(response)
    } catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}>current</Text>
                <Text style={styles.headerTextBold}>bookings</Text>
            </View>
            <View>
                <Pressable></Pressable>
            </View>
        </View>
      <Text style={styles.infoText}>bookings found: {bookingsCount}</Text>
      <Button title='home'></Button>
      <FlatList
            data={bookings}
            renderItem={({item}) => <>
              <Text style={styles.container}>Booking id: {item.id}</Text>
              <Text style={styles.container}>Car id: {item.carId}</Text>
              <Text style={styles.container}>End date: {item.endDate}</Text>
              <Text style={styles.container}>Start date: {item.startDate}</Text>
              <Text style={styles.container}>User id: {item.userId}</Text>
              
            </>}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={getBookings} />
            }
            refreshing={isLoading}
            maxToRenderPerBatch={7}
            initialNumToRender={15}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DADEEA',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
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
  header: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'stretch'
  }
});
