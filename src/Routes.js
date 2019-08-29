import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import KycForm from './pages/Dashboard/KycForm';
import Dashboard from './pages/Dashboard/Dashboard';
import {Container,Content,Spinner} from 'native-base';

import {createStackNavigator,createSwitchNavigator, createAppContainer } from 'react-navigation';


class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userData= await AsyncStorage.getItem('userData');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userData ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <Container>
       <Content>
          <Spinner color='blue' />
        </Content>
      </Container>
    );
  }
}


const AppStack = createStackNavigator({
    Dashboard: {screen: Dashboard, navigationOptions: {
      title: "Dashboard"
    }}, 
    KycForm: {screen: KycForm, navigationOptions: {
      title: "KycForm"
    }},
     
  });

  const AuthStack = createStackNavigator({
    Home: {screen: Home , navigationOptions: {
      title: "Home"
    }},
    Login: {screen: Login, navigationOptions: {
      title: "Login"
    }}, 
    Signup: {screen: Signup, navigationOptions: {
      title: "Signup"
    }}, 
  });

  export default createAppContainer(createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
     initialRouteName: 'AuthLoading',
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
    }
  ));


