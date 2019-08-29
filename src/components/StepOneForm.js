import React, { Component } from 'react';
import {  StyleSheet,TouchableOpacity, AsyncStorage,View} from 'react-native';
import { Container,DatePicker, Content,Button,  Item, Input,Label,Text,Icon,Row,Col,Grid,List,Left,Right,ListItem,Footer } from 'native-base';
import Geocoder from 'react-native-geocoding';
import { Field,reduxForm } from 'redux-form';
import ValidationComponent from '../validators/index';
import Autocomplete from 'native-base-autocomplete';
import { label } from '@aws-amplify/ui';

var s = require('../../assets/css/style');
const countr = require('./countries.json');

export default class StepOneForm extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
     countries:[],
      query: '',
      selectedCountry: null
    };
  }
  onNextStep = () => {
  console.log('df');
};
      continue= e =>{
        e.preventDefault();
        this.props.nextStep();        
      } 
       componentDidMount() {
             this.setState({ countries:countr});     
       }
      findCountries(query) {
        //method called everytime when we change the value of the input
        if (query === '') {
          return [];
        }
        const { countries } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        //console.log(countries);
        //return the filtered film array according the query from the input
        return countries.filter(country => country.name.search(regex) >= 0);
      }

    
     getMapAddress(){
      const {locationData} = this.props;
      const locationVars=fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+locationData['longitude']+','+locationData['latitude']+'&key=AIzaSyDxk83npmns1fxpNp-tsNE-J-km3mY-gTs');
    }
     render() {
      const { query,selectedCountry } = this.state;
      const countries = this.findCountries(query);
      const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
      const {values,handleChange,handleChangeDate,userDetails} = this.props;
            return(
                <Content padder>
                  <Item stackedLabel padder> 
  
            <Label>First Name</Label>
                      <Input disabled
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.firstname = input}
                    onChange={handleChange('firstname')}
                    defaultValue={userDetails.firstname}
                    />
                    </Item>
                   
                   
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
                    maximumDate={new Date(values.minDate)}
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
                    onDateChange={(dob) => {this.setState({dob}) && this.props.handleChangeDate(dob)  }}
                    defaultValue={values.dob}
                    />
                       </Item>
                       {this.isFieldInError('dob') && this.getErrorsInField('dob').map(errorMessage => <Text  style={styles.errorText}>{errorMessage}</Text>) }
                  
                      <Autocomplete 
          autoCapitalize="none"
          autoCorrect={false}
          data={countries.length === 1 && comp(query, countries[0].name)? [] : countries}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          hideResults={selectedCountry && selectedCountry.name === query}
          placeholder="Search here.."
          renderItem={countdata =>  <ListItem style={{zIndex:2}}
            onPress={() => (
              this.setState({ query: countdata.name ,selectedCountry:countdata})
            )}
          >
            <Text>{countdata.name}</Text>
          </ListItem>}
          keyExtractor={(countdata, index) => index.toString()}
        />
          <View style={{ height: 500, backgroundColor: 'transparent' }} />
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
  autocompleteContainer: {

    zIndex: 9999
  }

});