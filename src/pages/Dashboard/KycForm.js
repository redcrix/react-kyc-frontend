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

import allReducers from '../../reducers/index.js';
import { Field, reduxForm } from 'redux-form';
const store = createStore(allReducers);

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { Container,Content, Title, Text, Button, Left, Right, Body, Icon, DatePicker } from 'native-base';


export default class KycForm extends Component {
  constructor(props){    
    super(props);
    this.handleChange = this.handleChange.bind(this);
}
state={
  userData:{},
  errorMessage: null,
  location:null,
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
componentWillMount() {
  if (Platform.OS === 'android' && !Constants.isDevice) {
    this.setState({
      errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
    });
  } else {
    this._getLocationAsync();
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


componentDidMount = () => AsyncStorage.getItem('userData').then((value) => this.setState({ userData: value }))
nextStep=()=>{
  const {step}=this.state;
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
  this.setState({ [input] : event.nativeEvent.text })
}

handleChangeDate = (date) => event => {
  this.setState({ [input] : event.nativeEvent.text })
}

saveData =()=>{
 //this.state.input;
 const {userData} = this.state;
 const {userid,firstname,middlename,lastname} = this.state;
 let userdata={
   userid:userData._id,
  firstname:firstname,
  middlename: middlename,
  lastname: lastname
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
    alert(responseJson.message);
})
.catch((error) => {
  alert(error);
})
.done()
}
    render() {
      const {step}=this.state;
      let locationData = 'Waiting..';

      if (this.state.errorMessage) {
        locationData = this.state.errorMessage;
      } else if (this.state.location) {
        locationData = JSON.stringify(this.state.location);
      }
      const {firstname,middlename,lastname,dob,nationality,location,address,aid,bid,typeofphotoidentification,typeofaddressidentification}=this.state;
      const values={firstname,middlename,lastname,dob,nationality,address,aid,bid,typeofphotoidentification,typeofaddressidentification};
      switch (step) {
        case 1:
          return   <Container>
          <Header/> 
          <Content>
            <StepOneForm  nextStep={this.nextStep} handleChangeDate={this.handleChangeDate} handleChange={this.handleChange} locationData={locationData} values={values}/>
            </Content>
                
          </Container>
        case 2:
          return <Container>
          <Header/> 
          <Content><StepTwoForm  prevStep={this.prevStep} nextStep={this.nextStep} handleChange={this.handleChange} values={values}/></Content>
                
          </Container>
        case 3:
          return <Container>
          <Header/> 
          <Content><StepThreeForm  saveData={this.saveData} prevStep={this.prevStep} nextStep={this.nextStep} handleChange={this.handleChange} values={values}/></Content>
              
          </Container>
      }
    }
}

