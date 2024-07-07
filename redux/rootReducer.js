import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import userReducer from './slice/userSlice';
import recipeReducer from './slice/recipeSlice';
import homeReducer from './slice/homeSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  recipe: recipeReducer,
  home: homeReducer,
});

export default rootReducer;