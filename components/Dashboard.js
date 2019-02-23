import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default class Dashborad extends React.Component {
    render() {

        var {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={{ marginBottom: 20 }}>
                    <Button
                        title="Map Location"
                        onPress={()=> navigate("Map_page")}
                    />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Button
                        title="Places List"
                        onPress={()=> navigate("Places_page")}
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
  