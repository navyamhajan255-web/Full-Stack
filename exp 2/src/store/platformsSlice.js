import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  platforms: [],
};

const platformsSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {
    addPlatform: (state, action) => {
      state.platforms.push(action.payload);
    },

    deletePlatform: (state, action) => {
      state.platforms = state.platforms.filter(
        (platform) => platform.id !== action.payload
      );
    },
  },
});

export const { addPlatform, deletePlatform } = platformsSlice.actions;

export default platformsSlice.reducer;