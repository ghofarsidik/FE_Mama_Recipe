import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';

export const getProfile = createAsyncThunk('user/getProfile', async (_, thunkAPI) => {
  try {
    const response = await API.get('/users/profile');
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
  }
});

export const getMyRecipes = createAsyncThunk('user/getMyRecipes', async (_, thunkAPI) => {
  try {
    const response = await API.get('/recipes/self');
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch my recipes');
  }
});

export const getSavedRecipes = createAsyncThunk('user/getSavedRecipes', async (_, thunkAPI) => {
  try {
    const response = await API.get('/recipes/save');
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch saved recipes');
  }
});

export const getLikeRecipes = createAsyncThunk('user/getLikeRecipes', async (_, thunkAPI) => {
  try {
    const response = await API.get('/recipes/like');
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch liked recipes');
  }
});

export const deleteSavedRecipe = createAsyncThunk('user/deleteSavedRecipe', async (recipeId, thunkAPI) => {
  try {
    await API.delete(`/recipes/save/${recipeId}`);
    return recipeId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete saved recipe');
  }
});

export const deleteLikeRecipe = createAsyncThunk('user/deleteLikeRecipe', async (recipeId, thunkAPI) => {
  try {
    await API.delete(`/recipes/like/${recipeId}`);
    return recipeId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete liked recipe');
  }
});

export const deleteMyRecipe = createAsyncThunk('user/deleteMyRecipe', async (recipeId, thunkAPI) => {
  try {
    await API.delete(`/recipes/${recipeId}`);
    return recipeId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete recipe');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    myRecipes: [],
    savedRecipes: [],
    likeRecipes: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.user = null;
      state.myRecipes = [];
      state.savedRecipes = [];
      state.likeRecipes = [];
    },
    removeMyRecipe: (state, action) => { // Renamed here
      state.myRecipes = state.myRecipes.filter(recipe => recipe.id !== action.payload);
    },
    removeSavedRecipe: (state, action) => { // Renamed here
      state.savedRecipes = state.savedRecipes.filter(recipe => recipe.id !== action.payload);
    },
    removeLikeRecipe: (state, action) => { // Renamed here
      state.likeRecipes = state.likeRecipes.filter(recipe => recipe.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMyRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.myRecipes = action.payload;
      })
      .addCase(getMyRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSavedRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSavedRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.savedRecipes = action.payload;
      })
      .addCase(getSavedRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLikeRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLikeRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.likeRecipes = action.payload;
      })
      .addCase(getLikeRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSavedRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSavedRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.savedRecipes = state.savedRecipes.filter(recipe => recipe.id !== action.payload);
      })
      .addCase(deleteSavedRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteLikeRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLikeRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.likeRecipes = state.likeRecipes.filter(recipe => recipe.id !== action.payload);
      })
      .addCase(deleteLikeRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMyRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMyRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.myRecipes = state.myRecipes.filter(recipe => recipe.id !== action.payload);
      })
      .addCase(deleteMyRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile, removeMyRecipe, removeSavedRecipe, removeLikeRecipe } = userSlice.actions; // Updated export
export default userSlice.reducer;
