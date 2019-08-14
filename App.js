import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';

import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import Routes from './src/Routes';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {Actions} from 'react-native-router-flux';

export default class App extends Component   {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }


  render() {
     if (!this.state.isReady) {
       return <AppLoading />;
     }
    return (
      <Container>
       <Routes/>
      </Container>
    );
  }
}

