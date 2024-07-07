import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';

export const fetchRecipe = createAsyncThunk('recipe/fetchRecipe', async (id) => {
  const response = await API.get(`/recipes/${id}`);
  return response.data.data;
});

export const fetchLikeStatus = createAsyncThunk('recipe/fetchLikeStatus', async (id) => {
  const response = await API.get(`/recipes/like`);
  const likeRecipe = response.data.data.find(recipe => recipe.recipe_id === id);
  return !!likeRecipe;
});

export const fetchSaveStatus = createAsyncThunk('recipe/fetchSaveStatus', async (id) => {
  const response = await API.get(`/recipes/save`);
  const savedRecipe = response.data.data.find(recipe => recipe.recipe_id === id);
  return !!savedRecipe;
});

export const deleteLike = createAsyncThunk('recipe/deleteLike', async (id) => {
  const likeRecipesData = await API.get('/recipes/like');
  const likeRecipe = likeRecipesData.data.data.find(recipe => recipe.recipe_id === id);
  await API.delete(`/recipes/like/${likeRecipe.id}`);
  return id;
});

export const deleteSave = createAsyncThunk('recipe/deleteSave', async (id) => {
  const saveRecipeData = await API.get('/recipes/save');
  const saveRecipe = saveRecipeData.data.data.find(recipe => recipe.recipe_id === id);
  await API.delete(`/recipes/save/${saveRecipe.id}`);
  return id;
});

export const addRecipe = createAsyncThunk('recipe/addRecipe', async ({ image, title, description }) => {
  // Phase 1: Upload image
  const formData = new FormData();
  formData.append('file', image);
  const uploadResponse = await API.post('/upload', formData);
  const imageUrl = uploadResponse.data.data.file_url;

  // Phase 2: Upload data
  const data = {
    title,
    description,
    image: imageUrl,
  };
  const recipeResponse = await API.post('/recipes', data);
  return recipeResponse.data.data;
});

export const editRecipe = createAsyncThunk('recipe/editRecipe', async ({ id, image, title, description, showImage }) => {
  // Phase 1: Upload image if changed
  let imageUrl = showImage;
  if (showImage !== image) {
    const formData = new FormData();
    formData.append('file', image);
    const uploadResponse = await API.post('/upload', formData);
    imageUrl = uploadResponse.data.data.file_url;
  }

  // Phase 2: Upload data
  const data = {
    title,
    description,
    image: imageUrl,
  };
  const recipeResponse = await API.put(`/recipes/${id}`, data);
  return recipeResponse.data.data;
});

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    recipe: null,
    error: null,
    isLiked: false,
    isSaved: false,
    addRecipeStatus: 'idle',
    editRecipeStatus: 'idle',
  },
  reducers: {
    setLikeStatus: (state, action) => {
      state.isLiked = action.payload;
    },
    setSaveStatus: (state, action) => {
      state.isSaved = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipe.fulfilled, (state, action) => {
        state.recipe = action.payload;
      })
      .addCase(fetchRecipe.rejected, (state, action) => {
        state.error = "Error fetching recipe details.";
      })
      .addCase(fetchLikeStatus.fulfilled, (state, action) => {
        state.isLiked = action.payload;
      })
      .addCase(fetchLikeStatus.rejected, (state, action) => {
        state.error = "Error fetching like status.";
      })
      .addCase(fetchSaveStatus.fulfilled, (state, action) => {
        state.isSaved = action.payload;
      })
      .addCase(fetchSaveStatus.rejected, (state, action) => {
        state.error = "Error fetching save status.";
      })
      .addCase(deleteLike.fulfilled, (state, action) => {
        state.isLiked = false;
      })
      .addCase(deleteLike.rejected, (state, action) => {
        state.error = "Error deleting like.";
      })
      .addCase(deleteSave.fulfilled, (state, action) => {
        state.isSaved = false;
      })
      .addCase(deleteSave.rejected, (state, action) => {
        state.error = "Error deleting save.";
      })
      .addCase(addRecipe.pending, (state) => {
        state.addRecipeStatus = 'loading';
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.addRecipeStatus = 'succeeded';
        state.recipe = action.payload;
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.addRecipeStatus = 'failed';
        state.error = "Error adding recipe.";
      })
      .addCase(editRecipe.pending, (state) => {
        state.editRecipeStatus = 'loading';
      })
      .addCase(editRecipe.fulfilled, (state, action) => {
        state.editRecipeStatus = 'succeeded';
        state.recipe = action.payload;
      })
      .addCase(editRecipe.rejected, (state, action) => {
        state.editRecipeStatus = 'failed';
        state.error = "Error editing recipe.";
      });
  },
});

export const { setLikeStatus, setSaveStatus } = recipeSlice.actions;

export default recipeSlice.reducer;
