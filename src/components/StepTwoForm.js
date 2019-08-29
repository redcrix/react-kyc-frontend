import React, { Component } from 'react';
import {  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View} from 'react-native';
import { Icon, Item,Button, Picker,Left,Right, Content, Container ,Text,Row,Col,Grid, Label,Input } from 'native-base';
 
import {Actions} from 'react-native-router-flux';
//import * as ImagePicker from 'expo-image-picker';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { Dropdown } from 'react-native-material-dropdown';
var s = require('../../assets/css/style');


 
export default class StepTwoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraType: 'back',
      mirrorMode: false,
      idtype:''
    };
  }
  onValueChange(value) {
    this.setState({
      idtype: value
    });
  }
  async componentWillMount() {
    const { status } =await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission:status==='granted'});
}
snap = async (recognize) => {
  try {
      if (this.camera) {
          let photo = await this.camera.takePictureAsync({ base64: true });
          if(!faceDetected) {
              alert('No face detected!');
              return;
          }

          const userId = makeId();
          const { base64 } = photo;
          this[recognize ? 'recognize' : 'enroll']({ userId, base64 });
      }
  } catch (e) {
      console.log('error on snap: ', e)
  }
};
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
         <Item floatingLabel padder> 
                    <Label>Nationality</Label>
                    <Input 
                    onChangeText={(nationality) => this.setState({nationality})} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    ref={(input) => this.nationality = input}
                    onChange={this.props.handleChange('nationality')}
                    />

                    </Item>
        <Item picker>
          <Label>ID Type</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your ID type"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.idtype}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="Addhaar Card" value="1" />
                <Picker.Item label="Driving Licence" value="2" />
                <Picker.Item label="passport" value="3" />
              </Picker>
              </Item>
            
      
        <StatusBar barStyle="default" />
     
        <Grid style={styles.maybeRenderContainer}>
        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
          <Row>
        <Button block style={s.buttonStyle}
          onPress={this._takePhotoAddress}
          
        ><Text>Choose Photo</Text></Button>
</Row>
        </Grid>
        <Grid style={styles.maybeRenderContainer}>
        {this._maybeRenderImagePhoto()}
        {this._maybeRenderUploadingOverlayPhoto()}
        <Row>
        <Button style={s.buttonStyle} block
          onPress={this._takePhoto}
          
        ><Text>Take a photo</Text></Button>
        </Row>
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
        <Grid
          style={styles.maybeRenderContainer}>
          <Row
            style={styles.maybeRenderImageContainer}>
            <Image source={require('../images/idproof.png')} style={styles.maybeRenderImage} />
          </Row>
          <Text
            onPress={this._copyToClipboard}
            onLongPress={this._share}
            style={styles.maybeRenderImageText}>
          </Text>
        </Grid>
        </Content>
      );
    }
    else{
    return (
      <Content padder>
      <Grid
        style={styles.maybeRenderContainer}>
        <Row
          style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: aid }} style={styles.maybeRenderImage} />
        </Row>
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}>
        </Text>
      </Grid>
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
        <Grid
          style={styles.maybeRenderContainer}>
          <Row
            style={styles.maybeRenderImageContainer}>
            <Image source={require('../images/idproof.png')} style={styles.maybeRenderImage} />
          </Row>
          <Text
            onPress={this._copyToClipboard}
            onLongPress={this._share}
            style={styles.maybeRenderImageText}>
          </Text>
        </Grid>
        </Content>
      );
    }
else{
    return (
      <Content padder>
      <Grid
        style={styles.maybeRenderContainer}>
        <Row
          style={styles.maybeRenderImageContainer}>
            
          <Image source={{ uri: sid }} style={styles.maybeRenderImage} />
        </Row>
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}>
        </Text>
      </Grid>
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
  let uriParts = uri.split('.');
  console.log(uri);
  let fileType = uriParts[uriParts.length - 1];
  let formData = new FormData();
  formData.append('aid', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  formData.append('idtype',this.state.idtype);
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
  let apiUrl = 'http://redcrix-sm.herokuapp.com';
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
  maybeRenderContainer:{
   justifyContent: 'center',alignItems: 'center',marginTop:10
  },
    maybeRenderImage: {
      height: 250,
      width: 320,
    },
    maybeRenderImageText: {
      paddingHorizontal: 10,
      paddingVertical: 10,
    }
});