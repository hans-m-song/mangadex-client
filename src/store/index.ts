import {configureStore} from '@reduxjs/toolkit';
import {cacheReducer} from './cache/slice';
import {defaultRootState} from './root';
import {userReducer} from './user/slice';

export const createStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      cache: cacheReducer,
    },
    preloadedState: defaultRootState,
  });
