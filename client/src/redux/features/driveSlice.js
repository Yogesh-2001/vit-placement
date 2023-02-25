import { createSlice } from "@reduxjs/toolkit";

export const driveSlice = createSlice({
  name: "drive",
  initialState: { drives: [] },
  reducers: {
    setDrives: (state, action) => {
      state.drives = action.payload;
    },
  },
});

export const { setDrives } = driveSlice.actions;
