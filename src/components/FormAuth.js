import React, { Component } from 'react';
import { StyleSheet,  View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import {Actions} from 'react-native-router-flux';
import { TextValidator } from 'react-native-validator-form';
import ValidationComponent from 'react-native-form-validator';
import { Container, Content,Button,  Item, Input,Label,Text } from 'native-base';
 
export default class FormAuth extends ValidationComponent {
 
    constructor(props){
        super(props);
        this.state={
            email:'',
            password: '',
            username:'',
            token:'',
        }
    }
    storeData = async (userData) => {
        try {
          await AsyncStorage.setItem('userData',  JSON.stringify(userData));
        } catch (error) {
          // Error saving data
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
 
    saveData =async()=>{
        const {email,password,username} = this.state;
        console.log(email);

        //save data with asyncstorage
        let loginDetails={
            email: email,
            password: password
        }
        let signupDetails={
            username:username,
            email: email,
            password: password
        }
 
        if(this.props.type !== 'Login')
        {
          this.validate({
            username: { required: true},
            email: {required: true},
            password: {required: true}
          });
            //AsyncStorage.setItem('signupDetails', JSON.stringify(signupDetails));
           const json= JSON.stringify(signupDetails);
            fetch('https://ubuntu-backend.herokuapp.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: json
      })
      .then((response) => response.json())
      .then((responseJson) => {
          alert(responseJson.message);
      })
      .catch((error) => {
        alert(error);
      })
      .done()
    }
            
        
         else if(this.props.type == 'Login')
        {
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
          alert(responseJson.message);
        }
         // Actions.login();
          else
          {
          this.storeData(responseJson.data);        
          Actions.dashboard();
          }
        })
      .catch((error) => {
        alert(error);
      })
      .done()
    }
}
 
    showData = async()=>{
        let loginDetails = await AsyncStorage.getItem('loginDetails');
        let ld = JSON.parse(loginDetails);
        alert('email: '+ ld.email + ' ' + 'password: ' + ld.password);
    }
 
    render() {
        //console.log(this.props.type);
        if(this.props.type=='Login'){
        return(
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
                <Item floatingLabel padder> 
                <Label>Password</Label>
                <Input 
                onChangeText={(password) => this.setState({password})} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                secureTextEntry={true}
                ref={(input) => this.password = input}
                />
                </Item>
               
                <Button block onPress={this.saveData}><Text> Login </Text></Button>
            </Content>
            
        )
        }
        else {
            return(
              <Content padder>
                <Item floatingLabel padder> 
                <Label>Username</Label>
                      <Input 
                    onChangeText={(username) => this.setState({username})} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.name = input}
                    />                   
                    </Item>
                    <Item floatingLabel padder>
                    <Label>Email Address</Label>
                    <Input 
                    onChangeText={(email) => this.setState({email})}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={()=> this.password.focus()}/>
                    </Item>
                    <Item floatingLabel padder>
                    <Label>Password</Label>
                    <Input 
                    onChangeText={(password) => this.setState({password})} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    secureTextEntry={true}
                    placeholderTextColor = "#002f6c"
                    ref={(input) => this.password = input}
                    />
                    </Item>
                    <Button block onPress={this.saveData}><Text> Register </Text></Button>
                    </Content>
                
            )
            }
    }
}

 
