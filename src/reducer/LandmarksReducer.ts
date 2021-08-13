import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {markerObj} from '../utilities/interfaces';
import type {RootState} from './store';



interface LandmarkMarkers {
    selectedMarker: number;
    markersArray: markerObj[];
}

const initialState: LandmarkMarkers = {
    selectedMarker: 0,
    markersArray: [],
};

export const landMarksSlice = createSlice({
    name: 'landmarks',
    initialState,

    reducers:{

    }
})

export const {} =
  landMarksSlice.actions;
export const selectShop = (state: RootState) => state.landmarks;

export default landMarksSlice.reducer;