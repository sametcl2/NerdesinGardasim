import React, { useState, useEffect } from 'react';
import { View, StyleSheet, PermissionsAndroid, StatusBar } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { createAppContainer } from 'react-navigation';
import Snackbar from 'react-native-snackbar';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Friends from './friends';
import { MAP_STYLE } from '../src/map_style';
import GetLocation from 'react-native-get-location'
import database from '@react-native-firebase/database';
import auth, { firebase } from '@react-native-firebase/auth';

const Map = props => {
  const [initialRegion, setInitialRegion] = useState({
    latitude: 0,
    longitude: 0,
    longitudeDelta: 1,
    latitudeDelta: 1
  });
  const [region, setRegion] = useState(0);
  const [lockRegion, setLockRegion] = useState(0);
  const [load, setLoad] = useState(false);
  const [uuid, setUUID] = useState('');
  const [locationDatas, setLocationDatas] = useState([]);

  useEffect(() => {
    console.log("DENEMEEE")
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 1,
        longitudeDelta: 1
      });
      setLockRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 1,
        longitudeDelta: 1
      });
      database().ref('/lastLocations').once('value').then(item => {
        let data = item.toJSON();
        setLocationDatas(Object.values(data))
      })
    })
    auth().onAuthStateChanged(user => {
      if (user) {
        setUUID(user.uid);
      }
    })
  }, []);

  // useEffect(() => {
    
  // })

  const detectLocation = coordinate => {
      setRegion({
        ...region,
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      });
      database()
      .ref('/lastLocations/' + uuid)
      .update({
        latitude: region.latitude,
        longitude: region.longitude
      })
      database().ref('/lastLocations').once('value').then(item => {
        let data = item.toJSON();
        setLocationDatas(Object.values(data))
      })
  }

  requestPermission = () => {
    try {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(result => result == PermissionsAndroid.RESULTS.GRANTED ? console.warn('granted') : console.warn('not granted'))
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      <MapView
         provider={PROVIDER_GOOGLE}
         style={styles.map}
         region={lockRegion === 0 ? initialRegion : lockRegion}
         customMapStyle={MAP_STYLE}
         loadingEnabled={true}
         loadingIndicatorColor="#666666"
         loadingBackgroundColor="#eeeeee"
         onRegionChangeComplete={e => setLockRegion(e)}
        //  userLocationPriority="passive"
         showsUserLocation={true}
         onUserLocationChange={locationChanged => detectLocation(locationChanged.nativeEvent.coordinate)}
         showsBuildings={true}>
          {
            locationDatas !== [] && locationDatas.map(item => {
              let latLang = {latitude: Object.values(item)[1], longitude: Object.values(item)[0]}
              // console.log(latLang);
              return (
                <Marker 
                  key={Math.random()}
                  coordinate={latLang}
                  title="You"
                  description="Test"
                />
              )
            })
          }
      </MapView>
    </View>
  );
}

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

// const mapStateToProps = state => {
//   return {
//     userUUID: state.userUUID
//   }
// }

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

export default AppContainer; /*connect(mapStateToProps, null)*/