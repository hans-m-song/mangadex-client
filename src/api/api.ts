import axios, {AxiosRequestConfig} from 'axios';
import {multipart} from '../utils';
import {MangadexResponse, relationid, Serializable, tagid} from './common';
import {
  ChapterQuery,
  FollowedUpdatesQuery,
  IncludeChaptersQuery,
  LoginBody,
  MarkerBody,
  PaginatedQuery,
} from './query';
import {
  ChapterSummary,
  ChapterDetails,
  MangaRating,
  ChapterList,
} from './response/chapters';
import {GroupDetails} from './response/group';
import {MangaDetails} from './response/manga';
import {Relation} from './response/relations';
import {Tag} from './response/tag';
import {FollwedManga as FollowedManga, UserDetails} from './response/user';

const BASE_API = 'api/v2';

const serialize = <Q extends Serializable>(query: Q): string =>
  Object.entries(query)
    .map(([key, value]) => (value ? `${key}=${value}` : ''))
    .filter(Boolean)
    .join('&');

const makeUrl = <Q extends Serializable>(path: string, query?: Q) => {
  const serializedQuery = query ? `?${serialize(query)}` : '';
  const url = `/${path}${serializedQuery}`;
  console.log(url);
  return url;
};

const fetch = async <R>(config: AxiosRequestConfig): Promise<R> => {
  const response = await axios(config);
  console.log('request', config.method, config.url, response.data);
  return response.data as R;
};

const get = async <R, Q extends Serializable = Serializable>(
  path: string,
  query?: Q,
): Promise<R> => {
  const url = makeUrl(path, query);
  return fetch({url, method: 'GET'});
};

const post = async <R, Q extends Serializable = Serializable>(
  path: string,
  data: any,
  query?: Q,
): Promise<R> => {
  const url = makeUrl(path, query);
  return fetch({url, method: 'POST', data});
};

export const api = {
  login: async (body: LoginBody) => {
    const url = makeUrl('ajax/actions.ajax.php', {function: 'login'});
    const boundary = multipart.boundary();
    const config: AxiosRequestConfig = {
      url,
      method: 'post',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': `multipart/form-data boundary=${boundary}`,
      },
      data: multipart.payload(boundary, body),
    };
    await axios(config);
  },
  manga: (id: number) => {
    const path = `${BASE_API}/manga/${id}`;
    return {
      details: () => get<MangadexResponse<MangaDetails>>(path),
      chapters: (query?: PaginatedQuery) =>
        get<MangadexResponse<ChapterList>>(`${path}/chapters`, query),
      covers: () => get(`${path}/covers`),
    };
  },
  chapter: (id: number | string, query?: ChapterQuery) =>
    get<MangadexResponse<ChapterDetails>>(`${BASE_API}/chapter/${id}`, query),
  group: (id: number) => {
    const path = `${BASE_API}/group/${id}`;
    return {
      details: (query?: IncludeChaptersQuery) =>
        get<MangadexResponse<GroupDetails>>(path, query),
      chapters: (query?: PaginatedQuery) =>
        get<MangadexResponse<ChapterList>>(`${path}/chapters`, query),
    };
  },
  user: (id: number) => {
    const path = `${BASE_API}/user/${id}`;
    return {
      details: (query?: IncludeChaptersQuery) =>
        get<MangadexResponse<UserDetails>>(path, query),
      chapters: (query?: PaginatedQuery) =>
        get<MangadexResponse<ChapterList>>(`${path}/chapters`, query),
      followedManga: () =>
        get<MangadexResponse<FollowedManga[]>>(`${path}/followed-manga`),
      followedUpdates: (query?: FollowedUpdatesQuery) =>
        get<MangadexResponse<ChapterSummary[]>>(
          `${path}/followed-updates`,
          query,
        ),
      ratings: () => get<MangadexResponse<MangaRating[]>>(`${path}/ratings`),
      mangaDetails: (mangaId?: number) =>
        get(`${path}/manga${mangaId ? `/${mangaId}` : ''}`),
      marker: (body: MarkerBody) => post(`${path}/marker`, body),
    };
  },
  tag: (id: number) => get<MangadexResponse<Tag>>(`${BASE_API}/tag/${id}`),
  tags: () => get<MangadexResponse<Record<tagid, Tag>>>(`${BASE_API}/tag`),
  relations: () =>
    get<MangadexResponse<Record<relationid, Relation>>>(
      `${BASE_API}/relations`,
    ),
  // follows: () => get(`${BASE_API}/follows`), // not needed
};
