import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './components/signIn';

const App = () => {  
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

export default App;