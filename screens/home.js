import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Modal,
  TouchableWithoutFeedback, 
  Keyboard, 
  Image, 
  Alert 
} from 'react-native';
import { globalStyles, images } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../shared/card';
import AddReviewForm from './addReviewForm';
import EditReviewForm from './editReviewForm';
import { openDatabase } from "expo-sqlite";
import {Dimensions } from "react-native";


export default function Home({ navigation }) {

const [loaded, setLoaded] = useState(false);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [editReview, setEditReview] = useState({});
  const screenWidth = Math.round(Dimensions.get('window').width);

  const db = openDatabase("db");

  const addDataToDb = () => {
    if (!loaded) {
      db.transaction(tx => {
        tx.executeSql(
          "create table if not exists GameReviews  (key  integer primary key AUTOINCREMENT, title text, body text, rating int);",
          []
        );
        tx.executeSql(
          "select * from GameReviews",
          [],
          (_, { rows: { _array } }) => setReviews(_array),
          () => console.log("error fetching")
        );
      });
      setLoaded(true);
    }
  };

  const insertDb = ({review}) => {
    db.transaction(tx => {
      tx.executeSql(
        "insert into GameReviews (title, body, rating) values (?, ?, ?)",
        [review.title,review.body,review.rating],
  	    (tx,results) => {
  		    review.key=results.insertId;
          setReviews((currentReviews) => {
            return [review, ...currentReviews];
          });
          setNewModalOpen(false);
  	    }
      );
    });
  };

  addDataToDb();

  const addReviewRecord = (review) => {
    insertDb({review});	  
  };

  const editReviewRecord = (review) => {

    setReviews((prevReviews) => {
      let r = prevReviews.find(row => row.key == review.key);
      r.title = review.title;
      r.body = review.body;
      r.rating = review.rating;
      return [
        ...prevReviews
      ]
    });  

    db.transaction(tx => {
      tx.executeSql(
        "UPDATE GameReviews SET title=?, body=?, rating=? WHERE key = ?",
        [review.title, review.body, review.rating, review.key]
      );
    });

    setEditModalOpen(false);
  }

  const deleteReviewRecord = (key) => {
    setReviews((prevReviews) => {
      return prevReviews.filter(row => row.key != key)
    });
    db.transaction(tx => {
      tx.executeSql(
        "DELETE FROM GameReviews WHERE key = ?",
        [key]
      );
    });
    setEditModalOpen(false);
  };

  const deleteReviewRecordConfirm = (key) => {
    Alert.alert('Delete Review', 'Do you wish to delete this review', [
      {
        text: 'Ok',
        onPress: () => deleteReviewRecord(key)
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Delete')
      },
    ]);
  };

  const editThisReview = (review) => {
    setEditReview(review);
    setEditModalOpen(true);
  };

  return (
    <View style={globalStyles.container}>
  
      <Modal visible={newModalOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setNewModalOpen(false)} 
            />
            <AddReviewForm addReviewRecord={addReviewRecord} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={editModalOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setEditModalOpen(false)} 
            />
            <EditReviewForm editReviewRecord={editReviewRecord} editReview={editReview} deleteReviewRecordConfirm={deleteReviewRecordConfirm} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons 
        name='add' 
        size={24} 
        style={styles.modalToggle}
        onPress={() => setNewModalOpen(true)} 
      />

      <FlatList data={reviews} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => editThisReview(item)}>
          <Card>  
            <View style={{flexDirection: "row", width:'100%',flex:1}}>
              <Text style={[globalStyles.titleText, {width: (screenWidth-170)}]}>
                { item.title }
              </Text>
              <View  style={{width: 170}}>
              <Image source={images.ratings[item.rating]} />
              </View>
            </View>
            
          </Card>
        </TouchableOpacity>
      )} />

    </View>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  }
});
