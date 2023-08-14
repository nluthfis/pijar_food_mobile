/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Text, Card, Title, Paragraph, Button} from 'react-native-paper';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import config from '../../../../config';
import {Rating} from 'react-native-ratings';

const MyPopularCard = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      axios
        .get(`${config.API_URL}recipes?popular=popular`)
        .then(response => {
          const jsonData = response.data.data;
          setRecipes(jsonData);
        })
        .catch(error => {
          console.error(error);
          if (error.response && error.response.status === 503) {
            alert(
              'The server is currently unavailable. Please try again later.',
            );
          } else {
            console.error(error);
          }
        });
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text variant="titleMedium" style={styles.title}>
          Popular Recipes
        </Text>
      </View>
      <View>
        <ScrollView>
          {recipes.slice(0, 3).map((item, key) => (
            <TouchableOpacity
              key={key}
              style={styles.card}
              onPress={() => navigation.navigate('Details', {itemData: item})}>
              <Card>
                <Card.Content style={styles.cardContent}>
                  <Image source={{uri: item.photo}} style={styles.image} />
                  <View>
                    <Title style={styles.text}>{item.tittle}</Title>
                    <Paragraph
                      style={[
                        styles.text,
                        // {display: 'flex', justifyContent: 'center'},
                      ]}>
                      {/* {item.average_score
                        ? parseFloat(item.average_score).toFixed(1)
                        : ''} */}
                      <Rating
                        type="custom"
                        ratingColor="#FFD700"
                        ratingBackgroundColor="gray"
                        ratingCount={5}
                        imageSize={20}
                        startingValue={item.average_score || 0}
                        tintColor="#eaf4f6"
                      />
                    </Paragraph>
                    <Paragraph style={styles.text}>{item.category}</Paragraph>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('MorePopular')}>
          <Button mode="contained" textColor={'white'} style={styles.button}>
            Show More Popular Recipes
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 100,
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
  card: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignContent: 'center',
  },
  text: {
    color: 'black',
    marginLeft: 10,
    textTransform: 'capitalize',
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
  button: {
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#7abec1',
    height: 50,
    justifyContent: 'center',
  },
});

export default MyPopularCard;
