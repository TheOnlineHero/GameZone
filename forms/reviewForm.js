import React from 'react';
import { globalStyles } from '../styles/global.js';
import { Text, TextInput, View } from 'react-native';

export default function ReviewForm({ props }) {
  return (
    <View>
      <TextInput
        style={globalStyles.input}
        placeholder='Review title'
        onChangeText={props.handleChange('title')}
        onBlur={props.handleBlur('title')} 
        value={props.values.title}
      />
      <Text style={globalStyles.errorText}>{props.touched.title && props.errors.title}</Text>
      <TextInput
        style={globalStyles.input}
        multiline minHeight={60}
        placeholder='Review details'
        onChangeText={props.handleChange('body')}
        onBlur={props.handleBlur('body')}
        value={props.values.body}
      />
      <Text style={globalStyles.errorText}>{props.touched.body && props.errors.body}</Text>
      <TextInput 
        style={globalStyles.input}
        placeholder='Rating (1 - 5)'
        onChangeText={props.handleChange('rating')}
        onBlur={props.handleBlur('rating')} 
        value={props.values.rating}
        keyboardType='numeric'
      />
      <Text style={globalStyles.errorText}>{props.touched.rating && props.errors.rating}</Text>
    </View>
  );
}