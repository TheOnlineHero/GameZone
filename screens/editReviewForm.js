import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import { reviewSchema } from '../validations/reviewSchema.js';
import FlatButton from '../shared/button.js';
import ReviewForm from '../forms/reviewForm.js';

export default function EditReviewForm({ editReviewRecord, deleteReviewRecordConfirm, editReview }) {

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ key: editReview.key, title: editReview.title, body: editReview.body, rating: editReview.rating.toString() }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          editReviewRecord(values);
        }}
      >
        {props => (
          <View>
            <ReviewForm props={props}/>
            <FlatButton onPress={props.handleSubmit} text='submit' backgroundColor='#f01d71' />
          </View>
        )}
      </Formik>

      <View
        style={styles.delete}
        >
        <FlatButton onPress={() => deleteReviewRecordConfirm(editReview.key)} text='Delete' backgroundColor='#ff0000' />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  delete: {
    marginTop:40
  }
});