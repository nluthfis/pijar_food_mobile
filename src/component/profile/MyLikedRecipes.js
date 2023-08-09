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
import config from '../../../config';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';

export default function MyLikedRecipes() {
  const navigation = useNavigation();
  const auth = useSelector(state => state?.auth);
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = recipes ? Math.ceil(recipes.length / itemsPerPage) : 0;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = recipes
    ? Math.min(startIndex + itemsPerPage, recipes.length)
    : 0;

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
    <View style={styles.container}>
      {recipes.length === 0 ? (
        <Text style={styles.emptyText}>No recipes liked</Text>
      ) : (
        <ScrollView>
          {recipes.slice(startIndex, endIndex).map((item, key) => (
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
          <View style={styles.paginationContainer}>
            {currentPage > 1 && (
              <Button
                style={styles.btnPagination}
                buttonColor="black"
                textColor="black"
                onPress={handlePrevPage}>
                Prev
              </Button>
            )}
            {currentPage > 2 && (
              <Button
                onPress={() => setCurrentPage(currentPage - 1)}
                buttonColor="black"
                textColor="black"
                style={styles.btnPagination}>
                {currentPage - 1}
              </Button>
            )}
            <Button
              onPress={() => setCurrentPage(currentPage)}
              textColor="black"
              style={styles.btnPagination}
              disabled>
              {currentPage}
            </Button>
            {currentPage < totalPages && (
              <Button
                onPress={() => setCurrentPage(currentPage + 1)}
                textColor="black"
                style={styles.btnPagination}>
                {currentPage + 1}
              </Button>
            )}
            {currentPage < totalPages - 1 && (
              <Button
                style={styles.btnPagination}
                buttonColor="white"
                textColor="black"
                onPress={handleNextPage}>
                Next
              </Button>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    textTransform: 'capitalize',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    fontSize: 20,
  },
  btnPagination: {
    backgroundColor: '#eaf4f6',
    borderRadius: 10,
    margin: 5,
    width: 50,
    height: '50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});
