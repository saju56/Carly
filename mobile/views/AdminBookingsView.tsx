import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { Button, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Montserrat_400Regular, useFonts } from '@expo-google-fonts/montserrat';
import Collapsible from 'react-native-collapsible';

type Booking = {
    id: String,
    carId: String,
    endDate: String,
    startDate: String,
    userId: String
}

async function request<TResponse>( url: string, config: RequestInit = {} ): Promise<TResponse> {
    return await fetch(url, config)
      .then((response) => response.json())
      .then((data) => data as TResponse);
}


export default function AdminBookingsView() {
  const [isLoading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([])
  const [bookingsCount, setBookingsCount] = useState(0)
  const [isCollapsed, setIsCollapsed] = useState(true)

//   admin so all bookings
  const getBookings = async () => {
    try {
      setLoading(true);
      let response : Booking[] | null = []
      request<Booking[]>('http://192.168.1.10:8080/logic/api/bookings').then((bookings) => (response = bookings))
      setBookingsCount(Object.keys(response).length)
      setBookings(response)
    } catch(error){
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  
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
                <Pressable style={styles.button}>
                    <Text style={styles.homeText}>home</Text>
                </Pressable>
            </View>
        </View>
      <Text style={styles.infoText}>bookings found: {bookingsCount}</Text>
      <FlatList
            data={bookings}
            renderItem={({item}) => <>
                <Text style={styles.text}>Booking id: {item.id}</Text>
                <Text style={styles.text}>Car id: {item.carId}</Text>
                <Text style={styles.text}>End date: {item.endDate}</Text>
                <Text style={styles.text}>Start date: {item.startDate}</Text>
                <Text style={styles.text}>User id: {item.userId}</Text>
            </>
            }
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
    width: '100%',
    padding: 20
  },
  headerText:{
    fontSize: 40,
  },
  headerTextBold:{
    fontSize: 40,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14
  },
  header: {
    display: 'flex',
    width: '100%',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignContent: 'space-between'
  },
  button: {
    height: 40,
    width: 80,
    margin: 12,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "white",
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
  homeText:{

  },
  text: {
    fontSize: 26
  }
});