import React, { Component } from 'react';
import {  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View} from 'react-native';
import { Icon, Item,Button, Picker,Left,Right, Content,Grid, Container ,Text,Row,Col, Label } from 'native-base';
 
import {Actions} from 'react-native-router-flux';
//import * as ImagePicker from 'expo-image-picker';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Camera from 'react-native-camera';
import {faceDetector} from 'expo-face-detector';
import { Dropdown } from 'react-native-material-dropdown';


 
export default class StepTwoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraType: 'back',
      mirrorMode: false
    };
  }
  continue= e =>{
    e.preventDefault();
    this.props.nextStep();
  } 

  state = {
    aid: null,
    uploading: false,
    sid:null
  };
  back= e =>{
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    let {
      aid
    } = this.state;
    const {values,handleChange} = this.props;

    return (
      <Content padder>
        <Item picker>
          <Label>ID Type</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your ID type"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
              >
                <Picker.Item label="State ID" value="1" />
                <Picker.Item label="Driving Licence" value="2" />
                <Picker.Item label="Military ID" value="3" />
                <Picker.Item label="Passport" value="4" />
                <Picker.Item label="National Card" value="5" />
              </Picker>
              </Item>
            
      
        <StatusBar barStyle="default" />
     
        <Grid style={{marginBottom:8}}>
        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
          <Row>
        <Button block
          onPress={this._takePhotoAddress}
          
        ><Text>Choose Photo</Text></Button>
</Row>
        </Grid>
        <Grid  style={{marginBottom:8}}>
        {this._maybeRenderImagePhoto()}
        {this._maybeRenderUploadingOverlayPhoto()}
        <Row>
        <Button block
          onPress={this._takePhoto}
          
        ><Text>Take a photo</Text></Button>
        </Row>
        </Grid>
        <Grid>
        <Left>
        <Button iconLeft  onPress={this.back}>
            <Icon name='arrow-back' />
            <Text>Back</Text>
          </Button>
          </Left>
<Right>
          <Button iconRight  onPress={this.continue}>
          <Text>Next</Text>
           <Icon name='arrow-forward'  />
            
          </Button>
          </Right>
          </Grid>
         
      </Content>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <Content
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </Content>
      );
    }
  };

  _maybeRenderUploadingOverlayPhoto = () => {
    if (this.state.uploading) {
      return (
        <Content
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </Content>
      );
    }
  };

  _maybeRenderImage = () => {
    let {
      aid
    } = this.state;
    console.log(aid);
    if (!aid) {
      return (
        <Content>
        <View
          style={styles.maybeRenderContainer}>
          <View
            style={styles.maybeRenderImageContainer}>
            <Image source={require('../images/idproof.png')} style={styles.maybeRenderImage} />
          </View>
          <Text
            onPress={this._copyToClipboard}
            onLongPress={this._share}
            style={styles.maybeRenderImageText}>
          </Text>
        </View>
        </Content>
      );
    }
    else{
    return (
      <Content padder>
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: aid }} style={styles.maybeRenderImage} />
        </View>
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}>
        </Text>
      </View>
      </Content>
    );
    }
  };

  _maybeRenderImagePhoto = () => {
    let {
      sid
    } = this.state;
    if (!sid) {
      return (
        <Content>
        <View
          style={styles.maybeRenderContainer}>
          <View
            style={styles.maybeRenderImageContainer}>
            <Image source={require('../images/idproof.png')} style={styles.maybeRenderImage} />
          </View>
          <Text
            onPress={this._copyToClipboard}
            onLongPress={this._share}
            style={styles.maybeRenderImageText}>
          </Text>
        </View>
        </Content>
      );
    }
else{
    return (
      <Content padder>
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
            
          <Image source={{ uri: sid }} style={styles.maybeRenderImage} />
        </View>
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}>
        </Text>
      </View>
      </Content>
    );
}
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
      });

      this._handleImagePickedPhoto(pickerResult);
    }
  };

  _takePhotoAddress = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
      });

      this._handleImagePicked(pickerResult);
    }
  };

  

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
  
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({
        uploading: true
      });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        console.log(uploadResult.img);
                this.setState({
                  aid: uploadResult.img
        });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };

_handleImagePickedPhoto = async pickerResult => {
  let uploadResponse, uploadResult;

  try {
    this.setState({
      uploading: true
    });

    if (!pickerResult.cancelled) {
      uploadResponse = await uploadImagePhotoAsync(pickerResult.uri);
      uploadResult = await uploadResponse.json();
              this.setState({
                sid: uploadResult.img
      });
      alert('success');
    }
  } catch (e) {
    console.log({ uploadResponse });
    console.log({ uploadResult });
    console.log({ e });
    alert('Upload failed, sorry :(');
  } finally {
    this.setState({
      uploading: false
    });
  }
};
}

async function uploadImageAsync(uri) {
  let apiUrl = 'http://redcrix.pythonanywhere.com/';

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

  let uriParts = uri.split('.');
  console.log(uri);
  let fileType = uriParts[uriParts.length - 1];
  let formData = new FormData();
  formData.append('aid', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  formData.append('idtype',2);
  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options,uri);
}
async function uploadImagePhotoAsync(uri) {
  let apiUrl = 'http://19b38645.ngrok.io';

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];
  let formData = new FormData();
  formData.append('sid', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options,uri);
}
 
const styles = StyleSheet.create({

    maybeRenderImage: {
      height: 250,
      width: 320,
    },
    maybeRenderImageText: {
      paddingHorizontal: 10,
      paddingVertical: 10,
    }
});