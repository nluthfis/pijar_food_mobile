/* eslint-disable prettier/prettier */
import React from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import MySearchBar from '../../../component/homePages/search/MySearchBar';
import MyPopular from '../../../component/homePages/category/MyCategory';
import MyNewRecipes from '../../../component/homePages/MyNewRecipes';
import MyPopularCard from '../../../component/homePages/popular/MyPopularCard';

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
