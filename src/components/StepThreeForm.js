import React, { Component } from 'react';
import {  TouchableOpacity, AsyncStorage ,TouchableWithoutFeedback} from 'react-native';
 
import {Actions} from 'react-native-router-flux';
import { Container,DatePicker, Content,Button,ListItem,Radio,  Item, Label,Text,Icon,Row,Col,Grid,Left,Right } from 'native-base';
import { RadioButtons } from 'react-native-radio-buttons';
var s = require('../../assets/css/style');
export default class StepOneForm extends Component {
    constructor(props) {
        super(props);
      
    }
    state = {
        selectedOption: '',
      }
      back= e =>{
        e.preventDefault();
        this.props.prevStep();
      }
      submit= e =>{
        e.preventDefault();
        this.props.saveData();
      } 
        render() {
            const options = ['Agree', 'Disagree'];
        
            function setSelectedOption(selectedOption) {
              this.setState({
                selectedOption,
              });
            }
        
            function renderOption(option, selected, onSelect, index) {
              const style = selected ? { fontWeight: 'bold' } : {};
        
              return (
                <TouchableWithoutFeedback onPress={onSelect} key={index}>
                  <Text style={style}>{option}</Text>
                </TouchableWithoutFeedback>
              );
            }
        
            function renderContainer(optionNodes) {
              return <Content>{optionNodes}</Content>;
            }
        
            return (
              <Content padder>
                <RadioButtons
                  options={options}
                  onSelection={setSelectedOption.bind(this)}
                  selectedOption={this.state.selectedOption}
                  renderOption={renderOption}
                  renderContainer={renderContainer}
                />
                <Grid style={{marginTop:8}}>
        <Left>
        <Button iconLeft style={s.buttonStyle} onPress={this.back}>
            <Icon name='arrow-back' />
            <Text>Back</Text>
          </Button>
          </Left>
          </Grid>
          <Grid style={{marginTop:8}}>
        <Left>
        <Button style={s.buttonStyle} onPress={this.submit}>
            <Text>Submit</Text>
          </Button>
          </Left>
          </Grid>
              </Content>
            );
          }
        }
 
