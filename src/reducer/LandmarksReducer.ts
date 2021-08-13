import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {markerObj} from '../utilities/interfaces';
import type {RootState} from './store';
import { LandmarkMarkers, SelectedLandmark } from '../utilities/interfaces';

const initialState: LandmarkMarkers = {
  selectedLandmark: {id: 1},
  markersArray: [],
  heartedList: [],
};

export const landMarksSlice = createSlice({
  name: 'landmarks',
  initialState,

  reducers: {
    loadLandmarksState: (state, action: PayloadAction<markerObj>) => {
      let load: markerObj[] = [];
      load = action.payload;
      load.forEach(element => {
        element.favourite = false;
        element.selectedMarker = false;
      });
      state.markersArray = load;
    },
    setSelectedMarker: (state, action: PayloadAction<number>) => {
      let arrayToModify: markerObj[] = [...state.markersArray];
      arrayToModify.forEach(x => {
        x.id === action.payload
          ? (x.selectedMarker = true)
          : (x.selectedMarker = false);
      });
      state.markersArray = arrayToModify;
    },
    setFavouriteLandmark: (state, action: PayloadAction<number>) => {
      let arrayToModify: markerObj[] = [...state.markersArray];
      let newHeartedList: markerObj[] = [];
      arrayToModify.forEach(x => {
          if (x.id === action.payload) {x.favourite = !x.favourite}
          if (x.favourite === true) {newHeartedList.push(x)}
          else { x.favourite = x.favourite}
      });
      state.markersArray = arrayToModify;
      state.heartedList = newHeartedList;
    },
    setSelectedLandmark: (state, action: PayloadAction<number>) => {
      let newIdToDisplay: SelectedLandmark = {...state.selectedLandmark};
      newIdToDisplay.id = action.payload;
      state.selectedLandmark = newIdToDisplay;
    },
  },
});

export const {loadLandmarksState, setSelectedMarker, setFavouriteLandmark, setSelectedLandmark} =
  landMarksSlice.actions;
export const selectShop = (state: RootState) => state.landmarks;

export default landMarksSlice.reducer;
