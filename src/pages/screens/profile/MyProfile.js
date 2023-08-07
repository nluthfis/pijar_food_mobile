/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Card, Button, Avatar, List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {logout} from '../../../../store/reducers/authSlice';
import {reset} from '../../../../store/reducers/userSlice';

const Profile = () => {
  let fullName, photo, phoneNumber;
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(state => state?.auth);
  const user = useSelector(state => state?.user);
  useEffect(() => {
    if (auth?.token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [auth?.token]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    dispatch(logout());
    dispatch(reset());
  };
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ecf5f6" />
      {isLoggedIn ? (
        <View>
          <View style={styles.profileContainer}>
            <Avatar.Image
              size={150}
              icon="account-outline"
              source={
                user && user.data && user.data.photo
                  ? {uri: user.data.photo}
                  : user && user.data && user.data[0] && user.data[0].photo
                  ? {uri: user.data[0].photo}
                  : require('../../../assets/profile.jpg')
              }
              defaultSource={require('../../../assets/profile.jpg')}
              style={styles.avatar}
            />

            <Text style={styles.title}>
              {user && user.data && user.data.fullName
                ? user.data.fullName
                : user && user.data && user.data[0] && user.data[0].fullName
                ? user.data[0].fullName
                : 'No Name'}
            </Text>
            <Button
              style={styles.btnLogout}
              mode="contained"
              labelStyle={styles.btnText}
              onPress={handleLogout}>
              Logout
            </Button>
          </View>

          <Card.Content style={styles.cardContent}>
            <List.Section>
              <TouchableOpacity>
                <List.Accordion
                  title="Edit Profile"
                  titleStyle={{color: '#247a84'}}
                  left={() => (
                    <List.Icon icon="account-edit-outline" color="#247a84" />
                  )}
                  right={() =>
                    expanded ? null : (
                      <List.Icon icon="chevron-down" color="#247a84" />
                    )
                  }
                  expanded={expanded}
                  onPress={handlePress}>
                  <List.Item
                    title="Edit Picture"
                    titleStyle={{color: '#247a84'}}
                    backgroundColor="#eaf4f6"
                    left={() => (
                      <List.Icon
                        icon="account-box-outline"
                        style={{marginLeft: 20}}
                        color="#247a84"
                      />
                    )}
                    right={() => (
                      <List.Icon
                        icon="chevron-right"
                        style={{marginLeft: 20}}
                        color="#247a84"
                      />
                    )}
                    onPress={() => navigation.navigate('EditPicture')}
                  />
                  <List.Item
                    title="Edit Information"
                    titleStyle={{color: '#247a84'}}
                    backgroundColor="#eaf4f6"
                    left={() => (
                      <List.Icon
                        icon="account-cog-outline"
                        style={{marginLeft: 20}}
                        color="#247a84"
                      />
                    )}
                    right={() => (
                      <List.Icon icon="chevron-right" color="#247a84" />
                    )}
                    onPress={() => navigation.navigate('EditInfo')}
                  />
                </List.Accordion>
                <List.Item
                  title="My Recipe"
                  titleStyle={{color: '#247a84'}}
                  left={() => (
                    <List.Icon icon="note-check-outline" color="#247a84" />
                  )}
                  right={() => (
                    <List.Icon icon="chevron-right" color="#247a84" />
                  )}
                  onPress={() => navigation.navigate('MyRecipe')}
                />
                <List.Item
                  title="Liked Recipe"
                  titleStyle={{color: '#247a84'}}
                  left={() => (
                    <List.Icon icon="heart-box-outline" color="#247a84" />
                  )}
                  right={() => (
                    <List.Icon icon="chevron-right" color="#247a84" />
                  )}
                  onPress={() => navigation.navigate('MyLikedRecipes')}
                />
              </TouchableOpacity>
            </List.Section>
          </Card.Content>
        </View>
      ) : (
        <Card>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={150}
              icon="account-outline"
              source={require('../../../assets/tulip.png')}
              style={styles.avatar}
            />
          </View>

          <Card.Content style={styles.cardContent}>
            <Text style={styles.text}>You are not logged in</Text>
            <TouchableOpacity>
              <Button
                style={styles.button}
                mode="contained"
                labelStyle={styles.label}
                onPress={() => navigation.navigate('Login')}>
                <Text style={{color: 'white'}}>Login</Text>
              </Button>
            </TouchableOpacity>
            <Text style={styles.text2}>or</Text>
            <TouchableOpacity>
              <Button
                style={styles.button}
                mode="contained"
                labelStyle={styles.label}
                onPress={() => navigation.navigate('Register')}>
                <Text style={{color: 'white'}}>Register</Text>
              </Button>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf5f6',
    paddingTop: StatusBar.currentHeight + 10,
    padding: 10,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf5f6',
    borderRadius: 15,
    marginBottom: 10,
    elevation: 3,
  },
  avatarContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  avatar: {
    justifyContent: 'center',
    backgroundColor: '#7abec1',
    marginBottom: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    color: 'black',
  },
  btnLogout: {
    position: 'absolute',
    top: 5,
    right: 0,
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
    width: 100,
  },
  btnText: {
    fontSize: 15,
    color: '#247a84',
  },
  card: {
    backgroundColor: 'transparent',
  },
  cardContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3,
  },
  button: {
    backgroundColor: '#7abec1',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
  },
  textcontainer: {
    position: 'absolute',
    top: 180,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
    marginTop: 30,
    marginBottom: 30,
  },
  text2: {
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Profile;
