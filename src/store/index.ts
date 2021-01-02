import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from './user';

export const createStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
    },
  });
