/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import {
  Card,
  List,
  Avatar,
  Checkbox,
  Button,
  Portal,
  Modal,
  IconButton,
} from 'react-native-paper';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Feather';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import config from '../../../../config';

const Detail = ({route}) => {
  const {itemData} = route.params;
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [liked_by, setLiked_by] = useState([]);
  const user = useSelector(state => state?.user);
  const auth = useSelector(state => state?.auth);
  const [loading, setLoading] = useState(true);

  const likedBy = liked_by[0] ? liked_by[0].liked_by : null;

  useEffect(() => {
    const like = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}getlikes?recipe_id=${itemData.id}`,
          {},
        );
        console.log(response.data);
        if (!response.data.data || response.data.data.length === 0) {
          setLiked(false);
        } else {
          setLiked_by(response.data.data);
          const userId = user.data.id;
          const isUserIdIncluded = response.data.data.some(
            user_id => user_id.user_id === userId,
          );
          setLiked(isUserIdIncluded);
        }
      } catch (error) {
        console.log(error);
        setLiked(false);
      }
    };
    like();
  }, [itemData.id, user.data.id]);

  const handleLikeButtonPress = async () => {
    try {
      if (liked === true) {
        const token = auth.token;
        await axios.delete(
          `${config.API_URL}unlikes?recipe_id=${itemData.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setLiked(false);
      } else {
        const token = auth.token;
        await axios.post(
          `${config.API_URL}likes?recipe_id=${itemData.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [routes] = useState([
    {key: 'first', title: 'Ingredients'},
    {key: 'second', title: 'Video Step'},
    {key: 'third', title: 'Review'},
  ]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <Card>
        <ImageBackground style={styles.bg} source={{uri: itemData.photo}} />
        <View style={styles.overlay} />
        <Text style={styles.title}>{itemData.tittle}</Text>
        <View style={styles.iconBack}>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconButton
                icon="keyboard-backspace"
                iconColor="white"
                size={32}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            <Button
              mode="contained"
              buttonColor={liked ? 'red' : 'white'}
              onPress={() => handleLikeButtonPress()}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="heart"
                size={24}
                style={{padding: 3}}
                color={liked ? 'white' : 'red'}
              />
            </Button>
          </View>
        </View>

        <Card.Content style={styles.cardContent}>
          <TabView
            navigationState={{index, routes}}
            renderScene={SceneMap({
              first: () => <FirstRoute itemData={itemData} />,
              second: () => <SecondRoute itemData={itemData} />,
              third: () => <ThirdRoute itemData={itemData} />,
            })}
            onIndexChange={setIndex}
            initialLayout={{width: Dimensions.get('window').width}}
            style={styles.container}
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={styles.tabIndicator}
                style={styles.tabBar}
                renderLabel={({route, focused, color}) => (
                  <Text style={[styles.tabLabel, {color: 'black'}]}>
                    {route.title}
                  </Text>
                )}
              />
            )}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

const FirstRoute = ({itemData}) => {
  return (
    <View style={[styles.scene]}>
      {itemData &&
        itemData.ingredients &&
        Array.isArray(itemData.ingredients.split(',')) &&
        itemData.ingredients.split(',').map((ingredient, index) => (
          <View style={styles.listItemContainer} key={index}>
            <List.Item
              style={styles.list}
              title={`${index + 1}. ${ingredient.trim()}`}
            />
          </View>
        ))}
    </View>
  );
};

const SecondRoute = ({itemData}) => {
  // Extract the video ID from the videoLink
  const videoId = itemData.videoLink.split('v=')[1];
  return (
    <View style={[styles.scene, {backgroundColor: 'white'}]}>
      <YoutubePlayer
        height={300} // adjust as needed
        play={true}
        videoId={videoId}
      />
    </View>
  );
};

const ThirdRoute = ({itemData}) => {
  const auth = useSelector(state => state?.auth);
  const user = useSelector(state => state?.user);
  const [comments, setComments] = useState([]);
  const id = itemData.id;
  const [selectedScore, setSelectedScore] = useState(null);
  const reviewRef = useRef('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const isFocused = useIsFocused();
  const handleOnChangeRev = text => {
    reviewRef.current = text;
  };
  const handleScoreSelection = score => {
    setSelectedScore(score);
  };
  useEffect(() => {
    if (isFocused) {
      axios
        .get(`${config.API_URL}/comment?recipe_id=${id}`, {})
        .then(response => {
          if (JSON.stringify(response.data.data) !== JSON.stringify(comments)) {
            setComments(response.data.data);
          }
          const commentBy = response.data.data.map(comment =>
            comment.comment_by ? comment.comment_by.toString() : '',
          );
          const isIdIncluded = commentBy.includes(user?.data?.id?.toString());
          if (isIdIncluded !== isComment) {
            setIsComment(isIdIncluded);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [id, isFocused, user?.data?.id, comments, isComment]);

  const submitReview = () => {
    if (!auth.token) {
      setShowLoginModal(true);
      return;
    }
    if (isComment) {
      Alert.alert('You have already commented on this recipe.');
      return;
    }
    const token = auth.token;
    axios
      .post(
        `${config.API_URL}post_comment`,
        {
          recipe_id: id,
          score: selectedScore,
          comment: reviewRef.current,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then(response => {
        setComments([...comments, response?.data?.data]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.scene}>
      <ScrollView>
        <Card>
          <Text style={styles.textReview}>
            What do you think about this recipe?
          </Text>
          <Text style={styles.textReviewItem}>Chose Score:</Text>
          <View style={styles.checkboxContainer}>
            {[1, 2, 3, 4, 5].map(score => (
              <Checkbox.Item
                key={score}
                label={score.toString()}
                style={styles.checkbox}
                status={selectedScore === score ? 'checked' : 'unchecked'}
                onPress={() => handleScoreSelection(score)}
              />
            ))}
          </View>
          <Text style={styles.textReviewItem}>Add a Review:</Text>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={500}
            onChangeText={handleOnChangeRev}
            defaultValue={reviewRef.current}
            style={styles.textInput}
            placeholder="Enter your review here"
          />
          <Button
            mode="elevated"
            style={styles.btnReview}
            onPress={() => submitReview()}>
            <Text style={styles.btnTextReview}>Submit Review</Text>
          </Button>
        </Card>
        <View style={styles.reviewItem}>
          {comments.length === 0 ? (
            <Text>No comments available</Text>
          ) : (
            comments.map((comment, index) => (
              <View
                key={`${comment.id}-${index}`}
                style={styles.commentContainer}>
                {comment?.photo_user && (
                  <Avatar.Image
                    size={60}
                    source={{uri: comment.photo_user}}
                    style={styles.avatar}
                  />
                )}
                <View style={styles.commentContent}>
                  <Text style={styles.name}>{comment.name_user}</Text>
                  <Text style={styles.score}>{comment.score}</Text>
                  <Text style={styles.comment}>{comment.comment}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      <Portal>
        <Modal
          visible={showLoginModal}
          onDismiss={() => setShowLoginModal(false)}
          contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalText}>Please log in to add a review.</Text>
          <Button onPress={() => setShowLoginModal(false)}>Close</Button>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  scene: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 30,
  },
  bg: {
    height: 280,
    resizeMode: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  cardContent: {
    position: 'absolute',
    backgroundColor: 'white',
    height: 525,
    width: '100%',
    marginTop: 240,
    borderRadius: 20,
  },
  tabIndicator: {
    backgroundColor: '#7abec1',
    height: 5,
  },
  tabBar: {
    backgroundColor: 'white',
  },
  list: {
    color: 'black',
    marginLeft: -13,
    marginTop: -30,
  },
  listItemDescription: {
    fontSize: 18,
  },
  listItemContainer: {
    flexDirection: 'column',
  },
  listItemNumber: {
    marginRight: 8,
    fontSize: 16,
  },
  icon: {
    backgroundColor: '#7abec1',
    borderRadius: 8,
  },
  title: {
    position: 'absolute',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 150,
    width: '75%',
  },
  subtitle: {
    position: 'absolute',
    color: 'white',
    fontSize: 15,
    marginLeft: 20,
    marginTop: 210,
  },
  iconBack: {
    position: 'absolute',
    width: '95%',
    top: 30,
    left: 5,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  score: {
    fontSize: 14,
    marginBottom: 5,
  },
  comment: {
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkbox: {
    margin: -5,
  },
  textInput: {
    backgroundColor: '#eaebe8',
    height: 80,
    width: '94%',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
  },
  btnReview: {
    backgroundColor: '#7abec1',
    borderRadius: 10,
    margin: 10,
  },
  btnTextReview: {
    color: 'black',
    fontSize: 14,
  },
  textReview: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    color: 'black',
  },
  textReviewItem: {
    fontSize: 14,
    marginLeft: 10,
    color: 'black',
  },
  reviewItem: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  // btnLike: {
  //   alignSelf: 'center',
  // },
});

export default Detail;
