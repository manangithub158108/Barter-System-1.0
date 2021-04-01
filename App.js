import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AddItemScreen from './Screens/AddItemScreen';
import HomeScreen from './Screens/HomeScreen';
import UserAuth from './Screens/UserAuth';
import SettingsScreen from './Screens/SettingsScreen';
import customSideBarComponent from './Screens/customSideBarCompnent';
import ItemDetails from './Screens/ItemDetails';
import MyItems from './Screens/MyItems';
import Notifications from './Screens/Notifications';
import MyBarters from './Screens/MyBarters';

export default class App extends Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  HomeScreen : {
    screen : HomeScreen,
    navigationOptions : {
      tabBarLabel : 'Home',
      tabBarIcon : <Image source = {require('./Images/homeScreen.png')} style = {{
        width : 20,
        height : 20,
        alignSelf : 'center'
      }}></Image>
    }
  },
  AddItemScreen : {
    screen : AddItemScreen,
    navigationOptions : {
      tabBarLabel : 'Add item',
      tabBarIcon : <Image source = {require('./Images/addItemIcon.png')} style = {{
        width : 20,
        height : 20,
        alignSelf : 'center'
      }}></Image>
    }
  }
})

const StackNavigator = createStackNavigator({
  UserAuth : {
    screen : UserAuth,
    navigationOptions : {
      headerTitle : 'User Authentication',
      headerTitleAlign : 'center'
    }
  },

  TabNavigator : {
    screen : TabNavigator,
    navigationOptions : {
      headerTitle : 'Barter System',
      headerTitleAlign : 'center'
    }
  },

  ItemDetails : {
    screen : ItemDetails,
    navigationOptions : {
      headerTitle : 'Item details'
    }
  } 

})

const DrawerNavigator = createDrawerNavigator({
  Home : {
    screen : StackNavigator
  },
  Settings : {
    screen : SettingsScreen
  },
  MyItems : {
    screen : MyItems,
    navigationOptions : {
      drawerLabel : 'My Items'
    }
  },
  
  MyBarters : {
    screen : MyBarters
  },

  Notifications : {
    screen : Notifications
  }
},
{
  contentComponent : customSideBarComponent,
},
{
  initialRouteName : 'Home'
})

const AppContainer = createAppContainer(DrawerNavigator);

