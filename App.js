import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerActions, createMaterialTopTabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import Dashboard from './components/Dashboard';
import MaP from './components/Map';
import Places from './components/PlacesList';
import DrawerScreen from './components/DrawerScreen';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image, StatusBar } from 'react-native';

const Tabs = createMaterialTopTabNavigator({
  Dashboard: Dashboard,
  Map: MaP,
  Places: Places
}, {
    tabBarOptions: {
      activeTintColor: '#000',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'orange',
      },
      indicatorStyle: {
        backgroundColor: '#000',
      },
    }
  });

const DrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: Tabs
  }
}, {
    initialRouteName: 'Dashboard',
    contentComponent: DrawerScreen,
    drawerWidth: 200
  });

const MenuImage = ({ navigation }) => {
  if (!navigation.state.isDrawerOpen) {
    return <Image source={require('./assets/images/menu-button.png')} />
  } else {
    return <Image source={require('./assets/images/left-arrow.png')} />
  }
}

const StackNavigator = createStackNavigator({

  //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.

  DrawerNavigator: {
    screen: DrawerNavigator
  }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
      title: 'Locatios Tracker',  // Title to appear in status bar
      headerLeft:
        <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }}>
          <MenuImage style="styles.bar" navigation={navigation} />
        </TouchableOpacity>
      ,
      headerStyle: {
        backgroundColor: '#333',
      },
      headerLeftContainerStyle: {
        marginLeft: 20
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },

    })
  });

export default createAppContainer(StackNavigator);