import { createStackNavigator, createAppContainer } from 'react-navigation';

import Dashboard from './components/Dashboard';
import Map from './components/Map';
import Places from './components/PlacesList';

const Navigation = createStackNavigator(
  {
    Dashboard_page: {
      screen: Dashboard,
      navigationOptions: () => ({
        title: `Dashboard`,
        headerBackTitle: null
      }),
    },
    Map_page: {
      screen: Map,
      navigationOptions: () => ({
        title: `Map`,
        headerBackTitle: null
      }),
    },
    Places_page: {
      screen: Places,
      navigationOptions: () => ({
        title: `Places list`,
        headerBackTitle: null
      }),
    }
  },
  {
    defaultNavigationOptions: () => ({
      headerStyle: {
        backgroundColor: 'orange'
      },
      headerTitleStyle: {
        color: 'white'
      }
    })
  }

)


export default createAppContainer(Navigation);