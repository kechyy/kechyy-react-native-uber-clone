import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const SeperatorComponent = () => {
 return (
  <View style={[tw`bg-gray-500`, {height: 0.5}]} />
 )
}

export default SeperatorComponent

const styles = StyleSheet.create({})
