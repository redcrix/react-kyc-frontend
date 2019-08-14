import React, { Component } from 'react';
import FormAuth from '../components/FormAuth';
import {TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';
import SocialIcons from '../components/SocialIcons';
import { SocialIcon } from 'react-native-elements';
import { Container,Content,Item, Title, Text, Button, Left, Right, Body, Icon } from 'native-base';



export default class Signup extends Component {

  login() {
        Actions.login()
    }

    render() {
        return(
          <Container>
     <Content padder>
     <FormAuth ref="form" type="Signup" shouldValidate={true}/>
                <Content padder>
                    <Text>Already have an account? <Text style={{color:'blue'}} onPress={this.login}>Sign in</Text> </Text>
                    </Content>
                 </Content>
       <Content padder >
   
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

