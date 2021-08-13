
import { configureStore } from "@reduxjs/toolkit";
import LandmarksReducer from "./LandmarksReducer";

export const store = configureStore({
    reducer: {
        landmarks: LandmarksReducer,
    }
});

export type RootState = ReturnType< typeof store.getState>
export type AppDispatch = typeof store.dispatch
