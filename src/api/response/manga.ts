import {
  Demographic,
  numberlike,
  PublicationStatus,
  unixtimelike,
  urllike,
} from '../../types';
import {mangaid, relationid, tagid} from '../common';

export interface RelatedManga {
  id: mangaid;
  title: string;
  type: relationid;
  isHentai: boolean;
}

export interface MangaDetails {
  id: mangaid;
  title: string;
  altTitles: string[];
  description: string;
  artist: string[];
  author: string[];
  publication: {
    language: string;
    status: PublicationStatus;
    demographic: Demographic;
  };
  tags: tagid[];
  lastChapter: numberlike | null;
  lastVolume: numberlike | null;
  isHentai: boolean;
  links: Partial<{
    al: string;
    ap: string;
    bw: string;
    kt: string;
    mu: string;
    nu: string;
    amz: string;
    cdj: string;
    ebj: string;
    mal: string;
    raw: urllike;
    engtl: urllike;
  }>;
  relations: RelatedManga[];
  rating: {
    bayesian: number;
    mean: number;
    users: number;
  };
  views: number;
  follows: number;
  comments: number;
  lastUploaded: unixtimelike;
  mainCover: urllike;
}
