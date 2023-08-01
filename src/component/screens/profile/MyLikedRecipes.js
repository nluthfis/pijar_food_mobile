/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import config from '../../../../config';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';

export default function MyLikedRecipes() {
  const navigation = useNavigation();
  const auth = useSelector(state => state?.auth);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${config.API_URL}liked/recipes`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        })
        .then(response => {
          const jsonData = response.data.data;
          setRecipes(jsonData);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }, [auth?.token]);
  return (
    <View>
      <ScrollView>
        {recipes.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={styles.card}
            onPress={() => navigation.navigate('Details', {itemData: item})}>
            <Card>
              <Card.Content style={styles.cardContent}>
                <Image source={{uri: item.photo}} style={styles.image} />
                <View>
                  <Title style={styles.text}>{item.tittle}</Title>
                  <Paragraph style={styles.text}>{item.category}</Paragraph>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignContent: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf4f6',
    borderRadius: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  text: {
    color: 'black',
    marginLeft: 10,
  },
});
