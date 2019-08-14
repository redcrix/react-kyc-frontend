import React, { Component } from 'react';
import {  TouchableOpacity } from 'react-native';
import { Container,Content, Title, Text, Button, Left, Right, Body, Icon } from 'native-base';
import {Actions} from 'react-native-router-flux';
import SocialIcons from '../components/SocialIcons';
import FormAuth from '../components/FormAuth';
import { SocialIcon } from 'react-native-elements';

export default class Login extends Component {

    signup() {
        Actions.signup()
    }
    
    loginWithFacebook=async()=>{ 
      try {
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync('364152994258660');
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          console.log(response.json());
          Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        } else {
          // type === 'cancel'
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }
    
        render() {
            return(
              <Container>
            <Content padder>
                    <FormAuth type="Login"/>
                    <Content padder>
                    <Text>Dont have an account yet? <Text style={{color:'blue'}} onPress={this.signup}>Register</Text> </Text>
                    </Content>
                        </Content>
              <Content padder>
          
              <SocialIcon  style={{borderRadius:0}}
      title='Login With Facebook'
      button
      type='facebook'
      onPress={this.loginWithFacebook}
    />
    <SocialIcon style={{backgroundColor:'#e94b4b',borderRadius:0}}
      title='Login With Google'
      button
      type='google'
      onPress={this.loginWithFacebook}
    />
    
              </Content>
              <SocialIcons/>
              </Container>
                    
            )
        }
    }

