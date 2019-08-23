import React, { Component } from 'react';
import { Image,StyleSheet} from 'react-native';
import FormAuth from '../components/FormAuth';
import SocialIcons from '../components/SocialIcons';
import {Actions} from 'react-native-router-flux';
import { SocialIcon } from 'react-native-elements';
import { Container,Content, Title,Thumbnail, Text, Button, Left, Right, Body, Icon,Grid,Row } from 'native-base';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';

var s = require('../../assets/css/style');
export default class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      totalDuration: 0,
    };

  }
  login = () => {
    this.props.navigation.navigate('Login');
}

componentDidMount() {

  fetch('https://ubuntu-backend.herokuapp.com/api/user/settings', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
   const data= JSON.stringify(responseJson.data); 
   const newStr=data.substring(1, data .length-1);
   const nnewStr=JSON.parse(newStr);
   const finaldate=nnewStr.countdownExpDate;
   var that = this;
   var date = moment()
     .utcOffset('+05:30')
     .format('YYYY-MM-DD hh:mm:ss');
   //Getting the current date-time with required formate and UTC   
   
   var expirydate = finaldate;//You can set your own date-time
   //Let suppose we have to show the countdown for above date-time 
   var diffr = moment.duration(moment(expirydate).diff(moment(date)));
   //difference of the expiry date-time given and current date-time
 console.log(diffr);
   var hours = parseInt(diffr.asHours());
   var minutes = parseInt(diffr.minutes());
   var seconds = parseInt(diffr.seconds());
   
   var d = parseInt(hours * 60 * 60 + minutes * 60 + seconds);
   //converting in seconds
 
   this.setState({ totalDuration: parseInt(d) });
  })
  .catch((error) => {
    return '';
  })
  .done()
}
    render() {
        return(
          <Container>
                  <Content  padder >
                  <Grid style={{justifyContent: 'center',alignItems: 'center',marginTop:10}}> 
                  <Row>
                  <Image source={require('../images/logo.png')} style={{width: 150, height: 150}}/>
                  </Row>
                  </Grid>
                  <Text>{"\n"}</Text>
                  <Text>{"\n"}</Text>
                  <Text>{"\n"}</Text>
                    <Grid style={{justifyContent: 'center',alignItems: 'center'}}> 
            <Row><CountDown  
          until={this.state.totalDuration}
          //duration of countdown in seconds
          timetoShow={('M', 'S')}
          size={25}
        /></Row> 
        <Text>{"\n"}</Text>     
            <Row><Button style={s.buttonStyle} success onPress={this.login}><Text>Continue</Text><Icon name='ios-arrow-forward' /></Button></Row>    
            </Grid>
                </Content>
          </Container>
        )
    }
}

const styles = StyleSheet.create({

    timercontent:{
      backgroundColor:'blue',
      padding:5,
      marginRight:6,
      marginBottom:10,
      fontSize:18,
      color:'#fff'
    },
});