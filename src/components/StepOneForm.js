import React, { Component } from 'react';
import {  StyleSheet,TouchableOpacity, AsyncStorage} from 'react-native';
 
import {Actions} from 'react-native-router-flux';
import { Container,DatePicker, Content,Button,  Item, Input,Label,Text,Icon,Row,Col,Grid,Left,Right } from 'native-base';
import Geocoder from 'react-native-geocoding';

export default class StepOneForm extends Component {
      continue= e =>{
        e.preventDefault();
        this.props.nextStep();
      } 

      
    render() {
      const {values,handleChange,handleChangeDate,locationData} = this.props;
      console.log(locationData);
      
            return(
                <Content padder>
                  <Item floatingLabel padder> 
            <Label>First Name</Label>
                      <Input 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.firstname = input}
                    onChange={this.props.handleChange('firstname')}
                    defaultValue={values.firstname}
                    />
                    </Item>
                    <Item floatingLabel padder> 
            <Label>Middle Name</Label>
                    <Input 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.middlename = input}
                    onChange={this.props.handleChange('middlename')}
                    defaultValue={values.lastname}
                    />
                    </Item>
                    <Item floatingLabel padder> 
            <Label>Last Name</Label>
                    <Input 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.lastname = input}
                    onChange={this.props.handleChange('lastname')}
                    defaultValue={values.lastname}

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
                    <Item floatingLabel padder> 
                    <Label>Address</Label>
                
                     <Input 
                    onChangeText={(address) => this.setState({address})} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.address = input}
                    onChange={this.props.handleChange('address')}
                    />
                       </Item>
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
          <Button iconRight  onPress={this.continue}>
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
  itemstyle:{
    marginBottom:5
  }
});
 
