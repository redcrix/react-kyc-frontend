import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import { Container, Icon, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
import {SocialIcon } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';


export default class FooterContainer extends Component {


    render() {
        return(
        <Footer>

          <FooterTab style={{backgroundColor:"#fff"}}>

          <Button active>
                            <Text>Profile</Text>
                            <Icon name='ios-contact' />
                        </Button>
                       
                        <Button>
                        <Text>Camera</Text>
                            <Icon name='ios-camera' />
                        </Button>
                        <Button>
                        <Text> Navigate</Text>
                            <Icon name='ios-compass' />
                        </Button>
                        <Button>
                           <Text> About</Text>
                            <Icon name='md-information-circle' />
                            </Button>
                       
        </FooterTab>

          
          
        </Footer>

        )
    }
}

 const styles = StyleSheet.create({

socialIconStyle:{
  backgroundColor:'transparent',
}
 });