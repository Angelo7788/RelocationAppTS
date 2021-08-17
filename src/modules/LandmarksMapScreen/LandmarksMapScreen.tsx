import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {CustomMarkerView} from '../LandmarksMapScreen/CustomMarkerView';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  regionObj,
  markerObj,
  markersFlatList,
} from '../../utilities/interfaces';
import {Props} from '../../utilities/types';
import {useAppDispatch, useAppSelector} from '../../reducer/hooks';
import {
  loadLandmarksState,
  setSelectedMarker,
  setSelectedLandmark,
} from '../../reducer/LandmarksReducer';
import { styles } from './styles/LandmarksMapScreenStyles';

export const LandmarksMapScreen = ({navigation}: Props) => {
  const LandmarksState = useAppSelector(state => state.landmarks.markersArray);

  const dispatch = useAppDispatch();
  const loadMarkersArray: Function = (init: markerObj) =>
    dispatch(loadLandmarksState(init));

  const setSelectedMarkerView: Function = (id: number) =>
    dispatch(setSelectedMarker(id));

  const setSelectedLandmarkToView: Function = (id: number) =>
    dispatch(setSelectedLandmark(id));

  const [region, setRegion] = useState<regionObj>({
    latitude: 51.509865,
    longitude: -0.118092,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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
        loadMarkersArray(data);
      })
      .catch(err => {
        Alert.alert('Could not fetch data for that resourse');
      });
  }, []);

  // FlatList  scroll to item // center the view to do????
  const [refFlatList, setRefFlatList] = useState<any>();

  const getItemLayout = (_data: any, index : number) => {
      return {length: 220, offset: 220 * index, index}
  }

  const onScrollToItemSelected: Function = (index: number) => {
    refFlatList.scrollToIndex({animated: true, index: index});
  }

  // *** //

  const renderItem: React.FC<markersFlatList> = ({item}) => {
    const id = item.id
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setSelectedLandmarkToView(item.id);
            navigation.navigate('DetailScreen');
          }}>
          <Image
            style={styles.image }
            source={{uri: item.image}}
          />
          {!item.favourite && (
            <Icon
              name="heart-o"
              size={18}
              color="red"
              style={{position: 'absolute', marginTop: 10, marginLeft: 10}}
            />
          )}
          {item.favourite && (
            <Icon
              name="heart"
              size={18}
              color="red"
              style={{position: 'absolute', marginTop: 10, marginLeft: 10}}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <View style={{height: '78%', width: '100%'}}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChange={onRegionChange}>
          {LandmarksState.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.name}
              onSelect={() => {
                setSelectedMarkerView(marker.id);
                onScrollToItemSelected(index);
              }}>
              <CustomMarkerView
                interestedPlace={marker.favourite}
                selectedMarker={marker.selectedMarker}
              />
            </Marker>
          ))}
        </MapView>
      </View>
      <View>
        <FlatList
          renderItem={renderItem}
          data={LandmarksState}
          keyExtractor={item => String(item.id)}
          horizontal={true}
          getItemLayout={getItemLayout}
          ref={(ref) => setRefFlatList(ref)}

        />
      </View>
    </View>
  );
};
