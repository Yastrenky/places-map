import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import MapView from 'react-native-maps';
import { NavigationActions } from 'react-navigation';

export default class App extends React.Component {
    state = {
        userLocation: null,
        userPlaces: [],
        reset: false,
    }

    getUserLocatioHandler = () => {
        this.props.navigation.setParams({ latitude: null, longitude: null})
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
        this.props.navigation.setParams({ latitude: null, longitude: null})
        this.setState({
            userLocation: null,
            userPlaces: [],
            reset: true
        })

    }
    render() {
        console.log("MAp", this.props.navigation.state)
        var userLocation = this.state.userLocation;
        let userLocationMarker = null;

        if (userLocation) {
            userLocationMarker = <MapView.Marker coordinate={this.state.userLocation} />
        }
        

        if (this.props.navigation.state.params && this.props.navigation.state.params.latitude) {
            var location = {
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                ...this.props.navigation.state.params
            }
            userLocationMarker = <MapView.Marker coordinate={location} />
            userLocation = location;
        }


        const usersMarkers = this.state.userPlaces.map(userPlace => <MapView.Marker coordinate={userPlace} key={userPlace.id} />)
        return (
            <View style={styles.container}>
                <View style={{ marginBottom: 20 }}>
                    <Button
                        title="Get all user places"
                        onPress={this.getUserPlacesHandler}
                    />
                </View>
                < View style={{ marginBottom: 20 }}>
                    <Button
                        title="Get current location"
                        onPress={this.getUserLocatioHandler}
                    />
                </View>
                < View style={{ marginBottom: 20 }}>
                    <Button
                        title="Clean markers"
                        onPress={this.getResetHandler}
                    />
                </View>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.mapContainer}
                        region={userLocation}

                    >
                        {userLocationMarker}
                        {usersMarkers}

                    </MapView>
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
        paddingTop: 10
    },
    mapContainer: {
        flex: 1,
        width: '100%',
        height: '50%',
    },
    map: {
        width: '100%',
        height: '100%'
    }
});
