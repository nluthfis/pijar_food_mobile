/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-paper';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import config from '../../../config';

const MyNewRecipes = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      axios
        .get(`${config.API_URL}recipes?sortType=desc`)
        .then(response => {
          const jsonData = response.data.data;
          setRecipes(jsonData);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text variant="titleMedium" style={styles.title}>
          New Recipes
        </Text>
      </View>
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recipes.slice(0, 5).map((item, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => navigation.navigate('Details', {itemData: item})}>
              <View style={styles.imageContainer}>
                <Image source={{uri: item.photo}} style={styles.image} />
                <View style={styles.overlay} />
                <Text style={styles.textOverlay}>{item.tittle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    elevation: 5,
  },
  titleWrapper: {
    borderBottomWidth: 3,
    borderBottomColor: '#7abec1',
    paddingBottom: 5,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  imageContainer: {
    marginRight: 8,
    position: 'relative',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#a3ffff',
    opacity: 0.1,
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 15,
    margin: 0,
    resizeMode: 'cover',
  },
  textOverlay: {
    bottom: 30,
    position: 'absolute',
    left: 10,
    color: 'white',
    fontSize: 20,
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
    width: 130,
  },
});

export default MyNewRecipes;
