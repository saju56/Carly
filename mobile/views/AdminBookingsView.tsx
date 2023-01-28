import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Montserrat_400Regular, useFonts } from '@expo-google-fonts/montserrat';

export default function AdminBookingsView() {
  const [isLoading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [bookingsCount, setCountriesCount] = useState(0)

//   admin so all bookings
  const getBookings = async () => {
    try {
      setLoading(true);
      let token = fetch()
      let response = await fetch('http://localhost:8080/logic/api/bookings', {
        method : 'GET',
        headers: {
            Authorization: `Bearer {token}`,
            'Content-Type': 'application/json'
        }
      })
    } catch(error){
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  
    return (
    <View style={styles.container}>
      <Text style={styles.header}>current</Text>
      <Text style={styles.headerBold}>bookings</Text>
      <Button title='home'></Button>
      <FlatList
            data={countries}
            renderItem={({item}) => <>
              <Text style={styles.content}>{"[" + item.alpha3Code + "] " + item.name}</Text>
              <RoundedButton style={styles.button} onPress={() => navigation.navigate('CountryDetailsScreen', item.alpha2Code)} centerText="Go to details"/>
            </>}
            keyExtractor={item => item.alpha2Code}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={getCountries} />
            }
            refreshing={isLoading}
            ItemSeparatorComponent={Separator}
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
  header:{
    fontSize: 40,
  },
  headerBold:{
    fontSize: 40,
    fontWeight: 'bold',
  }
});