import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import KycForm from './pages/Dashboard/KycForm';
import Dashboard from './pages/Dashboard/Dashboard';

export default class Routes extends Component {
    constructor(props){
        super(props);
    }

    
    render() {
   
        return (
            <Router barButtonIconStyle ={styles.barButtonIconStyle}
            hideNavBar={true} 
            navigationBarStyle={{backgroundColor: '#154771',}} 
            titleStyle={{color: 'white',}} >
                <Stack key="root">   
                
                <Scene key="home" component={Home} title="Home"/>                
                <Scene key="login" component={Login} title="Login"/>
                <Scene key="signup" component={Signup} title="Sign up"/> 
                <Scene key="dashboard" component={Dashboard} title="Dashboard"/>
                <Scene key="kycform" component={KycForm} title="KycForm"/>
                </Stack>
            </Router>
        )
    }
}

const styles = {
    barButtonIconStyle: {
        tintColor: 'red'
    }
}