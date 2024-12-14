import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("favorites")) || [];
const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const movie = action.payload;
      if (!state.some((fav) => fav.id === movie.id)) {
        state.push(movie);
        localStorage.setItem("favorites", JSON.stringify(state));
      }
    },
    removeFromFavorites: (state, action) => {
      const id = action.payload;
      const updatedFavorites = state.filter((movie) => movie.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
