import {datelike, emaillike, unixtimelike, urllike} from '../../types';
import {groupid, userid} from '../common';

export interface GroupMember {
  id: userid;
  name: string;
}

export interface GroupDetails {
  id: groupid;
  name: string;
  altNames: string;
  language: string;
  leader: GroupMember;
  members: GroupMember[];
  description: string;
  website: urllike;
  discord: '';
  ircServer: '';
  ircChannel: '';
  email: emaillike;
  founded: datelike;
  likes: number;
  follows: number;
  views: number;
  chapters: number;
  threadId: number;
  threadPosts: number;
  isLocked: true;
  isInactive: false;
  delay: number;
  lastUpdated: unixtimelike;
  banner: urllike;
}
