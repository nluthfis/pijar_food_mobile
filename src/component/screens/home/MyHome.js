/* eslint-disable prettier/prettier */
import React from 'react';
import {View, ScrollView, StyleSheet, Dimensions, Text} from 'react-native';
import MySearchBar from '../../homePages/search/MySearchBar';
import MyPopular from '../../homePages/category/MyCategory';
import MyNewRecipes from '../../homePages/MyNewRecipes';
import MyPopularCard from '../../homePages/MyPopularCard';

const screenHeight = Dimensions.get('window').height;
export default function MyHome() {
  return (
    <View style={[styles.container, {height: screenHeight}]}>
      <ScrollView>
        <MySearchBar />
        <MyPopular />
        <MyNewRecipes />
        <MyPopularCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf5f6',
    height: screenHeight,
    padding: 10,
  },
});
