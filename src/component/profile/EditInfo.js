/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import config from '../../../config';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../../../store/reducers/userSlice';
import {useNavigation} from '@react-navigation/native';

export default function EditInfo() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const auth = useSelector(state => state?.auth);
  const user = useSelector(state => state?.user);
  const [message, setMessage] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleEdit = async () => {
    setLoading(true);
    try {
      const token = auth?.token;
      if (passwordRef.current !== confirmPasswordRef.current) {
        setMessage('Password and confirm password do not match');
        setVisible(true);
        setLoading(false);
        return;
      } else if (passwordRef.current === confirmPasswordRef.current) {
        await axios
          .patch(
            `${config.API_URL}profile`,
            {
              fullName: nameRef.current,
              email: emailRef.current,
              phoneNumber: phoneRef.current,
              password: passwordRef.current,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          )
          .then(async res => {
            dispatch(setUser(res.data.data[0]));
            const userId = res.data.data[0].id.toString();
            if (res.data.message === 'Success edit data') {
              await firestore()
                .collection('users')
                .doc(userId)
                .update({
                  fullName:
                    nameRef.current !== undefined
                      ? nameRef.current
                      : res.data.data[0].fullName,
                  email:
                    emailRef.current !== undefined
                      ? emailRef.current
                      : res.data.data[0].email,
                  phoneNumber:
                    phoneRef.current !== undefined
                      ? phoneRef.current
                      : res.data.data[0].phoneNumber,
                })
                .then(() => {
                  setMessage('User data updated!');
                  setVisible(true);
                  navigation.navigate('MyProfile');
                })
                .catch(error => {
                  setMessage('Error updating user data in Firebase: ' + error);
                  setVisible(true);
                });
            }
            setLoading(false);
          })
          .catch(error => {
            setMessage('Error: ' + error);
            setVisible(true);
            setLoading(false);
          });
      }
    } catch (error) {
      setMessage('Error: ' + error);
      setVisible(true);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={
          user?.data?.fullName || user?.data[0]?.fullName || 'No Name'
        }
        placeholderTextColor="#298994"
        keyboardType="default"
        underlineColor="transparent"
        theme={{roundness: 15}}
        mode="outlined"
        outlineColor={'#298994'}
        activeOutlineColor="#1b5b63"
        onChangeText={value => (nameRef.current = value)}
        left={
          <TextInput.Icon icon="account-outline" color="#1b5b63" size={32} />
        }
      />
      <TextInput
        style={styles.input}
        placeholder={user?.data?.email || user?.data[0]?.email || 'No Email'}
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
        placeholder={
          user?.data?.phoneNumber ||
          user?.data[0]?.phoneNumber ||
          'No Phonenumber'
        }
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
        placeholder="Change Password"
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
        placeholder="Confirm Password"
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
        style={styles.buttonStyle2}
        onPress={() => {
          handleEdit();
          onToggleSnackBar();
        }}
        disabled={loading}
        loading={loading}>
        <Text style={{color: 'white'}}>Save</Text>
      </Button>
      <Snackbar
        visible={visible || loading}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {},
        }}>
        {loading ? 'Loading...' : message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf5f6',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    borderRadius: 15,
    marginTop: 10,
    justifyContent: 'center',
  },
  buttonStyle2: {
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    height: 50,
    width: 200,
    justifyContent: 'center',
    backgroundColor: '#298994',
  },
});
