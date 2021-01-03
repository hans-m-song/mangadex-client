import {CacheState, defaultCacheState} from './cache/state';
import {defaultUserState, UserState} from './user/state';

export interface RootState {
  user: UserState;
  cache: CacheState;
}

export const defaultRootState: RootState = {
  user: defaultUserState,
  cache: defaultCacheState,
};
