import React, { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import KycForm from './KycForm';
import Login from '../Login';
import { createAppContainer ,createBottomTabNavigator} from 'react-navigation';
import {  TouchableOpacity,StyleSheet,AsyncStorage,View } from 'react-native';
var s = require('../../../assets/css/style');
import { Container,Content, Title, Text,H1, Button, Left, Right, Body,Row, Icon, DatePicker,Card,CardItem } from 'native-base';


 export default class Dashboard extends React.Component {
  constructor(props){    
    super(props);
}
kycform=() =>{
  this.props.navigation.navigate('KycForm');
}
logout=()=>
{
  this.removeData();
}

removeData = async () => {
  try {
    await AsyncStorage.removeItem('userData');
    this.props.navigation.navigate('Auth');
  } catch (error) {
    return error;
  }
};
    render() {
      return(   
      <Container>
        <Content padder>
       
          <Row style={{justifyContent: 'center',alignItems: 'center'}}>
          <H1>Welcome</H1>
          </Row>
        <Card>
                        <CardItem button>
                            <Icon name='ios-contact' />
                            <Text>View Details</Text>
                        </CardItem>
                   </Card>
                   <Card>
                        <CardItem button onPress={this.kycform}>
                        <Icon name='ios-document' />
                            <Text>Kyc Form</Text>
                        </CardItem>
                   </Card>
                   <Card>
                        <CardItem button onPress={this.kycform}>
                        <Icon name='ios-lock' />
                            <Text>Change password</Text>
                        </CardItem>
                   </Card>
                   <Button  style={s.buttonStyle}  block onPress={this.logout} style={{justifyContent: 'center',alignItems: 'center'}}  ><Icon name="ios-log-out"></Icon><Text>Logout</Text></Button>
        </Content>
        <Footer/> 
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
    

