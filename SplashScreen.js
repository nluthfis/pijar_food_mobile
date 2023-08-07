/* eslint-disable prettier/prettier */
import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import {Button, List} from 'react-native-paper';
import PagerView from 'react-native-pager-view';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const image = require('./src/assets/intro.png');

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}>
      {props.children}
    </Animated.View>
  );
};

const SplashScreen = () => {
  const pagerRef = useRef(null);
  const navigation = useNavigation();
  // useEffect(() => {
  //   if (auth.token) {
  //     navigation.navigate('MyTabs');
  //   }
  // }, [auth.token, navigation]);
  // const handleButtonPress = () => {
  //   pagerRef.current.setPage(1);
  // };
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('MyTabs');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <PagerView
      style={styles.pagerView}
      initialPage={0}
      scrollEnabled={false}
      ref={pagerRef}>
      <View key="1">
        <LinearGradient
          colors={['#67b5b8', '#67b5b8']}
          style={styles.container}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={styles.text}>Welcome </Text>
          <Text style={styles.text2}>To Pijar Food App</Text>
          <Text style={styles.text3}>
            Pijar Food is a platform to view and share recipes about food
          </Text>
          <LottieView
            source={require('./src/assets/animation_ljyzjsnb.json')}
            autoPlay
            style={{width: 450, height: 450}}
            loop={true}
            resizeMode="cover"
            onAnimationFinish={() => {
              console.log('animation finished');
            }}
          />

          {/* <Button
            mode="contained"
            style={styles.buttonNext}
            onPress={handleButtonPress}>
            <Text style={styles.textButton2}>Next</Text>
          </Button> */}
        </LinearGradient>
      </View>
      {/* <View key="2">
        <View style={styles.container2}>
          <FadeInView style={styles.fade}>
            <Text style={styles.textKey2}>Getting Started!</Text>
            <Text style={styles.text3}>Choose what you will do now</Text>
            <LottieView
              source={require('./src/assets/animation_ljyzjsnb.json')}
              autoPlay
              style={{width: 450, height: 450}}
              loop={true}
              resizeMode="cover"
              onAnimationFinish={() => {
                console.log('animation finished');
              }}
            />
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.textButton2}>
                Log in to your exiting account.
              </Text>
            </Button>
            <Button
              mode="elevated"
              style={styles.button2}
              onPress={() => navigation.navigate('Register')}>
              <Text style={styles.textButton3}>Dont have an account?</Text>
            </Button>
            <Text
              style={styles.textButton}
              onPress={() => navigation.navigate('MyTabs')}>
              Not Now!
            </Text>
          </FadeInView>
        </View>
      </View> */}
    </PagerView>
  );
};
const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#67b5b8',
    textAlign: 'center',
  },
  fade: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNext: {
    position: 'absolute',
    bottom: 20,
    right: 15,
    width: '30%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
    margin: 0,
    padding: 0,
    left: 0,
    right: 0,
  },
  text: {
    color: 'black',
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 30,
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  textKey2: {
    color: 'black',
    fontSize: 42,
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  text2: {
    color: 'black',
    fontSize: 24,
    width: '60%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text3: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    width: '60%',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 3},
    textShadowRadius: 10,
  },
  textButton: {
    position: 'absolute',
    fontSize: 18,
    color: 'black',
    top: 690,
    height: 35,
    justifyContent: 'center',
    textDecorationLine: 'underline',
  },
  button: {
    position: 'absolute',
    top: 550,
    width: '80%',
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 2,
  },
  button2: {
    position: 'absolute',
    top: 620,
    width: '80%',
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textButton2: {
    fontSize: 18,
    color: 'black',
    justifyContent: 'center',
  },
  textButton3: {
    fontSize: 18,
    color: 'black',
    justifyContent: 'center',
  },
});
export default SplashScreen;
