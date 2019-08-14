import React, { Component } from 'react';
import { Container, Icon, Header, Content, Footer, FooterTab, Button, Text,Grid, Row } from 'native-base';
import { SocialIcon } from 'react-native-elements';
import { StyleSheet } from 'react-native';

export default class SocialIcons extends Component {


    render() {
        return(    
          <Content padder style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
            <Grid>
            <Row style={{justifyContent:'center'}}>
           <SocialIcon 
  type='facebook'
/>
<SocialIcon
  type='twitter'
/>
<SocialIcon
  type='instagram'
/>
<SocialIcon  type='google-plus-official'
/>
</Row>
</Grid>
</Content> 

        )
    }
}

