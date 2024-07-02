// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./features/playerSlice"; // adjust the path accordingly
import { spotifyApi } from "./services/APIcore";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(spotifyApi.middleware),
});
  