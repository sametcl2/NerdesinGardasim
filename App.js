import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import reducer from './redux/reducers/reducer';
import SignUp from './components/signUp';
import SignIn from './components/signIn';
import Map from './components/map';

const store = createStore(reducer); 

const App = () => {  
  return ( 
    <View style={styles.container}>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
    </View>
  );
}

const AppNavigator = createAppContainer(
  createStackNavigator(
  {
      SignIn,
      Map,
      SignUp,
  },
  {
      initialRouteName: 'SignIn',
      headerMode: 'none',  // Header gizlemek için
      navigationOptions: { // Header gizlemek için
          headerVisible: false, 
      }
  }
));

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

export default App;