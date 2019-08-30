import React, { Component } from 'react';
import FormAuth from '../components/FormAuth';
import {TouchableOpacity ,StyleSheet,Modal} from 'react-native';
import {Actions} from 'react-native-router-flux';
import SocialIcons from '../components/SocialIcons';
import { SocialIcon } from 'react-native-elements';
import { Container,Content,Item, Title, Text, Button, Left, Right, Body, Icon ,Label,Input} from 'native-base';
import { FlashMessage} from "react-native-flash-message";
var s = require('../../assets/css/style');
import ValidationComponent from '../validators/index';

export default class Signup extends ValidationComponent {
    constructor(props){
        super(props);
       
        this.state={
          showToast: false,
            email:'',
            password: '',
            cpassword:'',
            firstname:'',
            middlename:'',
            lastname:'',
            confirmationCode: '',
            modalVisible: false,
        }
    
    }

  login=()=> {
        this.props.navigation.navigate('Login');
    }

    saveData =(navigate)=>{
        const {email,password,firstname,middlename,lastname} = this.state;
        let signupDetails={
          firstname:firstname,
            middlename:middlename,
            lastname:lastname,
            email: email,
            password: password
        }
 
          const validate=this.validate({
            firstname: { required: true},
            lastname: { required: true},
            email: {email: true},
            password: {minlength:8},
            cpassword:{match:password}
          });
         if(validate==true){
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
        if(responseJson.success==false){
        Toast.show({
          text: responseJson.message,
          buttonText: "Okay",
          type: "danger",
        })
      }
      else{
        Toast.show({
          text: responseJson.message,
          buttonText: "Okay",
          type: "success",
        })
        this.setState({ modalVisible: true });
      }
      })
      .catch((error) => {
         
      })
      .done()
    }}

    render() {
        const { navigate } = this.props.navigation;
        return(
            
          <Container>
     <Content padder>
                <Item floatingLabel > 
                <Label>Firstname</Label>
                      <Input 
                    onChangeText={(firstname) => this.setState({firstname})} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.firstname = input}
                    />                   
                    </Item>
                    {this.isFieldInError('firstname') && this.getErrorsInField('firstname').map(errorMessage => <Text key={errorMessage.toString()} style={styles.errorText}>{errorMessage}</Text>) }
                    <Item floatingLabel > 
                <Label>Middlename</Label>
                      <Input 
                    onChangeText={(middlename) => this.setState({middlename})} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.middlename = input}
                    />                   
                    </Item>
                    {this.isFieldInError('middlename') && this.getErrorsInField('middlename').map(errorMessage => <Text key={errorMessage.toString()} style={styles.errorText}>{errorMessage}</Text>) }
                    <Item floatingLabel > 
                <Label>Lastname</Label>
                      <Input 
                    onChangeText={(lastname) => this.setState({lastname})} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.lastname = input}
                    />                   
                    </Item>
                    {this.isFieldInError('lastname') && this.getErrorsInField('lastname').map(errorMessage => <Text key={errorMessage.toString()} style={styles.errorText}>{errorMessage}</Text>) }
                    <Item floatingLabel padder>
                    <Label>Email Address</Label>
                    <Input 
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
                    placeholderTextColor = "#002f6c"
                    ref={(input) => this.password = input}
                    />
                    </Item>
                    {this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => <Text key={errorMessage.toString()} style={styles.errorText}>{errorMessage}</Text>) }
                    <Item floatingLabel padder>
                    <Label>Confirm Password</Label>
                       <Input 
                    onChangeText={(cpassword) => this.setState({cpassword})} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    secureTextEntry={true}
                    placeholderTextColor = "#002f6c"
                    ref={(input) => this.cpassword = input}
                    />
                    </Item>  
                    {this.isFieldInError('cpassword') && this.getErrorsInField('cpassword').map(errorMessage => <Text key={errorMessage.toString()} style={styles.errorText}>{errorMessage}</Text>) }
                    <Button style={s.buttonStyle} block onPress={() => this.saveData(navigate)} ><Text> Sign Up </Text></Button>
                    <Modal
          visible={this.state.modalVisible}
        >
          <Input
              label="Confirmation Code"
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={
                // Set this.state.confirmationCode to the value in this Input box
                (value) => this.setState({ confirmationCode: value })
              }
            />
             <Button style={s.buttonStyle} block onPress={this.handleConfirmationCode}><Text> Submit </Text></Button>
        </Modal>
                   </Content>
     <Content padder>
                    <Text>Already have an account? <Text style={{color:'blue'}} onPress={this.login}>Sign in</Text> </Text>
                </Content>
       <SocialIcons/>
       {/* <FlashMessage position="bottom" />  */}
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