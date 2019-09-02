import React, { Component } from 'react';
import {  TouchableOpacity,StyleSheet,AsyncStorage } from 'react-native';
import { Container,Content, Title, Text, Button, Left, Right, Body, Icon,Item,Input,Label,Toast } from 'native-base';
import {Actions} from 'react-native-router-flux';
import SocialIcons from '../components/SocialIcons';
import FormAuth from '../components/FormAuth';
import { SocialIcon } from 'react-native-elements';
var s = require('../../assets/css/style');
import ValidationComponent from '../validators/index';

export default class Login extends ValidationComponent {
  constructor(props){
    super(props);
   
    this.state={
      showToast: false,
       userDetails:{},
        email:'',
        password: '',
        modalVisible: false,
    }

}


    signup= () => {
      this.props.navigation.navigate('Signup');
    }

    storeData = async (userData) => {
      try 
      {
        await AsyncStorage.setItem('userData',  JSON.stringify(userData));
      } catch (error) {
        return error;
      }
    };
    getData = async () => {
      try {
          const {token} = this.state;
        var tokenAuth=await AsyncStorage.getItem('token');
this.setState({token:tokenAuth});
      } catch (error) {
        
      }
    };

  saveData =(navigate)=>{
      const {email,password,firstname,middlename,lastname} = this.state;
      console.log(email);

      //save data with asyncstorage
      let loginDetails={
          email: email,
          password: password
      }
        const validate=this.validate({
          email: {email: true},
          password: {required: true},
        });
        if(validate==true){
              //let loginDetails = await AsyncStorage.getItem('loginDetails');
              let ld = JSON.stringify(loginDetails);

              fetch('https://ubuntu-backend.herokuapp.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: ld
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success==false){  
        Toast.show({
          text: responseJson.message,
          buttonText: "Okay",
          type: "danger",
          position:'bottom'
        })
      }
        else
        {
          Toast.show({
            text: responseJson.message,
            buttonText: "Okay",
            type: "success",
            position:'bottom'
          })
        this.storeData(responseJson.data);      
        navigate('App');
        }
      })
    .catch((error) => {
      alert(error);
    })
    .done()
  }}

    
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
          const { navigate } = this.props.navigation;
            return(
              <Container>
            <Content padder>
            <Item floatingLabel padder> 
            <Label>Email Address</Label>
                <Input 
                isRequired={true}
                onChangeText={(email) => this.setState({email})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                selectionColor="#fff"
                keyboardType="email-address"
                onSubmitEditing={()=> this.password.focus()}/>
                </Item>
                {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text key={errorMessage.toString()}  style={styles.errorText}>{errorMessage}</Text>) }
                <Item floatingLabel padder> 
                <Label>Password</Label>
                <Input 
                onChangeText={(password) => this.setState({password})} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                secureTextEntry={true}
                ref={(input) => this.password = input}
                />
                </Item>        
                {this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => <Text key={errorMessage.toString()} style={styles.errorText}>{errorMessage}</Text>) }
                <Text style={styles.apiText}></Text>
                <Button style={s.buttonStyle}  block onPress={() => this.saveData(navigate)}><Text> Login </Text></Button>
                    <Content padder>
                    <Text>Dont have an account yet? <Text style={{color:'blue'}} onPress={this.signup}>Sign Up</Text> </Text>
                    </Content>
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

    const styles = StyleSheet.create({

      errorText:{
        color:'red',
        marginTop:5,
        marginBottom:5,
      },
      apiText:{
        color:'green',
        marginTop:5,
        marginBottom:5,
      },
    
    });
    