export interface regionObj {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface markerObj {
  id: number;
  name: string;
  latlng: {
    latitude: number;
    longitude: number;
  };
  description: string;
  image: string;
  favourite?: boolean;
  selectedMarker?: boolean;
}

export interface markersFlatList {
  item: markerObj;
}

export interface markersView {
  interestedPlace: boolean | undefined;
  selectedMarker: boolean | undefined;
}

export interface LandmarkMarkers {
  selectedLandmark: SelectedLandmark;
  markersArray: markerObj[];
  heartedList: markerObj[];
}

export interface SelectedLandmark {
  id: number;
}
