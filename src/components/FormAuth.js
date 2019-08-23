import React, { Component } from 'react';
import { StyleSheet,  View, TextInput, TouchableOpacity, AsyncStorage, Keyboard ,Modal} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { TextValidator } from 'react-native-validator-form';
import ValidationComponent from '../validators/index';
import { Container, Content,Button,  Item, Input,Label,Text,Toast } from 'native-base';
import { FlashMessage,showMessage, hideMessage } from "react-native-flash-message";
var s = require('../../assets/css/style');

export default class FormAuth extends ValidationComponent  {
 
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
  
    login()  {
      this.props.navigation.navigate('Login');
  }
  dashboard() {
    this.props.navigation.navigate('Dashboard');
}
handleConfirmationCode = () => {
  const { email, confirmationCode } = this.state;
  Auth.confirmSignUp(email, confirmationCode, {})
    .then(() => {
      this.setState({ modalVisible: false });
      this.props.navigation.navigate('Signup')
    })
    .catch(err => console.log(err));
}
  
    storeData = async (userData) => {
        try {
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
        let signupDetails={
          firstname:firstname,
            middlename:middlename,
            lastname:lastname,
            email: email,
            password: password
        }
 
        if(this.props.type !== 'Login')
        {
          console.log(firstname);
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
            
        
         else if(this.props.type == 'Login')
        {
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
          })
        }
          else
          {
            Toast.show({
              text: responseJson.message,
              buttonText: "Okay",
              type: "success",
            })
          this.storeData(responseJson.data);      
          navigate('Dashboard');
          }
        })
      .catch((error) => {
        alert(error);
      })
      .done()
    }}
}
 
    showData = async()=>{
        let loginDetails = await AsyncStorage.getItem('loginDetails');
        let ld = JSON.parse(loginDetails);
        alert('email: '+ ld.email + ' ' + 'password: ' + ld.password);
    }
 
    render() {
      const { navigate } = this.props.navigation;
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
                {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text  style={styles.errorText}>{errorMessage}</Text>) }
                    
                <Item floatingLabel padder> 
                <Label>Password</Label>
                <Input 
                onChangeText={(password) => this.setState({password})} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                secureTextEntry={true}
                ref={(input) => this.password = input}
                />
                </Item>
                {this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => <Text  style={styles.errorText}>{errorMessage}</Text>) }
                    
                <Text style={styles.apiText}></Text>
                <Button style={s.buttonStyle}  block onPress={() => this.saveData(navigate)}><Text> Login </Text></Button>
           
            </Content>
            
        )
        }
        else {
          const {fieldsStatus,apimessage} = this.state;
            return(
              <Content padder>
                <Item floatingLabel padder error={fieldsStatus}> 
                <Label>Firstname</Label>
                      <Input 
                    onChangeText={(firstname) => this.setState({firstname})} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.firstname = input}
                    />                   
                    </Item>
                    {this.isFieldInError('firstname') && this.getErrorsInField('firstname').map(errorMessage => <Text style={styles.errorText}>{errorMessage}</Text>) }
                    <Item floatingLabel padder error={fieldsStatus}> 
                <Label>Middlename</Label>
                      <Input 
                    onChangeText={(middlename) => this.setState({middlename})} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.middlename = input}
                    />                   
                    </Item>
                    {this.isFieldInError('middlename') && this.getErrorsInField('middlename').map(errorMessage => <Text style={styles.errorText}>{errorMessage}</Text>) }
                    <Item floatingLabel padder error={fieldsStatus}> 
                <Label>Lastname</Label>
                      <Input 
                    onChangeText={(lastname) => this.setState({lastname})} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.lastname = input}
                    />                   
                    </Item>
                    {this.isFieldInError('lastname') && this.getErrorsInField('lastname').map(errorMessage => <Text style={styles.errorText}>{errorMessage}</Text>) }
                    <Item floatingLabel padder>
                    <Label>Email Address</Label>
                    <Input 
                    onChangeText={(email) => this.setState({email})}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={()=> this.password.focus()}/>
                    </Item>
                    {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text  style={styles.errorText}>{errorMessage}</Text>) }
                    
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
                    {this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => <Text  style={styles.errorText}>{errorMessage}</Text>) }
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
                    {this.isFieldInError('cpassword') && this.getErrorsInField('cpassword').map(errorMessage => <Text  style={styles.errorText}>{errorMessage}</Text>) }
                    <Text style={styles.apiText}>{apimessage}</Text>
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
            )
            }
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
