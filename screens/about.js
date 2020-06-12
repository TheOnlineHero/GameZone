import React from 'react';
import { StyleSheet, View, Text, Linking, Image } from 'react-native';
import { globalStyles, images } from '../styles/global';
import FlatButton from '../shared/button.js';

export default function About() {
  return (
    <View style={globalStyles.container}>
      <Text style={
      	[
	      	globalStyles.paragraph,
	      	globalStyles.titleText,
	      	{
	      		textAlign:'center',
	      		marginBottom: 30
	      	}
      	]
      }>Sample React Native App</Text>
      <View style={{
      	justifyContent: 'center',
    		alignItems: 'center',
    		marginBottom: 30
      }}>
    		<Image source={images.logo} />
			</View>
      
      <Text style={
      	[
	      	globalStyles.paragraph,
	      	{
	      		textAlign:'center'
	      	}
      	]
      }>Developed by Tom Skroza</Text>
      <Text  style={
      	[
	      	globalStyles.paragraph,
	      	{
	      		textAlign:'center'
	      	}
      	]
      }>June 2020</Text>
      <Text  style={
      	[
	      	globalStyles.paragraph,
	      	{
	      		textAlign:'center'
	      	}
      	]
      }>Idea came from Net Ninja</Text>
      <Text style={{
      	marginBottom:30
      }}></Text>
			<FlatButton onPress={() => Linking.openURL("https://youtu.be/ur6I5m2nTvk")} text='Visit Net Ninja' backgroundColor='#f01d71' />
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