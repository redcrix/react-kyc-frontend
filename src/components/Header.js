import React, { Component } from 'react';
import { Image } from 'react-native';
import {Container, Header, Title, Button, Left, Right, Body, Icon,Text } from 'native-base';
import {Actions} from 'react-native-router-flux';


export default class HeaderContainer extends Component {
    render() {
        return(   
        <Header style={{backgroundColor:"#154771"}}>
          <Left>
          <Image source={require('../images/logo.png')} style={{width: 150, height: 100}}/>
          </Left>
          <Right />
        </Header>
        )
    }
}

