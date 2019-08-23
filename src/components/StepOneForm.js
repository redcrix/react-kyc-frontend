import React, { Component } from 'react';
import {  StyleSheet,TouchableOpacity, AsyncStorage} from 'react-native';
import { Container,DatePicker, Content,Button,  Item, Input,Label,Text,Icon,Row,Col,Grid,Left,Right } from 'native-base';
import Geocoder from 'react-native-geocoding';
import { Field,reduxForm } from 'redux-form';
import ValidationComponent from '../validators/index';
var s = require('../../assets/css/style');

export default class StepOneForm extends ValidationComponent {
  
      continue= e =>{
        e.preventDefault();
        const {dob,address} = this.state;
      
        this.props.nextStep();
        
      } 
     getMapAddress(){
      const {locationData} = this.props;
      const locationVars=fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+locationData['longitude']+','+locationData['latitude']+'&key=AIzaSyDxk83npmns1fxpNp-tsNE-J-km3mY-gTs');
    }
     render() {
      const {values,handleChange,handleChangeDate,userDetails} = this.props;
  
            return(
                <Content padder>
                  <Item stackedLabel padder> 
  
            <Label>First Name</Label>
                      <Input disabled
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.firstname = input}
                    onChange={this.props.handleChange('firstname')}
                    defaultValue={userDetails.firstname}
                    />
                    </Item>
                    {this.isFieldInError('firstname') && this.getErrorsInField('firstname').map(errorMessage => <Text  style={styles.errorText}>{errorMessage}</Text>) }
                   
                    <Item stackedLabel padder> 
            <Label>Middle Name</Label>
                    <Input disabled
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.middlename = input}
                    onChange={this.props.handleChange('middlename')}
                    defaultValue={userDetails.middlename}
          
                    />
                    </Item>
                    <Item stackedLabel padder> 
            <Label>Last Name</Label>
                    <Input disabled
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.lastname = input}
                    onChange={this.props.handleChange('lastname')}
                    defaultValue={userDetails.lastname}
           
                    />
                    </Item>
                    <Item > 
                    <Label>Date Of Birth</Label>
                    <DatePicker
                    mode="date"
                    format="YYYY-MM-DD"
                    minDate="1950-05-01"
                    maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                    },
                    dateInput: {
                    marginLeft: 36
                    }
                    }}
                    onDateChange={(dob) => {this.setState({dob})}}
                    onChange={this.props.handleChangeDate('dob')}
                    
                    />
                       </Item>
                       {this.isFieldInError('dob') && this.getErrorsInField('dob').map(errorMessage => <Text  style={styles.errorText}>{errorMessage}</Text>) }
                    <Item floatingLabel padder> 
                    <Label>Address</Label>
                
                     <Input 
                    onChangeText={(address) => this.setState({address})} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.address = input}
                    onChange={this.props.handleChange('address')}
                    defaultValue={this.getMapAddress()}
                    />
                       </Item>
                       {this.isFieldInError('address') && this.getErrorsInField('address').map(errorMessage => <Text  style={styles.errorText}>{errorMessage}</Text>) }
                    <Item floatingLabel padder> 
                    <Label>Nationality</Label>
                    <Input 
                    onChangeText={(nationality) => this.setState({nationality})} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.nationality = input}
                    onChange={this.props.handleChange('nationality')}
                    />
                    </Item>
        <Grid style={{marginTop:8}}>
        <Left>
        <Button iconLeft disabled  onPress={this.back}>
            <Icon name='arrow-back' />
            <Text>Back</Text>
          </Button>
          </Left>
<Right>
          <Button iconRight style={s.buttonStyle} onPress={this.continue}>
          <Text>Next</Text>
           <Icon name='arrow-forward'  />
            
          </Button>
          </Right>
          </Grid>
                </Content>
                
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