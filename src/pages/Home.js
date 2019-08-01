import React, { Component } from 'react';
import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Home extends Component {

    render() {
        return(
                <View style={styles.container}>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Image source={require('../images/logo.png')} style={{width: 150, height: 150}}/>
                <View style={styles.socialcontainer}>
        <Icon.Button  name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}
  >Login with Facebook
  </Icon.Button>
  <Icon.Button style={styles.socialicon} name="google" backgroundColor="#3b5998" onPress={this.loginWithFacebook}
  >Login with Google
  </Icon.Button>
  </View>
                <View style={styles.signupTextCont}> 
                    <Text style={styles.signupText}>Dont have an account yet? </Text>
                    <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}>Signup</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    signupTextCont: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingVertical: 16,
      flexDirection: 'row',
    },
    signupText: {
      color: '#12799f', 
      fontSize:16,
    },
    signupButton: {
        color: '#12799f',
        fontSize:16,
        fontWeight: '500',
    },
    socialcontainer:{
      paddingVertical: 50,
    },
    socialicon:{
      marginVertical: 20,
      
    }
});