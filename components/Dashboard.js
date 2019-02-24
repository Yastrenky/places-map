import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import {NavigationActions} from 'react-navigation';
import { DrawerActions } from 'react-navigation';

export default class Dashborad extends React.Component {

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
      }

    render() {

        var {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
            <Text style={{ marginBottom: 20 }}>Save locations and favorite places</Text>
                {/* <View style={{ marginBottom: 20 }}>
                    <Button
                        title="Map Location"
                        onPress={this.navigateToScreen('Map')}
                    />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Button
                        title="Places List"
                        onPress={this.navigateToScreen('Places')}
                    />
                </View> */}
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
  