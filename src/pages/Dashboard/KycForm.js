import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import MultiStep from 'react-native-multistep-wizard';
import StepOneForm from '../../components/StepOneForm';
import StepTwoForm from '../../components/StepTwoForm';
import StepThreeForm from '../../components/StepThreeForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AsyncStorage,Platform} from 'react-native';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import ValidationComponent from '../../validators/index';

import { Container,Content, Title, Text, Button, Left, Right, Body, Icon, DatePicker,Toast } from 'native-base';


export default class KycForm extends ValidationComponent {
  constructor(props){    
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state={
      userDetails:{},
      errorMessage: null,
      location:'',
      inputData:{},
      step:1, 
      userid:'',
      firstname:'',
      middlename: '',
      lastname:'',
      dob:'',
      nationality:'',
      address:'',
      aid:'',
      pid:'',
      typeofphotoidentification: '',
      typeofaddressidentification: ''
    }
}

componentWillMount() {
  this.retrieveItem('userData').then((userData) => {
    const {userid,firstname,middlename,lastname} = this.state;
    this.setState({userDetails:userData});
  
    //this.setState({userid:userData._id,firstname:userData.firstname,middlename:userData.middlename,lastname:userData.lastname});
    //this callback is executed when your Promise is resolved
    }).catch((error) => {
    //this callback is executed when your Promise is rejected
    console.log('Promise is rejected with error: ' + error);
    }); 
  if (Platform.OS === 'android' && !Constants.isDevice) {
    this.setState({
      errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
    });
  } else {
    this._getLocationAsync();
  }
}
retrieveItem = async (key) => {
  try {
    const retrievedItem =  await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {
    console.log(error.message);
  }
}



_getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    this.setState({
      errorMessage: 'Permission to access location was denied',
    });
  }

  let location = await Location.getCurrentPositionAsync({});
  this.setState({ location });
};



nextStep=()=>{
  const {step}=this.state;
  const {address}=this.state;
  console.log(address);
  this.setState({
      step : this.state.step + 1
    })
  }


prevStep=()=>{
  const {step}=this.state;
this.setState({
  step : this.state.step - 1
})
}

handleChange = (input) => event => {

  var newState = {};
  newState[input] = event.nativeEvent.text;
  this.setState(newState);
}

handleChangeDate = (date) => event => {
  this.setState({ [input] : event.nativeEvent.text })
}

saveData =()=>{
 //this.state.input;
 const {userData} = this.state;
 const {userid,firstname,middlename,lastname} = this.state;

 let userdata={
   userid:this.state.userDetails['_id']
}
      //AsyncStorage.setItem('signupDetails', JSON.stringify(signupDetails));
     const json= JSON.stringify(userdata);
      fetch('https://ubuntu-backend.herokuapp.com/api/userdata', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: json
})
.then((response) => response.json())
.then((responseJson) => {
  if(responseJson.success==true){  
    Toast.show({
      text: responseJson.message,
      buttonText: "Okay",
      type: "success",
    })
  }
  else{
    Toast.show({
      text: responseJson.message,
      buttonText: "Okay",
      type: "danger",
    })
  }

})
.catch((error) => {
  alert(error);
})
.done()
}
    render() {
      const {step}=this.state;
      let locationData = '';
      if (this.state.errorMessage) {
        locationData = this.state.errorMessage;
      } else if (this.state.location) {
        locationData = this.state.location.coords;
      }

      const {dob,nationality,location,address,aid,bid,typeofphotoidentification,typeofaddressidentification}=this.state;
      const values={dob,nationality,address,aid,bid,typeofphotoidentification,typeofaddressidentification};
      switch (step) {
        case 1:
          return   <Container>
          <Header/> 
          <Content>
            <StepOneForm  nextStep={this.nextStep} userDetails={this.state.userDetails} handleChangeDate={this.handleChangeDate} handleChange={this.handleChange} locationData={locationData} values={values}/>            
            </Content>        
          </Container>
        case 2:
          return <Container>
          <Header/> 
          <Content>
            <StepTwoForm  prevStep={this.prevStep} nextStep={this.nextStep} handleChange={this.handleChange} values={values}/>
            </Content>                
          </Container>
        case 3:
          return <Container>
          <Header/> 
          <Content> 
          <StepThreeForm  saveData={this.saveData} prevStep={this.prevStep} nextStep={this.nextStep} handleChange={this.handleChange} values={values}/>
          </Content>
          </Container>
      }
    }
}

