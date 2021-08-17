// import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailsScreen} from './modules/DetailsScreen/DetailsScreen';
import {LandmarksMapScreen} from './modules/LandmarksMapScreen';

export type RootStackParamList = {
  // type check route name and param
  MapScreen: undefined;
  DetailScreen: undefined;
};

const HomeStack = createNativeStackNavigator<RootStackParamList>();

export default function Nav() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator 
        initialRouteName="MapScreen"
        >
        <HomeStack.Screen 
          name="MapScreen" 
          component={LandmarksMapScreen}
          options={{ title: "Landmarks Map"}} />
        <HomeStack.Screen 
          name="DetailScreen" 
          component={DetailsScreen}
          />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}
