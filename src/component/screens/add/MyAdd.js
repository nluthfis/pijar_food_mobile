/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {PermissionsAndroid} from 'react-native';
import axios from 'axios';
import config from '../../../../config';
import {PERMISSIONS, request} from 'react-native-permissions';

export default function MyAdd() {
  const [tittle, setTittle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const auth = useSelector(state => state?.auth);
  const navigation = useNavigation();
  const [newPhotoChosen, setNewPhotoChosen] = useState(false);
  const scrollViewRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [photoSize, setPhotoSize] = useState(0);
  const [photoFormat, setPhotoFormat] = useState('');

  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Gallery Permission',
          message: 'App needs access to your gallery ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Gallery permission given');
        chooseImage();
      } else {
        const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, {
          title: 'Gallery Permission',
          message: 'App needs access to your gallery',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });
        console.log(result);

        if (result === 'granted') {
          console.log('Gallery permission given');
          chooseImage();
        } else {
          console.log('Gallery permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        takeImage();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      Alert.alert(err);
    }
  };
  const takeImage = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.assets[0].uri};
        setPhotoSize(response.assets[0].fileSize);
        setPhotoFormat(response.assets[0].type);
        setPhoto(source.uri);
        setNewPhotoChosen(true);
      }
    });
  };
  const chooseImage = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setPhotoSize(response.assets[0].fileSize);
        setPhotoFormat(response.assets[0].type);
        const source = {uri: response.assets[0].uri};
        setPhoto(source.uri);
        setNewPhotoChosen(true);
      }
    });
  };
  const removeImage = () => {
    setPhoto(null);
    setNewPhotoChosen(false);
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      if (tittle.current === '') {
        Alert.alert('Tittle cant be empty');
      } else if (ingredients.current === '') {
        Alert.alert('Ingredients cant be empty');
      } else if (videoLink.current === '') {
        Alert.alert('Video Link cant be empty');
      } else if (category.current === '') {
        Alert.alert('Category cant be empty');
      } else if (photo === null) {
        Alert.alert('Image cant be empty');
      } else if (description.current === '') {
        Alert.alert('Image cant be empty');
      } else if (photoSize > 2000000) {
        Alert.alert('Image size cant be more than 2MB');
      } else if (
        photoFormat !== 'image/jpeg' &&
        photoFormat !== 'image/png' &&
        photoFormat !== 'image/jpg' &&
        photoFormat !== 'image/webp'
      ) {
        Alert.alert('Image format must be jpeg or png or jpg or webp');
      }
      const token = auth?.token;
      const formData = new FormData();
      formData.append('tittle', tittle);
      formData.append('ingredients', ingredients);
      formData.append('videoLink', videoLink);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('photo', {
        uri: photo,
        type: 'image/jpeg',
        name: 'image',
      });
      await axios
        .post(`${config.API_URL}recipes`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          setPhoto(null);
          setTittle('');
          setIngredients('');
          setVideoLink('');
          setCategory('');
          setDescription('');
          setNewPhotoChosen(false);
          if (res.data.message === 'Success insert data') {
            navigation.navigate('MyHome');
          }
          scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth.token) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    }
  }, [auth.token, navigation]);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ecf5f6" barStyle="dark-content" />
      <ScrollView style={styles.scroll} ref={scrollViewRef}>
        <Text style={styles.text}>Add Your Recipe</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#7abec1"
            keyboardType="default"
            underlineColor="transparent"
            theme={{roundness: 10}}
            value={tittle}
            onChangeText={value => setTittle(value)}
            mode="outlined"
            outlineColor={'#7abec1'}
            activeOutlineColor="#206b73"
          />
          <Text style={{color: '#206b73', marginLeft: 20, marginBottom: 5}}>
            Please include a comma followed by a space for each ingredient.
          </Text>
          <TextInput
            style={styles.input2}
            placeholder="Ingredients"
            placeholderTextColor="#7abec1"
            keyboardType="default"
            underlineColor="transparent"
            theme={{roundness: 10}}
            value={ingredients}
            onChangeText={value => setIngredients(value)}
            mode="outlined"
            multiline={true}
            outlineColor={'#7abec1'}
            activeOutlineColor="#206b73"
          />
          <TextInput
            style={styles.input}
            placeholder="Link Video"
            placeholderTextColor="#7abec1"
            keyboardType="default"
            underlineColor="transparent"
            theme={{roundness: 10}}
            value={videoLink}
            onChangeText={value => setVideoLink(value)}
            mode="outlined"
            outlineColor={'#7abec1'}
            activeOutlineColor="#206b73"
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            placeholderTextColor="#7abec1"
            keyboardType="default"
            underlineColor="transparent"
            theme={{roundness: 10}}
            value={category}
            onChangeText={value => setCategory(value)}
            mode="outlined"
            outlineColor={'#7abec1'}
            activeOutlineColor="#206b73"
          />
          <TextInput
            style={styles.input2}
            placeholder="description"
            placeholderTextColor="#7abec1"
            keyboardType="default"
            underlineColor="transparent"
            theme={{roundness: 10}}
            value={description}
            onChangeText={value => setDescription(value)}
            mode="outlined"
            multiline={true}
            outlineColor={'#7abec1'}
            activeOutlineColor="#206b73"
          />
          <Text style={styles.textAdd}>Add Image</Text>
          {photo && (
            <View style={styles.imageContainer}>
              <Image source={{uri: photo}} style={styles.imageGalery} />
              <Button
                mode="contained"
                style={styles.buttonStyle2}
                labelStyle={{color: 'white'}}
                title="Remove Photo"
                onPress={removeImage}>
                Remove Image
              </Button>
            </View>
          )}
          {!newPhotoChosen && (
            <Button
              style={styles.buttonImageUpload}
              mode="outlined"
              labelStyle={{color: '#298994'}}
              theme={{colors: {outline: '#298994'}}}
              onPress={requestGalleryPermission}>
              Choose from Gallery
            </Button>
          )}
          {!newPhotoChosen && (
            <Button
              style={styles.buttonImageUpload}
              mode="outlined"
              labelStyle={{color: '#298994'}}
              theme={{colors: {outline: '#298994'}}}
              onPress={requestCameraPermission}>
              Take Photo
            </Button>
          )}

          <Button
            mode="contained"
            style={styles.button}
            labelStyle={{color: 'white'}}
            theme={{colors: {outline: '#298994'}}}
            title="Submit Photo"
            disabled={loading}
            onPress={handleAdd}>
            {loading ? 'Loading...' : 'Add Recipe'}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf5f6',
  },
  scroll: {
    marginBottom: 90,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    color: '#298994',
  },
  textAdd: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#298994',
  },
  input: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    height: 50,
  },
  input2: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    height: 150,
  },
  button: {
    backgroundColor: '#298994',
    borderRadius: 10,
    margin: 10,
    height: 50,
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  imageGalery: {
    width: 300,
    height: 300,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  buttonImageUpload: {
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '',
  },
  buttonStyle2: {
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#298994',
  },
});
