import {chapterid, mangaid, groupid, userid} from '../common';
import {hash, numberlike, unixtimelike, urllike} from '../../types';

export interface ChapterSummary {
  id: chapterid;
  hash: hash;
  mangaId: mangaid;
  mangaTitle: string;
  volume: numberlike;
  chapter: numberlike;
  title: string;
  language: string;
  groups: groupid[];
  uploader: userid;
  timestamp: unixtimelike;
  comments: number;
  views: number;
}

interface Group {
  id: groupid;
  name: string;
}

export interface ChapterList {
  chapters: ChapterSummary[];
  groups: Group[];
}

export interface MangaRating {
  mangaId: mangaid;
  rating: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export interface ChapterDetails {
  id: chapterid;
  hash: hash;
  mangaId: mangaid;
  mangaTitle: string;
  volume: numberlike;
  chapter: numberlike;
  title: string;
  language: string;
  groups: Group[];
  uploader: userid;
  timestamp: unixtimelike;
  comments: number;
  views: number;
  status: string;
  pages: string[];
  server: urllike;
}
