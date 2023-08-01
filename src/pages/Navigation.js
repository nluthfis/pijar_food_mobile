/* eslint-disable prettier/prettier */
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MyAdd from '../component/screens/add/MyAdd';
import MyHome from '../component/screens/home/MyHome';
import MyProfile from '../component/screens/profile/MyProfile';
import MorePopular from '../component/screens/home/MorePopular';
import Register from '../component/screens/auth/Register';
import Login from '../component/screens/auth/Login';
import Detail from '../component/screens/home/Details';
import SearchPages from '../component/homePages/search/SearchPages';
import MyMessages from '../component/screens/messages/MyMessages';
import Chat from '../component/screens/messages/Chat';
import SplashScreen from '../../SplashScreen';
import EditPicture from '../component/screens/profile/EditPicture';
import EditInfo from '../component/screens/profile/EditInfo';
import MyRecipe from '../component/screens/profile/MyRecipe';
import MyLikedRecipes from '../component/screens/profile/MyLikedRecipes';
import Category from '../component/homePages/category/Category';
import CategoryRecipes from '../component/homePages/category/CategoryRecipes';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabArr = [
  {route: 'MyHome', label: 'Home', icon: 'home', component: MyHome},
  {route: 'MyAdd', label: 'Add New', icon: 'plus-square', component: MyAdd},
  {
    route: 'MyComment',
    label: 'Message',
    icon: 'message-square',
    component: MyMessages,
  },
  {route: 'MyProfile', label: 'Account', icon: 'user', component: MyProfile},
];

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
      textViewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
    } else {
      viewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
      textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, {flex: focused ? 1 : 0.65}]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: '#298994', borderRadius: 15, marginRight: 10},
          ]}
        />
        <View style={[styles.btn, {backgroundColor: focused ? null : 'white'}]}>
          <Icon
            name={item.icon}
            color={focused ? 'white' : '#298994'}
            size={24}
          />
          <Animatable.View ref={textViewRef}>
            {focused && (
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  paddingHorizontal: 10,
                }}>
                {item.label}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          position: 'absolute',
          bottom: 10,
          right: 10,
          left: 10,
          borderRadius: 15,
        },
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          options={{
            title: 'Search Result',
            headerStyle: {
              backgroundColor: '#eaf4f6',
            },
          }}
          name="SearchPages"
          component={SearchPages}
        />
        <Stack.Screen
          name="MorePopular"
          component={MorePopular}
          options={{
            title: 'Popular Recipes',
            headerStyle: {
              backgroundColor: '#eaf4f6',
            },
          }}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={MyHome}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Details"
          component={Detail}
        />
        <Stack.Screen
          options={{
            title: 'Chat',
            headerStyle: {
              backgroundColor: '#eaf4f6',
            },
          }}
          name="Chat"
          component={Chat}
        />
        <Stack.Screen
          options={{
            title: 'Edit Picture',
            headerStyle: {
              backgroundColor: '#eaf4f6',
            },
          }}
          name="EditPicture"
          component={EditPicture}
        />
        <Stack.Screen
          options={{
            title: 'Edit Information',
            headerStyle: {
              backgroundColor: '#eaf4f6',
            },
          }}
          name="EditInfo"
          component={EditInfo}
        />
        <Stack.Screen
          options={{
            title: 'My Recipe',
            headerStyle: {
              backgroundColor: '#eaf4f6',
            },
          }}
          name="MyRecipe"
          component={MyRecipe}
        />
        <Stack.Screen
          options={{
            title: 'My Liked Recipes',
            headerStyle: {
              backgroundColor: '#eaf4f6',
            },
          }}
          name="MyLikedRecipes"
          component={MyLikedRecipes}
        />
        <Stack.Screen
          options={{
            title: 'Category',
            headerStyle: {
              backgroundColor: '#eaf4f6',
            },
          }}
          name="Category"
          component={Category}
        />
        <Stack.Screen
          options={{
            title: 'Recipes By Category',
            headerStyle: {
              backgroundColor: '#eaf4f6',
            },
          }}
          name="CategoryRecipes"
          component={CategoryRecipes}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafbfa',
    borderRadius: 15,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 15,
  },
});
