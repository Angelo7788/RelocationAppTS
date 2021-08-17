import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {CustomMarkerView} from './CustomMarkerView';
import api from '../../data/api';
import {
  RegionObj,
  MarkerObj,
  MarkersFlatList,
} from '../../utilities/interfaces';
import {useAppDispatch, useAppSelector} from '../../reducer/hooks';
import {
  loadLandmarksState,
  setSelectedMarker,
  setSelectedLandmark,
} from '../../reducer/LandmarksReducer';
import {styles} from './styles/LandmarksMapScreenStyles';
import Styled from 'styled-components/native';
import {NavigationProp, RouteProp} from '@react-navigation/core';
import {RootStackParamList} from '../../MainNavigator';

const MapWrapper = Styled.View`
  height: 78%;
  width: 100%;
`;

type MapScreenNavigationProp = NavigationProp<RootStackParamList, 'MapScreen'>;

type MapScreenRouteProp = RouteProp<RootStackParamList, 'MapScreen'>;

export type LandmarksMapScreenProps = {
  navigation: MapScreenNavigationProp;
  route: MapScreenRouteProp;
};

export const LandmarksMapScreen = ({navigation}: LandmarksMapScreenProps) => {
  const LandmarksState = useAppSelector(state => state.landmarks.markersArray);

  const dispatch = useAppDispatch();
  const loadMarkersArray: Function = useCallback(
    (init: MarkerObj) => dispatch(loadLandmarksState(init)),
    [dispatch],
  );

  const setSelectedMarkerView: Function = (id: number) =>
    dispatch(setSelectedMarker(id));

  const setSelectedLandmarkToView: Function = (id: number) =>
    dispatch(setSelectedLandmark(id));

  const [region, setRegion] = useState<RegionObj>({
    latitude: 51.509865,
    longitude: -0.118092,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onRegionChange = (_region: RegionObj) => {
    setRegion(_region);
  };

  useEffect(() => {
    const getLandmarks = async () => {
      const landmarks = await api.getLandmarks();
      loadMarkersArray(landmarks);
    };
    getLandmarks();
  }, [loadMarkersArray]);

  // FlatList  scroll to item // center the view to do????
  const [refFlatList, setRefFlatList] = useState<any>();

  const getItemLayout = (_data: any, index: number) => {
    return {length: 220, offset: 220 * index, index};
  };

  const onScrollToItemSelected: Function = (index: number) => {
    refFlatList.scrollToIndex({animated: true, index: index});
  };

  // *** //

  const renderItem: React.FC<MarkersFlatList> = ({item}) => {
    const id = item.id;
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setSelectedLandmarkToView(item.id);
            navigation.navigate('DetailScreen', {landmark: item});
          }}>
          <Image style={styles.image} source={{uri: item.image}} />
          {!item.favourite && (
            <Icon name="heart-o" size={18} color="red" style={styles.icon} />
          )}
          {item.favourite && (
            <Icon name="heart" size={18} color="red" style={styles.icon} />
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <MapWrapper>
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
      </MapWrapper>
      <View>
        <FlatList
          renderItem={renderItem}
          data={LandmarksState}
          keyExtractor={item => String(item.id)}
          horizontal={true}
          getItemLayout={getItemLayout}
          ref={ref => setRefFlatList(ref)}
        />
      </View>
    </>
  );
};
