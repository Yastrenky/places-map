import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation';
import styles from '../assets/styles/index';

class DrawerScreen extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });

    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View style={{ textAlign: 'center' }}>
            <View style={styles.menuItem}>
              <TouchableOpacity onPress={this.navigateToScreen('Dashboard')} style={{padding: 20 }}>
                <Text >
                  Dashboard
              </Text>
              </TouchableOpacity>
            </View>


            <View style={styles.menuItem}>
              <TouchableOpacity onPress={this.navigateToScreen('Map')} style={{padding: 20 }}>
                <Text >
                  Map
              </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuItem}>
              <TouchableOpacity onPress={this.navigateToScreen('Places')} style={{padding: 20 }}>
                <Text >
                  Places
              </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}



export default DrawerScreen;