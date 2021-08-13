import {RouteProp} from '@react-navigation/core';
import {NavigationProp} from '@react-navigation/core';
import {RootStackParamList} from '../MainNavigator';

type MapScreenNavigationProp = NavigationProp<RootStackParamList, 'MapScreen'>;

type MapScreenRouteProp = RouteProp<RootStackParamList, 'MapScreen'>;

export type Props = {
  navigation: MapScreenNavigationProp;
  route: MapScreenRouteProp;
};
