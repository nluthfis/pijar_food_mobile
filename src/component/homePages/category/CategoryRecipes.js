/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import config from '../../../../config';
import {useNavigation} from '@react-navigation/native';

export default function CategoryRecipes({route}) {
  const navigation = useNavigation();
  const {category} = route.params;
  const Category = category.toLowerCase();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}recipes?category=${Category}`,
        );
        setRecipes(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
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
}

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
