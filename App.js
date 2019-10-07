import React from 'react';
import { StyleSheet, View } from 'react-native';
import SignIn from './components/signIn';
import Map from './components/map';
import { createAppContainer } from 'react-navigation';
import AppContainer from './components/map';

const App = () => {  
  return(
    <View style={styles.container}>
      <AppContainer />
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