import React, { Component } from 'react';
import { Image } from 'react-native';
import {Container,Thumbnail, Content,Header, Title, Button, Left, Right, Body, Icon,Text } from 'native-base';
import {Actions} from 'react-native-router-flux';


export default class HeaderHomeContainer extends Component {


    render() {
        return(
     
     <Header>
<Content style={{backgroundColor:"#154771",border:'none'}}>
{/* <Thumbnail square large source={require('../images/logo.png')} /> */}
          </Content>
          </Header>

        )
    }
}

