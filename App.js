import React from 'react';
import { StyleSheet, View, PermissionsAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Radar from 'react-native-radar';

class App extends React.Component {
  constructor() {
    super();
    this.state={
      region: {
        latitude: 41.020912,
        longitude: 28.934603,
        latitudeDelta: 1.0922,
        longitudeDelta: 1.0421
      },
      locations: [], 
    }
  };
  
  componentWillMount() {
    Radar.getPermissionsStatus()
      .then(status => status == 'DENIED' && this.requestLocation())  
      
      Radar.setUserId(this.state.userId);
      Radar.requestPermissions(true);
  
      Radar.trackOnce().then((result) => {
        this.setState({
          region: {
            ...this.state.region,
            longitude: result.user.geofences.longitude,
            latitude: result.user.geofences.latitude
          }
        })
      }).catch((err) => {
        console.warn(err)
      });
      Radar.startTracking();
  }
 
  /*
  addLocation = (coordinate) => {
    this.setState({
      locations: [...this.state.location, coordinate],
    })
  }
  */

  detectLocation = coordinate => {
      this.setState({
        region: {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 2.0922,
          longitudeDelta: 2.0421
        }
      })
  }

  requestLocation = () => {
    try {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(result => result == PermissionsAndroid.RESULTS.GRANTED ? console.warn('granted') : console.warn('not granted')) 
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
          region={this.state.region}
          showsUserLocation={true}
          onUserLocationChange={ locationChanged => this.detectLocation(locationChanged.nativeEvent.coordinate)}>
            <Marker
              coordinate={this.state.region}
              title="DENEME"
            /> 
        </MapView>
      </View>
    );
  }
}

const app = new App();

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

export default App;