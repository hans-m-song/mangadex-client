import {defaultUserState, UserState} from './user';

export interface RootState {
  user: UserState;
}

export const defaultRootState: RootState = {
  user: defaultUserState,
};
