import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {mangaid, chapterid} from '../../api';
import {ChapterList, MangaDetails} from '../../api/response';
import {RootState} from '../root';
import {defaultCacheState} from './state';
import {applyLoadStateHooks, setLoadState} from '../actions';

const fetchDetails = createAsyncThunk<
  MangaDetails,
  mangaid,
  {state: RootState}
>('cache/fetchDetails', () => {
  return {} as MangaDetails;
});

const fetchChapters = createAsyncThunk<
  ChapterList,
  chapterid,
  {state: RootState}
>('cache/fetchChapters', () => {
  return {} as ChapterList;
});

const {reducer, actions} = createSlice({
  name: 'cache',
  initialState: defaultCacheState,
  reducers: {
    setLoadState,
    pushHistory: (
      state,
      {payload}: PayloadAction<{manga: MangaDetails; chapters: ChapterList}>,
    ) => {
      const {manga, chapters} = payload;
      state.history.unshift(manga.id);
      state.manga[manga.id] = manga;
      state.chapters[manga.id] = chapters;
      if (state.history.length > state.historyMax) {
        const oldId = state.history.pop()!;
        delete state.manga[oldId];
        delete state.chapters[oldId];
      }
    },
  },
  extraReducers: (builder) => {
    applyLoadStateHooks(builder, fetchDetails);
    applyLoadStateHooks(builder, fetchChapters);
  },
});

export const cacheReducer = reducer;
export const cacheAction = {...actions, fetchDetails, fetchChapters};
