import React, { Component } from 'react';

import {
  AppRegistry,
  Platform
} from 'react-native';

import { AppLoading } from 'expo';
import { Root } from 'native-base';
import Routes from './src/Routes';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {name as appName} from './app.json';


  AppRegistry.registerComponent(appName, () => App);

if (Platform.OS === 'web') {
      AppRegistry.runApplication(appName, {
           rootTag: document.getElementById('root'),
       });
  }
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
      <Root>
       <Routes/>
      </Root>
    );
  }
}

