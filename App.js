import React from 'react';
import { StyleSheet, View, PermissionsAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import BackgroundGeolocation from "react-native-background-geolocation";

class App extends React.Component {
  constructor() {
    super();
    this.state={
      latitude: 0,
      longitude: 0,
    }
  };

  componentWillMount() {
    PermissionsAndroid.check(PermissionsAndroid.ACCESS_FINE_LOCATION)
      .then(response => response ? null : this.requestLocation())
    BackgroundGeolocation.getCurrentPosition({
      timeout: 30, // 30 second timeout to fetch location
      persist: true, // Defaults to state.enabled
      maximumAge: 5000, // Accept the last-known-location if not older than 5000 ms.
      desiredAccuracy: 10, // Try to fetch a location with an accuracy of `10` meters.
      samples: 3, // How many location samples to attempt.
      extras: {
        // Custom meta-data.
        route_id: 123,
      },
    })
    .then(currentLocation => {
      this.setState({
        latitude: currentLocation["coords"].latitude,
        longitude: currenLocation["coords"].longitude,
      })
    })
  } 

  setRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  requestLocation = () => {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'I need your location',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      ).then(result => result == PermissionsAndroid.RESULTS.GRANTED ? console.warn('granted') : console.warn('not granted')) 
    } catch(err) {
      console.warn(err);
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={this.setMapRegion()} >  
        </MapView>
      </View>
    );
  }
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