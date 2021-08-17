export interface RegionObj {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface MarkerObj {
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

export interface MarkersFlatList {
  item: MarkerObj;
}

export interface MarkersView {
  interestedPlace: boolean | undefined;
  selectedMarker: boolean | undefined;
}

export interface LandmarkMarkers {
  selectedLandmark: SelectedLandmark;
  markersArray: MarkerObj[];
  heartedList: MarkerObj[];
}

export interface SelectedLandmark {
  id: number;
}
