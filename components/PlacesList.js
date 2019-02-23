import React from 'react';
import { StyleSheet, View, Button, Text, ScrollView  } from 'react-native';
import { List, ListItem } from 'react-native-elements'

export default class App extends React.Component {
    state = {
        userPlaces: null
    }

    getResetHandler = () => {
        this.setState({
            userPlaces: null
        })
    }

    componentDidMount() {
        fetch('https://location-map-c88df.firebaseio.com/places.json')
            .then(res => res.json())
            .then(parsedRes => {

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
    render() {
        const list = this.state.userPlaces
        var {navigate} = this.props.navigation;
        return (
            <ScrollView >
                {
                    list ? list.map((l, i) => (
                        <ListItem
                            key={i}
                            title={l.id}
                            subtitle={"Latitude: " + l.latitude + " Longitude: " + l.longitude}
                            onPress ={()=> navigate("Map_page",{latitude:l.latitude, longitude:l.longitude})}
                        />
                    )) : <Text>Loading...</Text>
                }
            </ScrollView >
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
