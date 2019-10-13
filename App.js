import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './components/signIn';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Reducers from './redux/reducers/reducer';

const store = createStore(Reducers); 

const App = () => {  
  return ( 
    <View style={styles.container}>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
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