import React, { Component } from 'react';
import { Container,Radio,DatePicker,Content,CheckBox,Button,List,ListItem,Body,  Item, Label,Text,Icon,Row,Col,Grid,Left,Right } from 'native-base';


export default class StepOneForm extends Component {
    constructor(props) {
        super(props);
      
    }
    state = {
      isSelected: false,
      }
      onValueChange(value) {
        this.setState({
          idtype: value
        });
      }
      
        render() {

          const {isSelected}=this.state;
            return (
              <Content padder>
               
                <ListItem selected={isSelected}  >
                <CheckBox checked={isSelected} onPress={()=>this.setState({isSelected:!!isSelected? false : true })} />
                <Body>
                <Text> I Agree to terms and conditions</Text>
          </Body>
          </ListItem>
        
              </Content>
            );
          }
        }
 
