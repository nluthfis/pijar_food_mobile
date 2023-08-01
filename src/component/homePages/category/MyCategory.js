/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Button, Modal, Portal} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const items = [
  {source: require('../../../assets/category1.png'), text: 'Soup'},
  {source: require('../../../assets/category2.png'), text: 'Rice'},
  {source: require('../../../assets/category3.png'), text: 'Salad'},
  {source: require('../../../assets/category4.png'), text: 'Nodle'},
  {source: require('../../../assets/category5.png'), text: 'Drink'},
];

const MyPopular = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text variant="titleMedium" style={styles.title}>
          Category
        </Text>
      </View>
      <View style={styles.iconsContainer}>
        {items.slice(0, 5).map((item, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CategoryRecipes', {category: item.text})
            }
            key={index}>
            <View style={styles.iconsContainer}>
              <View style={styles.iconWrapper}>
                <Image source={item.source} style={styles.icon} />
                <Text style={styles.iconText}>{item.text}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Category')}>
          <Button mode="contained" textColor={'white'} style={styles.button}>
            <Text style={styles.btnText}>Show More Category</Text>
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
  },
  ModalStyle: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
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
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconWrapper: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
  },
  btnText: {
    color: 'white',
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#7abec1',
  },
  iconText: {
    textAlign: 'center',
    marginTop: 5,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: '#7abec1',
    justifyContent: 'center',
  },
  iconsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default MyPopular;
