import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';

import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from "../slices/navSlice";
import { useNavigation } from '@react-navigation/native';
import banner2 from '../assets/banner2.jpeg';
import NavFavourites from '../components/NavFavourites';


// rnfes(react native expo functional stylesheet)
const HomeScreen = () => {

 const dispatch = useDispatch();
 const navigation = useNavigation()

 return (
  <SafeAreaView style={tw`bg-white h-full`}>
    
    <View style={[tw`p-5`]}>
      <Image
        style={cssStyles.logoStyle}
        source ={{url: 'https://links.papareact.com/gzs'}}
    /> 

    <GooglePlacesAutocomplete
      styles={{
        container: {
        flex: 0
        },
        textInput: {
        fontSize: 18,
        }
      }}
      onPress={(data, details= null) => {
        dispatch(
          setOrigin( {
            location: details.geometry.location,
            description: data.description
          })
        );
        dispatch(setDestination(null));
        // navigation.navigate('MapScreen')
      }}
      
      fetchDetails={true}
      enablePoweredByContainer={false}
      minLength={2}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: 'en',
      }}
      
      placeholder="Enter pick-up location"
      nearbyPlacesAPI="GooglePlacesSearch"
      debounce={400}

      />

      <NavOptions />
      <NavFavourites />
    </View>
  </SafeAreaView>
 )
}

export default HomeScreen

const cssStyles = StyleSheet.create({
  logoStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

})
