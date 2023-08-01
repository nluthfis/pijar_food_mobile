/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const items = [
  {source: require('../../../assets/category1.png'), text: 'Soup'},
  {source: require('../../../assets/category2.png'), text: 'Rice'},
  {source: require('../../../assets/category3.png'), text: 'Salad'},
  {source: require('../../../assets/category4.png'), text: 'Nodle'},
  {source: require('../../../assets/category5.png'), text: 'Drink'},
  {source: require('../../../assets/category6.png'), text: 'Pizza'},
  {source: require('../../../assets/category7.png'), text: 'Burger'},
  {source: require('../../../assets/category8.png'), text: 'CupCake'},
  {source: require('../../../assets/category9.png'), text: 'Sandwich'},
  {source: require('../../../assets/category10.png'), text: 'Taco'},
  {source: require('../../../assets/category11.png'), text: 'Dumpling'},
  {source: require('../../../assets/category12.png'), text: 'Nugget'},
  {source: require('../../../assets/category13.png'), text: 'Porridge'},
  {source: require('../../../assets/category14.png'), text: 'Seafood'},
  {source: require('../../../assets/category15.png'), text: 'Sushi'},
];

export default function Category() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        {items.map((item, index) => (
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  iconWrapper: {
    width: Dimensions.get('window').width / 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  iconText: {
    fontSize: 12,
    marginTop: 5,
    color: 'black',
  },
});
