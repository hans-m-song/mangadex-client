import {FollowType, HentaiVisibility, Serializable} from '../types';

export interface LoginBody extends Serializable {
  login_username: string;
  login_password: string;
  remember_me: 1 | 0;
}

export interface MarkerBody {
  chapters: number[];
  read: boolean;
}

export interface PaginatedQuery extends Serializable {
  p?: number;
  limit?: number;
}

export interface ChapterQuery extends Serializable {
  server?: 'na' | 'na2';
  saver?: boolean;
  mark_read?: boolean;
}

export interface IncludeChaptersQuery extends Serializable {
  include?: 'chapters';
}

export interface FollowedUpdatesQuery extends Serializable {
  p?: number;
  type?: FollowType;
  hentai?: HentaiVisibility;
  delayed?: boolean;
}
