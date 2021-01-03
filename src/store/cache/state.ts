import {mangaid, chapterid} from '../../api/common';
import {ChapterList} from '../../api/response/chapters';
import {MangaDetails} from '../../api/response/manga';
import {LoadState} from '../../types';

export interface CacheState {
  loadState: LoadState;
  historyMax: number;
  history: mangaid[];
  manga: Record<mangaid, MangaDetails>;
  chapters: Record<chapterid, ChapterList>;
}

export const defaultCacheState: CacheState = {
  loadState: LoadState.Initial,
  historyMax: 20,
  history: [],
  manga: {},
  chapters: {},
};
