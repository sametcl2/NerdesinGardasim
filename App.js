import React from 'react';
import { StyleSheet, View } from 'react-native';
import SignIn from './components/signIn';
import { createAppContainer } from 'react-navigation';

const AppContainer = createAppContainer(TabNavigator);

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