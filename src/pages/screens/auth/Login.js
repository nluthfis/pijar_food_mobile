/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Avatar, TextInput, Button, Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../../../store/reducers/authSlice';

const image = require('../../../assets/logo.png');
export default function Login() {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector(state => state?.auth);
  const message = useSelector(state => state?.auth?.message);
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  useEffect(() => {
    if (auth?.token) {
      navigation.navigate('MyTabs');
    }
  }, [auth?.token]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await dispatch(loginUser({emailRef, passwordRef}));
    } catch (error) {
      console.log(error);
      alert('An error occurred while logging in: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ecf5f6" barStyle="dark-content" />
      <View style={styles.avatarContainer}>
        <Button
          style={styles.btnNotnow}
          onPress={() => navigation.navigate('MyTabs')}>
          <Text style={{color: '#1b5b63'}}>Not Now</Text>
        </Button>
        <Avatar.Image size={200} source={image} />
        <Text style={styles.welcomeText}>Welcome!</Text>

        <Text style={styles.subText}>Log in to your existing account.</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#1b5b63"
            keyboardType="email-address"
            underlineColor="transparent"
            theme={{roundness: 15}}
            mode="outlined"
            outlineColor={'#298994'}
            activeOutlineColor="#1b5b63"
            onChangeText={value => (emailRef.current = value)}
            left={
              <TextInput.Icon
                icon="account-outline"
                color={isTextInputFocused =>
                  isTextInputFocused ? '#1b5b63' : '#298994'
                }
                size={32}
                style={styles.icon}
              />
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#1b5b63"
            secureTextEntry={!isPasswordVisible}
            underlineColor="transparent"
            theme={{roundness: 15}}
            onChangeText={value => (passwordRef.current = value)}
            mode="outlined"
            outlineColor={'#298994'}
            activeOutlineColor="#1b5b63"
            left={
              <TextInput.Icon
                icon="lock"
                color={isTextInputFocused =>
                  isTextInputFocused ? '#1b5b63' : '#298994'
                }
                size={30}
                style={styles.icon}
              />
            }
            right={
              <TextInput.Icon
                icon={isPasswordVisible ? 'eye-off' : 'eye'}
                color="#298994"
                size={30}
                style={styles.icon}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            }
          />
          <Text style={styles.forgot}>Forgot Password ?</Text>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              handleLogin();
              onToggleSnackBar();
            }}>
            <Text style={{color: 'white'}}>Log In</Text>
          </Button>
          <View style={styles.register}>
            <Text style={{color: 'black'}}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signup}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Snackbar
        visible={visible || isLoading}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        {isLoading ? 'Loading...' : message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ecf5f6',
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    resizeMode: 'cover',
  },
  welcomeText: {
    marginTop: 10,
    fontSize: 24,
    color: 'black',
  },
  btnNotnow: {
    position: 'absolute',
    color: '#298994',
    top: 30,
    right: 0,
    zIndex: 1,
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
    color: 'black',
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
