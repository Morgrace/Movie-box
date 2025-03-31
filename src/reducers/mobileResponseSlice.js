import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchBarActive: false,
};
const mobileResponsiveSlice = createSlice({
  name: "mobile",
  initialState,
  reducers: {
    searchBarActive(state) {
      state.searchBarActive = true;
    },
    searchBarInactive(state) {
      state.searchBarActive = false;
    },
  },
});
export const { searchBarActive, searchBarInactive } =
  mobileResponsiveSlice.actions;
export default mobileResponsiveSlice.reducer;
