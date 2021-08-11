import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';


export const LandmarksMapScreen: React.FC = () => {

    const styles = StyleSheet.create({
        map: {
          width: '100%',
          height: '100%',
        },
      });
    return (
    <View style={{height: "100%", width: '100%'}}>
         <MapView
         style={styles.map}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />

     </View>
   )
}