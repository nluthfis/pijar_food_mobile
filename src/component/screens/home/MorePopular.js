/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import axios from 'axios';
import config from '../../../../config';
import {useNavigation} from '@react-navigation/native';

const MorePopular = () => {
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    axios
      .get(`${config.API_URL}recipes?popular=popular`)
      .then(response => {
        const jsonData = response.data.data;
        setRecipes(jsonData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <View style={styles.recipeContainer}>
      <View style={styles.container}>
        {recipes && recipes?.length === 0 ? (
          <View>
            <Text style={styles.emptyText}>recipe search not found</Text>
          </View>
        ) : (
          <ScrollView>
            {recipes &&
              recipes.map((item, key) => (
                <TouchableOpacity
                  key={key}
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate('Details', {itemData: item})
                  }>
                  <Card>
                    <Card.Content style={styles.cardContent}>
                      <Image source={{uri: item.photo}} style={styles.image} />
                      <View>
                        <Title style={styles.text}>{item.tittle}</Title>
                        <Paragraph style={styles.text}>
                          {item.category}
                        </Paragraph>
                      </View>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf5f6',
    marginTop: -20,
  },
  recipeContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 30,
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
    marginRight: 5,
    borderRadius: 10,
  },
  text: {
    color: 'black',
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  emptyText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  totalRecipe: {
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
    marginTop: 0,
    marginLeft: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    fontSize: 20,
  },
  btnPagination: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
    width: 50,
    height: '50',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MorePopular;
