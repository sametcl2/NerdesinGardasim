import React, { useState, useEffect } from 'react';
import { View, StyleSheet, PermissionsAndroid, StatusBar } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Radar from 'react-native-radar';
import { createAppContainer } from 'react-navigation';
import Snackbar from 'react-native-snackbar';
import { createBottomTabNavigator } from 'react-navigation-tabs'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Friends from './friends';
import { MAP_STYLE } from '../src/map_style';

const Map = () => {

  const [region, setRegion] = useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 1.0922,
      longitudeDelta: 1.0421
    });
  const [load, setLoad] = useState(false);
  
  useEffect(() => {
      Radar.getPermissionsStatus()
      .then(status => status == 'DENIED' && this.requestPermission());
      
      Radar.trackOnce()
        .then((result) => {
          setRegion({
              latitude: result.user.geofences.latitude != null ? result.user.geofences.latitude : 0,
              longitude: result.user.geofences.longitude != null ? result.user.geofences.longitude : 0,
              latitudeDelta: 1.0922,
              longitudeDelta: 1.0421
          });
          setLoad(true);
          console.warn(result.user.geofences)
        }).catch((err) => {
          Snackbar.show({
            title: `${err}`,
            duration: Snackbar.LENGTH_INDEFINITE,
            backgroundColor: 'white',
            action: {
              title: 'TAP TO CLOSE',
              color: 'black',
            }
          })
      });
      Radar.startTracking();
  }, []); // By passing an empty array as the second parameter to the useEffect Hook, it will work only in mount and unmount. 

  detectLocation = coordinate => {
      setRegion({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 1.0922,
          longitudeDelta: 1.0421
      });
  }

  requestPermission = () => {
    try {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(result => result == PermissionsAndroid.RESULTS.GRANTED ? console.warn('granted') : console.warn('not granted')) 
    } catch(err) {
      console.warn(err);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          customMapStyle={MAP_STYLE}
          showsUserLocation={true}
          onUserLocationChange={locationChanged => this.detectLocation(locationChanged.nativeEvent.coordinate)}>
          {
            load ?
            <Marker
              coordinate={region}
              title="DENEME"
            /> : null
          }
      </MapView>
    </View>
  );
}
  
Radar.on('location', result => {
  console.warn(result.location)
})

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  spinner: {
    ...StyleSheet.absoluteFillObject,
  },
  lottie:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    width: 400
  }
});

const AppContainer = createAppContainer(
  createBottomTabNavigator(
    {
      Map: {
        screen: Map,
        navigationOptions: () => ({
          tabBarIcon: ({tintColor}) => <Icon name="map-marker" color={tintColor} size={34}/>
        })
      },
      Friends: {
        screen: Friends,
        navigationOptions: () => ({
          tabBarIcon: ({tintColor}) => <Icon name="account-search" color={tintColor} size={34}/>
        })
      }
    },
    {
      tabBarOptions: {
        initialRouteName: 'Map',
        showLabel: false, 
        activeTintColor: '#F8F8F8',  
        inactiveTintColor: '#586589',  
        style: {
            backgroundColor: '#2E3A59' 
        }
      },
    }
  )
)

export default AppContainer;