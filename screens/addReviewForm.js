import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import { reviewSchema } from '../validations/reviewSchema.js';
import FlatButton from '../shared/button.js';
import ReviewForm from '../forms/reviewForm.js';

export default function AddReviewForm({ addReviewRecord }) {

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ title: '', body: '', rating: '' }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          addReviewRecord(values);
        }}
      >
        {props => (
          <View>
            <ReviewForm props={props}/>
            <FlatButton onPress={props.handleSubmit} text='submit' backgroundColor='#f01d71' />
          </View>
        )}
      </Formik>
    </View>
    
  );
}