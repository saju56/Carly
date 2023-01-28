import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AdminMenuView from './views/AdminMenuView';

export default function App() {
  return (
      <View style={styles.container}>
        <Text>Hello World</Text>
        <StatusBar style="auto" />
        <AdminMenuView></AdminMenuView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

