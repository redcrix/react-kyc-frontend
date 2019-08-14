import React, { Component } from 'react';
import { Image } from 'react-native';
import {Container, Header, Title, Button, Left, Right, Body, Icon,Text } from 'native-base';
import {Actions} from 'react-native-router-flux';


export default class HeaderContainer extends Component {


    render() {
        return(   
        <Header style={{backgroundColor:"#154771"}}>
          <Left>
          <Image source={require('../images/logo.png')} style={{width: 20, height: 20}}/>
          </Left>
          <Right />
        </Header>
        )
    }
}

// const styles = StyleSheet.create({
//   headercontainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'white',
//     },
//     signupTextCont: {
//       flexGrow: 1,
//       justifyContent: 'center',
//       alignItems: 'flex-end',
//       paddingVertical: 16,
//       flexDirection: 'row',
//     },
//     signupText: {
//       color: '#12799f', 
//       fontSize:16,
//     },
//     signupButton: {
//         color: '#12799f',
//         fontSize:16,
//         fontWeight: '500',
//     },
//     socialcontainer:{
//       paddingVertical: 50
//     }
// });