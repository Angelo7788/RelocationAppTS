import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Alert, Image, FlatList} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

interface regionObj {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface markerObj {
  id: number;
  name: string;
  latlng: {
    latitude: number;
    longitude: number;
  };
  description: string;
  image: string;
}

interface markersFlatList {
  item: markerObj;
}

export const LandmarksMapScreen: React.FC = () => {
  const [region, setRegion] = useState<regionObj>({
    latitude: 51.509865,
    longitude: -0.118092,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState<markerObj[]>([]);

  function onRegionChange(region: regionObj) {
    setRegion(region);
  }

  useEffect(() => {
    fetch('http://localhost:8000/markers')
      .then(response => {
        if (!response.ok) {
          throw Alert.alert('Could not fetch data for that resourse');
        }
        return response.json();
      })
      .then(data => {
        setMarkers(data);
      })
      .catch(err => {
        Alert.alert('Could not fetch data for that resourse');
      });
  }, []);

  const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: '100%',
    },
  });

  const renderItem: React.FC<markersFlatList> = ({item}) => {
    return (
      <View style={{borderWidth: 0}}>
        <Image
          style={{
            width: 220,
            height: 140,
            resizeMode: 'cover',
            borderRadius: 10,
            margin: 5,
          }}
          source={{uri: item.image}}
        />
      </View>
    );
  };
  return (
    <View>
      <View style={{height: '80%', width: '100%'}}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChange={onRegionChange}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.name}
              description={marker.description}
            />
          ))}
        </MapView>
      </View>
      <View>
        <FlatList
          renderItem={renderItem}
          data={markers}
          keyExtractor={item => String(item.id)}
          horizontal={true}
        />
      </View>
    </View>
  );
};
