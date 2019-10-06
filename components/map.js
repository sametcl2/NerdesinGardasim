import React, { useState, useEffect } from 'react';
import { View, StyleSheet, PermissionsAndroid} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Radar from 'react-native-radar';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'; 
import Icon from 'react-native-vector-icons/FontAwesome5';
import Friends from './friends';

const Map = () => {

    const [region, setRegion] = useState({
        latitude: 41.020912,
        longitude: 28.934603,
        latitudeDelta: 1.0922,
        longitudeDelta: 1.0421
      });
    
    useEffect(() => {
        Radar.getPermissionsStatus()
        .then(status => status == 'DENIED' && this.requestPermission());

        Radar.requestPermissions(true);    
        
        Radar.trackOnce()
          .then((result) => {
            setRegion({
                ...region,
                longitude: result.user.geofences.longitude,
                latitude: result.user.geofences.latitude
            })
          }).catch((err) => {
            console.warn(err)
          });

        Radar.startTracking();
    });
  
    detectLocation = coordinate => {
        setRegion({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 2.0922,
            longitudeDelta: 2.0421
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

    return(
    <View style={styles.container}>
        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            showsUserLocation={true}
            onUserLocationChange={ locationChanged => this.detectLocation(locationChanged.nativeEvent.coordinate)} >
            <Marker
                coordinate={region}
                title="DENEME"
            /> 
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
   });
  
  export default createAppContainer(TabNavigator);