import React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../reducer/hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setFavouriteLandmark} from '../../reducer/LandmarksReducer';
import { Props } from '../../utilities/types';

export const DetailsScreen = () => {

  const LandmarksState = useAppSelector(state => state.landmarks.markersArray);

  const SelectedLandmark = useAppSelector(
    state => state.landmarks.selectedLandmark.id,
  );

  const landmarkToViewArray = LandmarksState.filter(
    x => x.id === SelectedLandmark,
  );
  const landmarkObjToDisplay = landmarkToViewArray[0];

  const dispatch = useAppDispatch();
  const setFavouriteLandmarkView: Function = (id: number) =>
    dispatch(setFavouriteLandmark(id));

  return (
    <View style={{marginTop: 10}}>
      <Image
        style={{
          width: '90%',
          height: '50%',
          resizeMode: 'cover',
          borderRadius: 10,
          margin: 10,
        }}
        source={{uri: landmarkObjToDisplay.image}}
      />
      {!landmarkObjToDisplay.favourite && (
        <Icon
          name="heart-o"
          size={24}
          color="red"
          style={{position: 'absolute', marginTop: '10%', marginLeft: '75%'}}
        />
      )}
      {landmarkObjToDisplay.favourite && (
        <Icon
          name="heart"
          size={24}
          color="red"
          style={{position: 'absolute', marginTop: '10%', marginLeft: '75%'}}
        />
      )}
      <Text style={{fontSize: 40, fontWeight: 'bold'}}>
        {' '}
        {landmarkObjToDisplay.name}{' '}
      </Text>
      <Text style={{paddingHorizontal: 10, marginVertical: 5}}>
        {landmarkObjToDisplay.description}{' '}
      </Text>
      <Icon.Button
        name="heart-o"
        size={24}
        color="white"
        backgroundColor="green"
        onPress={() => setFavouriteLandmarkView(landmarkObjToDisplay.id)}>
        Add to hearted Landmarks
      </Icon.Button>
    </View>
  );
};
