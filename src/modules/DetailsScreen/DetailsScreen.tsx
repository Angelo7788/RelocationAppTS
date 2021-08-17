import React, {useState} from 'react';
import {useAppDispatch} from '../../reducer/hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setFavouriteLandmark} from '../../reducer/LandmarksReducer';
import {RouteProp} from '@react-navigation/core';
import {RootStackParamList} from '../../MainNavigator';
import {MarkerObj} from '../../utilities/interfaces';
import {
  MainContainer,
  Description,
  TitleLabel,
  HeartMarker,
  MarkerImage,
} from './styles/DetailsScreenStyles';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'MapScreen'>;

export type DetailsScreenProps = {
  route: DetailsScreenRouteProp;
};

export const DetailsScreen: React.FC<DetailsScreenProps> = ({route}) => {
  const {landmark: landmarkObjToDisplay}: {landmark: MarkerObj} =
    route!.params!;

  const [loved, setLoved] = useState(landmarkObjToDisplay.favourite);

  const dispatch = useAppDispatch();
  const setFavouriteLandmarkView: Function = (id: number) =>
    dispatch(setFavouriteLandmark(id));

  const onLoved = () => {
    setLoved(previousLoved => !previousLoved);
    setFavouriteLandmarkView(landmarkObjToDisplay.id);
  };
  return (
    <MainContainer>
      <MarkerImage source={{uri: landmarkObjToDisplay.image}} />
      {!loved && (
        <HeartMarker onPress={onLoved}>
          <Icon name="heart-o" size={24} color="red" />
        </HeartMarker>
      )}
      {loved && (
        <HeartMarker onPress={onLoved}>
          <Icon name="heart" size={24} color="red" />
        </HeartMarker>
      )}
      <TitleLabel> {landmarkObjToDisplay.name}</TitleLabel>
      <Description>{landmarkObjToDisplay.description} </Description>
    </MainContainer>
  );
};
