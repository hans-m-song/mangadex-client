import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api, UserDetails, userid} from '../../api';
import {RootState} from '../root';
import {defaultUserState} from './state';
import {applyLoadStateHooks, setLoadState} from '../actions';

const fetchDetails = createAsyncThunk<UserDetails, userid, {state: RootState}>(
  'user/fetchDetails',
  async (arg) => {
    const response = await api.user(arg).details();
    return response.data;
  },
);

const {reducer, actions} = createSlice({
  name: 'user',
  initialState: defaultUserState,
  reducers: {
    setLoadState,
  },
  extraReducers: (builder) => {
    applyLoadStateHooks(builder, fetchDetails, {
      fulfilled: (state, {payload}) => {
        state.id = payload.id;
        state.username = payload.username;
        state.avatar = payload.avatar;
      },
    });
  },
});

export const userReducer = reducer;
export const userAction = {...actions, fetchDetails};
