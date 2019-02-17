import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import FetchLocation from './components/FetchLocation';
import MapView from 'react-native-maps';
import { parse } from 'qs';

export default class App extends React.Component {
  state = {
    userLocation: null,
    userPlaces: []
  }

  getUserLocatioHandler = () => {
    console.log("Get Location")
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      });
      console.log(position);

      fetch('https://location-map-c88df.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }, err => console.log(err))
  }

  getUserPlacesHandler = () => {
    fetch('https://location-map-c88df.firebaseio.com/places.json')
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes)
        const placesArray = [];
        for (const key in parsedRes) {
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key
          });
        }
        this.setState({
          userPlaces: placesArray
        })
      })
      .catch(err => console.log(err))
  }

  getResetHandler = () => {
    this.setState({
      userLocation: null,
      userPlaces: []
    })
  }
  render() {
    let userLocationMarker = null;
    if (this.state.userLocation) {
      userLocationMarker = <MapView.Marker coordinate={this.state.userLocation} />
    }
    const usersMarkers = this.state.userPlaces.map(userPlace => <MapView.Marker coordinate={userPlace} key={userPlace.id} />)
    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <Button
            title="Get user Places"
            onPress={this.getUserPlacesHandler}
          />
        </View>
        <FetchLocation onGetLocation={this.getUserLocatioHandler} />
        <View style={styles.mapContainer}>
          <MapView
            style={styles.mapContainer}
            region={this.state.userLocation}
            user
          >
            {userLocationMarker}
            {usersMarkers}
          </MapView>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Button
            title="Reset"
            onPress={this.getResetHandler}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    width: '100%',
    height: '70%',
    marginTop: 20
  },
  map: {
    width: '100%',
    height: '100%'
  }
});
