import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Montserrat_400Regular, useFonts } from '@expo-google-fonts/montserrat';

export default function AdminMenuView() {
  const [username, setUserName] = useState('Szymon')
  
    return (
    <View style={styles.container}>
      <Text style={styles.logo}>carly</Text>
      <Text>Welcome to carly, {username}</Text>
      <Button title='cars'></Button>
      <Button title='bookings'></Button>
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
  logo: {
    fontSize: 64,
    padding: 20,
    letterSpacing: 16,
    textShadowColor: 'white',
    textShadowOffset: { 'width': 2, 'height': 2},
    textShadowRadius: 4
  }
});
