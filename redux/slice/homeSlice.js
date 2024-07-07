import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';

// Thunks
export const fetchRecipes = createAsyncThunk('home/fetchRecipes', async ({page}) => {
  const response = await API.get(`/recipes?page=${page}&limit=10`);
  return response.data.data;
});

export const searchRecipes = createAsyncThunk('home/searchRecipes', async ({ query, page = 1 }) => {
  const response = await API.get(`/recipes?page=${page}&limit=10&search=${query}`);
  return {
    data: response.data.data,
    totalPages: response.data.totalPages,
    currentPage: page,
  };
});


const initialState = {
  recipes: [],
  searchResults: [],
  searchMessage: '',
  currentPage: 1,
  totalPages: 1,
  status: 'idle',
  error: null,
};


const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Recipes
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Search Recipes
      .addCase(searchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.searchMessage = action.payload.data.length === 0 ? 'Resep yang Anda cari tidak ditemukan.' : '';
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default homeSlice.reducer;
