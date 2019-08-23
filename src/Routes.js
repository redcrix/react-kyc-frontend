import React, { Component } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import KycForm from './pages/Dashboard/KycForm';
import Dashboard from './pages/Dashboard/Dashboard';

import {createStackNavigator, createAppContainer } from 'react-navigation';


const MainNavigator = createStackNavigator({
    Home: {screen: Home , navigationOptions: {
      title: "Home"
    }},
    Login: {screen: Login, navigationOptions: {
      title: "Login"
    }}, 
    Signup: {screen: Signup, navigationOptions: {
      title: "Signup"
    }}, 
    Dashboard: {screen: Dashboard, navigationOptions: {
      title: "Dashboard"
    }}, 
    KycForm: {screen: KycForm, navigationOptions: {
      title: "KycForm"
    }}, 
  },
  {
   initialRouteName: 'Home',
    swipeEnabled: false,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  });
  const MainRoute = createAppContainer(MainNavigator);

  export default MainRoute;

