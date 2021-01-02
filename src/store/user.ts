import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
  name: string;
}

export const defaultUserState: UserState = {
  name: '',
};

const {reducer, actions} = createSlice({
  name: 'user',
  initialState: defaultUserState,
  reducers: {
    setName: (state, {payload}: PayloadAction<string>) => {
      state.name = payload;
    },
  },
});

export const userReducer = reducer;
export const userAction = actions;
