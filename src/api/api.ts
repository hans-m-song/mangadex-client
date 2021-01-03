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
): Promise<MangadexResponse<R>> => {
  const url = makeUrl(`${BASE_API}/${path}`, query);
  return fetch({url, method: 'GET'});
};

const post = async <R, Q extends Serializable = Serializable>(
  path: string,
  body: any,
  query?: Q,
): Promise<MangadexResponse<R>> => {
  const url = makeUrl(`${BASE_API}/${path}`, query);
  return fetch({url, method: 'POST', data: body});
};

const postAjax = async <R, Q extends Serializable = Serializable>(
  path: string,
  body: any,
  query?: Q,
): Promise<R> => {
  const url = makeUrl(path, query);
  const boundary = multipart.boundary();
  return fetch({
    url,
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': `multipart/form-data boundary=${boundary}`,
    },
    data: multipart.payload(boundary, body),
  });
};

export const api = {
  login: async (body: LoginBody) =>
    postAjax('ajax/actions.ajax.php', body, {function: 'login'}),
  manga: (id: number) => {
    const path = `manga/${id}`;
    return {
      details: () => get<MangaDetails>(path),
      chapters: (query?: PaginatedQuery) =>
        get<ChapterList>(`${path}/chapters`, query),
      covers: () => get(`${path}/covers`),
    };
  },
  chapter: (id: number | string, query?: ChapterQuery) =>
    get<ChapterDetails>(`chapter/${id}`, query),
  group: (id: number) => {
    const path = `group/${id}`;
    return {
      details: (query?: IncludeChaptersQuery) =>
        get<GroupDetails>(path, query),
      chapters: (query?: PaginatedQuery) =>
        get<ChapterList>(`${path}/chapters`, query),
    };
  },
  user: (id: number) => {
    const path = `user/${id}`;
    return {
      details: (query?: IncludeChaptersQuery) =>
        get<UserDetails>(path, query),
      chapters: (query?: PaginatedQuery) =>
        get<ChapterList>(`${path}/chapters`, query),
      followedManga: () =>
        get<FollowedManga[]>(`${path}/followed-manga`),
      followedUpdates: (query?: FollowedUpdatesQuery) =>
        get<ChapterSummary[]>(
          `${path}/followed-updates`,
          query,
        ),
      ratings: () => get<MangaRating[]>(`${path}/ratings`),
      mangaDetails: (mangaId?: number) =>
        get(`${path}/manga${mangaId ? `/${mangaId}` : ''}`),
      marker: (body: MarkerBody) => post(`${path}/marker`, body),
    };
  },
  tag: (id: number) => get<Tag>(`tag/${id}`),
  tags: () => get<Record<tagid, Tag>>(`tag`),
  relations: () =>
    get<Record<relationid, Relation>>(
      `relations`,
    ),
  // follows: () => get(`follows`), // not needed
};
