import React, { Component } from 'react';
import { Image,StyleSheet} from 'react-native';
import FormAuth from '../components/FormAuth';
import SocialIcons from '../components/SocialIcons';
import {Actions} from 'react-native-router-flux';
import { SocialIcon } from 'react-native-elements';
import { Container,Content, Title,Thumbnail, Text, Button, Left, Right, Body, Icon,Grid,Row } from 'native-base';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';


export default class Home extends Component {


  constructor(props){
    super(props);
    this.state = {
      totalDuration: 0,
    };

  }
  login() {
    Actions.login()
}
componentDidMount() {
  var that = this;


  var date = moment()
    .utcOffset('+05:30')
    .format('YYYY-MM-DD hh:mm:ss');
  //Getting the current date-time with required formate and UTC   
  
  var expirydate = '2019-10-23 04:00:45';//You can set your own date-time
  //Let suppose we have to show the countdown for above date-time 

  var diffr = moment.duration(moment(expirydate).diff(moment(date)));
  //difference of the expiry date-time given and current date-time

  var hours = parseInt(diffr.asHours());
  var minutes = parseInt(diffr.minutes());
  var seconds = parseInt(diffr.seconds());
  
  var d = parseInt(hours * 60 * 60 + minutes * 60 + seconds);
  //converting in seconds

  that.setState({ totalDuration: parseInt(d) });
  //Settign up the duration of countdown in seconds to re-render
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
          //formate to show
          onFinish={() => alert('Expired')}
          size={25}
        /></Row> 
        <Text>{"\n"}</Text>     
            <Row><Button success onPress={this.login}><Text>Continue</Text><Icon name='ios-arrow-forward' /></Button></Row>    
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
    }
});