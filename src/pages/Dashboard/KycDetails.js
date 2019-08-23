import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import MultiStep from 'react-native-multistep-wizard';
import StepOneForm from '../../components/StepOneForm';
import StepTwoForm from '../../components/StepTwoForm';
import StepThreeForm from '../../components/StepThreeForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AsyncStorage,Platform} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


import { Container,Content,List,ListItem, Title, Text,H1, Button, Left, Right, Body,Row, Icon, DatePicker,Card,CardItem } from 'native-base';


export default class KycDetails extends Component {
  constructor(props){    
    super(props);
}
kycform()
{
  Actions.kycform();
}
verifyData(){
    Actions.verfiy();
}
    render() {
      return(   
      <Container>
        <Header/> 
        <Content padder>
        <List>
            <ListItem itemDivider>
              <Text>Kyc Details</Text>
            </ListItem>                    
            <ListItem>
              <Text>FirstName</Text>
            </ListItem>
            <ListItem>
              <Text>MiddleName</Text>
            </ListItem>
            <ListItem>
              <Text>LastName</Text>
            </ListItem>  
            <ListItem onPress="verifyData()">
              <Text>Date Of Birth</Text><Icon name="add"/>

            </ListItem>
          </List>
        </Content>
        <Footer/> 
      </Container>
      )
      }
    }


