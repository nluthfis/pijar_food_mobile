/* eslint-disable prettier/prettier */
import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import config from '../../../../config';

export default function Register() {
  const navigation = useNavigation();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const confirmPasswordRef = useRef();
  const imageUrl =
    'https://res.cloudinary.com/dkp658sgi/image/upload/v1684292539/2023-05-17T03:02:16.644Z.jpg';
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const handleRegister = async () => {
    setLoading(true);
    if (passwordRef.current !== confirmPasswordRef.current) {
      Alert.alert('Error', 'Passwords do not match!');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(`${config.API_URL}profile/register`, {
        fullName: nameRef.current,
        email: emailRef.current,
        phoneNumber: phoneRef.current,
        password: passwordRef.current,
      });
      const userId = response.data.data[0].id.toString();
      await firestore().collection('users').doc(userId).set({
        fullName: nameRef.current,
        email: emailRef.current,
        phoneNumber: phoneRef.current,
        photo: imageUrl,
        userId: response.data.data[0].id.toString(),
      });
      setLoading(false);
      setMessage('Registration successful');
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
      if (response.data.message === 'Success insert data') {
        navigation.navigate('Login');
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
      Alert.alert('Error', 'Email Already Registered / Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Let’s Get Started !!</Text>
      <Text style={styles.subText}>
        Create new account to access all feautures
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#298994"
        keyboardType="default"
        underlineColor="transparent"
        theme={{roundness: 15}}
        mode="outlined"
        outlineColor={'#298994'}
        activeOutlineColor="#1b5b63"
        onChangeText={value => (nameRef.current = value)}
        left={
          <TextInput.Icon
            icon="account-outline"
            color="#1b5b63"
            size={32}
            style={styles.icon}
          />
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#298994"
        keyboardType="email-address"
        underlineColor="transparent"
        theme={{roundness: 15}}
        mode="outlined"
        outlineColor={'#298994'}
        activeOutlineColor="#1b5b63"
        onChangeText={value => (emailRef.current = value)}
        left={
          <TextInput.Icon
            icon="email-outline"
            color="#1b5b63"
            size={32}
            style={styles.icon}
          />
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#298994"
        keyboardType="phone-pad"
        underlineColor="transparent"
        theme={{roundness: 15}}
        mode="outlined"
        outlineColor={'#298994'}
        activeOutlineColor="#1b5b63"
        onChangeText={value => (phoneRef.current = value)}
        left={
          <TextInput.Icon
            icon="phone"
            color="#1b5b63"
            size={32}
            style={styles.icon}
          />
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Create New Password"
        placeholderTextColor="#298994"
        secureTextEntry={!isPasswordVisible}
        underlineColor="transparent"
        theme={{roundness: 15}}
        mode="outlined"
        outlineColor={'#298994'}
        activeOutlineColor="#1b5b63"
        onChangeText={value => (passwordRef.current = value)}
        left={
          <TextInput.Icon
            icon="lock-open-outline"
            color="#1b5b63"
            size={30}
            style={styles.icon}
          />
        }
        right={
          <TextInput.Icon
            icon={isPasswordVisible ? 'eye-off' : 'eye'}
            color="#1b5b63"
            size={30}
            style={styles.icon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        }
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#298994"
        secureTextEntry={!isPasswordVisible}
        underlineColor="transparent"
        theme={{roundness: 15}}
        mode="outlined"
        outlineColor={'#298994'}
        activeOutlineColor="#1b5b63"
        onChangeText={value => (confirmPasswordRef.current = value)}
        left={
          <TextInput.Icon
            icon="lock-check-outline"
            color="#1b5b63"
            size={30}
            style={styles.icon}
          />
        }
        right={
          <TextInput.Icon
            icon={isPasswordVisible ? 'eye-off' : 'eye'}
            color="#1b5b63"
            size={30}
            style={styles.icon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        }
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleRegister}
        loading={loading}
        disabled={loading}>
        <Text style={{color: 'white'}}>Register</Text>
      </Button>
      <View style={styles.register}>
        <Text style={{color: 'black'}}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signup}>Log in here</Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        {message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    alignItems: 'center',
    backgroundColor: '#ecf5f6',
    justifyContent: 'center',
  },
  welcomeText: {
    marginTop: 10,
    fontSize: 24,
    color: 'black',
  },
  subText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  formContainer: {
    marginTop: 10,
    justifyContent: 'center',
  },
  input: {
    width: 350,
    height: 50,
    borderRadius: 15,
    marginTop: 10,
  },
  icon: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -26}],
  },
  forgot: {
    textAlign: 'right',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#7abec1',
    borderRadius: 10,
    marginTop: 10,
    width: 350,
    height: 50,
    justifyContent: 'center',
  },
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signup: {
    color: 'black',
    fontWeight: 'bold',
  },
});
