/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Searchbar} from 'react-native-paper';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MySearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const onChangeSearch = query => setSearchQuery(query);

  const onSubmitSearch = () => {
    navigation.navigate('SearchPages', {searchQuery});
  };
  return (
    <View>
      <StatusBar backgroundColor="#ecf5f6" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <Searchbar
            placeholder="Search Pasta, Bread, etc"
            placeholderTextColor={'white'}
            value={searchQuery}
            style={styles.searchbar}
            iconColor={'white'}
            inputStyle={styles.input}
            onChangeText={onChangeSearch}
            onSubmitEditing={onSubmitSearch}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 15,
    marginTop: StatusBar.currentHeight,
    elevation: 3,
  },
  searchBarContainer: {
    margin: 10,
    borderRadius: 15,
    height: 60,
    justifyContent: 'center',
  },
  searchbar: {
    borderRadius: 15,
    backgroundColor: '#7abec1',
  },
  input: {
    color: 'white',
  },
});

export default MySearchBar;
