import { useNavigation } from '@react-navigation/native'
import React, {useState} from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames';
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
]

const RideOptionCard = () => { 

 const navigation = useNavigation();
 const [selectedItem, setSelectedItem] = useState(null);
 const travelTimeInformation = useSelector(selectTravelTimeInformation);

// If we have SUGE pricing. this goes up.
const SURGE_CHARGE_RATE = 1.5;

 return (
  <SafeAreaView style={tw`bg-white flex-grow`}>
    <View style={tw`flex-row`}>
      <TouchableOpacity 
        onPress={() => navigation.navigate("NavigateCard")}
        style={[tw`py-6 pl-4 rounded-full`]}
      >
        <Icon name="chevron-left" type="fontawesome" />
      </TouchableOpacity>
      <Text style={tw`text-center py-5 text-xl flex-1`}>
        Select a Ride - {travelTimeInformation?.distance.text}
       </Text>
    </View>
    <FlatList 
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item: { id, title, multiplier, image }, item}) => (
         <TouchableOpacity 
            style={tw`flex-row justify-between items-center px-10
            ${id === selectedItem?.id && "bg-gray-200"}
           `}
           onPress={() => setSelectedItem(item)}
          >
           <Image 
             style={{
               width: 100,
               height: 100,
               resizeMode: "contain",
             }}
             source={{ url: image }}
           />
           <View style={tw`-ml-6`}>
            <Text style={tw`text-xl font-semibold`}>{title}</Text>
            <Text>{travelTimeInformation?.duration.text} Travel time...</Text>
           </View>
           <Text style={tw`text-xl`}>
              {
                new Intl.NumberFormat("en-gb", {
                  style: "currency",
                  currency: 'GBP'
                }).format(
                    (travelTimeInformation?.duration.value * 
                     SURGE_CHARGE_RATE * multiplier) / 100

                )}
           </Text>
         </TouchableOpacity>

      )}
    />
    <View style={tw`mt-auto border-t-gray-200`}>
      <TouchableOpacity 
        disabled={!selectedItem} 
        style={tw`bg-black py-3 m-3 ${!selectedItem && "bg-gray-300"}`}>
         <Text style={tw`text-center text-white text-xl`}>
          Choose {selectedItem?.title}
         </Text>
      </TouchableOpacity>     
    </View>
  </SafeAreaView>
 )
}

export default RideOptionCard

const styles = StyleSheet.create({})
