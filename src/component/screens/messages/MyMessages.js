/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {List, Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, CommonActions} from '@react-navigation/native';

const image = require('../../../assets/profile.jpg');

export default function MyMessages() {
  const navigation = useNavigation();
  const auth = useSelector(state => state?.auth);
  const user = useSelector(state => state?.user);
  const [users, setUsers] = useState([]);
  const id = user?.data?.id || user?.data[0]?.id || '';
  const email = user?.data?.email || user?.data[0]?.email || '';

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

  useEffect(() => {
    let tempData = [];
    if (email) {
      firestore()
        .collection('users')
        .where('email', '!=', email)
        .get()
        .then(res => {
          if (res.docs.length > 0) {
            res.docs.map(item => {
              tempData.push(item.data());
            });
          }
          setUsers(tempData);
        });
    }
  }, [user.data, email]);

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.titleWrapper}>
          <Text style={styles.text}>Message</Text>
        </View>
        <ScrollView>
          <TouchableOpacity>
            <View style={styles.item}>
              {users.map((item, index) => (
                <List.Item
                  key={index}
                  title={item.fullName}
                  onPress={() => {
                    navigation.navigate('Chat', {data: item, id: id});
                  }}
                  left={props => (
                    <Avatar.Image
                      size={60}
                      source={{uri: item.photo}}
                      style={styles.avatar}
                    />
                  )}
                  right={props => (
                    <List.Icon
                      {...props}
                      icon="message-reply-outline"
                      color="#247a84"
                    />
                  )}
                />
              ))}
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf4f6',
    padding: 10,
  },
  container2: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 80,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#247a84',
  },
  avatar: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  item: {
    justifyContent: 'center',
  },
  titleWrapper: {
    borderBottomWidth: 3,
    borderBottomColor: '#247a84',
    paddingBottom: 5,
    alignSelf: 'center',
  },
});
