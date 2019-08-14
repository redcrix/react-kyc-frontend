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

import { Container,Content, Title, Text,H1, Button, Left, Right, Body,Row, Icon, DatePicker,Card,CardItem } from 'native-base';


export default class Dashboard extends Component {
  constructor(props){    
    super(props);
}
kycform()
{
  Actions.kycform();
}
    render() {
      return(   
      <Container>
        <Header/> 
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
                   <Button style={{justifyContent: 'center',alignItems: 'center'}}><Icon name="ios-log-out"></Icon><Text>Logout</Text></Button>
        </Content>
        <Footer/> 
      </Container>
      )
      }
    }


