import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import MultiStep from 'react-native-multistep-wizard';
import StepOneForm from '../../components/StepOneForm';
import StepTwoForm from '../../components/StepTwoForm';
import StepThreeForm from '../../components/StepThreeForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AsyncStorage,Platform,Stylesheet,View} from 'react-native';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import ValidationComponent from '../../validators/index';

import { Container,Content, Title, Text, Button, Left, Right, Body, Icon, DatePicker,Toast ,Input} from 'native-base';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';


export default class KycForm extends ValidationComponent {
  constructor(props){    
    super(props);
    this.handleChange = this.handleChange.bind(this);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var pyyyy=yyyy-18;
    mindate = pyyyy+ '-' + mm + '-' + dd;
    maxdate = yyyy+ '-' + mm + '-' + dd;
    this.state={
      minDate:mindate,
      maxDate:maxdate,
      userDetails:{},
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
    this.setState({userDetails:userData});
    }).catch((error) => {
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

handleChange = (input) => event => {
  this.setState({ [input] : event.nativeEvent.text });
}

handleChangeDate = (date) => event => {
  console.log(date);
  this.setState({ [date] : event.nativeEvent.text })
}

saveData =()=>{
 const {userDetails,dob,residance} = this.state;

 let userdata={
   userid:userDetails['_id'],
   dob:dob,
   residance:residance
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
      
      const {dob,nationality,location,address,aid,bid,typeofphotoidentification,typeofaddressidentification,minDate,maxDate}=this.state;
      const values={dob,nationality,address,aid,bid,typeofphotoidentification,typeofaddressidentification,minDate,maxDate};
          console.log(values.dob);
          return   <Container>
            <ProgressSteps  progressBarColor='#154771'  activeStepIconBorderColor="#154771" activeLabelColor="#154771" completedProgressBarColor="#154771" completedStepIconColor="#154771">
            <ProgressStep label="First Step"  nextBtnStyle={{backgroundColor:'#154771'}} nextBtnTextStyle={{color:'#fff'}}  >
            <StepOneForm  nextStep={this.nextStep} userDetails={this.state.userDetails} handleChangeDate={this.handleChangeDate} handleChange={this.handleChange} locationData={locationData} values={values}/>            
            </ProgressStep>
            <ProgressStep label="Second Step" previousBtnStyle={{backgroundColor:'#154771'}} previousBtnTextStyle={{color:'#fff'}} nextBtnStyle={{backgroundColor:'#154771'}} nextBtnTextStyle={{color:'#fff'}}>
            <StepTwoForm  prevStep={this.prevStep} nextStep={this.nextStep} handleChange={this.handleChange} values={values}/>
            </ProgressStep>
            <ProgressStep label="Third Step"  onSubmit={this.saveData}  previousBtnStyle={{backgroundColor:'#154771'}} previousBtnTextStyle={{color:'#fff'}} nextBtnStyle={{backgroundColor:'#154771'}} nextBtnTextStyle={{color:'#fff'}}>
            <StepThreeForm  saveData={this.saveData} prevStep={this.prevStep} nextStep={this.nextStep} handleChange={this.handleChange} values={values}/>
            </ProgressStep>
            </ProgressSteps>
          </Container>
      
    }
}
