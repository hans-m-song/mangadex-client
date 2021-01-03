import {userid} from '../../api';
import {LoadState, urllike} from '../../types';

export interface UserState {
  loadState: LoadState;
  id: userid;
  username: string;
  avatar: urllike;
}

export const defaultUserState: UserState = {
  loadState: LoadState.Initial,
  id: 0,
  username: '',
  avatar: '',
};
