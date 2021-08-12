import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {markersView} from '../../utilities/interfaces';

export const CustomMarkerView: React.FC<markersView> = ({
  interestedPlace,
  selectedMarker,
}) => {

  return (
    <View style={{width: 30, height: 50}}>
      {!selectedMarker && <Icon name="map-marker" size={50} color="grey" />}
      {selectedMarker && <Icon name="map-marker" size={50} color="blue" />}

      {!interestedPlace && (
        <Icon
          name="heart-o"
          size={18}
          color="red"
          style={{position: 'absolute'}}
        />
      )}
      {interestedPlace && (
        <Icon
          name="heart"
          size={18}
          color="red"
          style={{position: 'absolute'}}
        />
      )}
    </View>
  );
};
