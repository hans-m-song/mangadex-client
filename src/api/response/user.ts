import {FollowType, numberlike, unixtimelike, urllike} from '../../types';
import {mangaid, userid} from '../common';

export interface UserDetails {
  id: number;
  username: string;
  levelId: number;
  joined: unixtimelike;
  lastSeen: unixtimelike;
  website: urllike;
  biography: string;
  views: number;
  uploads: number;
  premium: boolean;
  mdAtHome: number;
  avatar: urllike;
}

export interface FollwedManga {
  userId: userid;
  mangaId: mangaid;
  mangaTitle: string;
  isHentai: boolean;
  followType: FollowType;
  volume: numberlike;
  chapter: numberlike;
  rating: null;
}
