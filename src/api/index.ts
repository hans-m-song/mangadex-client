import axios, {AxiosRequestConfig} from 'axios';
import {Serializable} from '../types';
import {multipart} from '../utils';
import {
  ChapterQuery,
  FollowedUpdatesQuery,
  IncludeChaptersQuery,
  LoginBody,
  MarkerBody,
  PaginatedQuery,
} from './types';

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

const get = async <R, Q extends Serializable = Serializable>(
  path: string,
  query?: Q,
): Promise<R> => {
  const url = makeUrl(path, query);
  const response = await axios.get<R>(url, {headers: {crossorigin: true}});
  return response.data;
};

const post = async <R, Q extends Serializable = Serializable>(
  path: string,
  body: any,
  query?: Q,
): Promise<R> => {
  const url = makeUrl(path, query);
  const response = await axios.post<R>(url, body);
  return response.data;
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
      details: () => get(path),
      chapters: (query?: PaginatedQuery) => get(`${path}/chapters`, query),
      covers: () => get(`${path}/covers`),
    };
  },
  chapter: (id: number | string, query?: ChapterQuery) =>
    get(`${BASE_API}/chapter/${id}`, query),
  group: (id: number) => {
    const path = `${BASE_API}/group/${id}`;
    return {
      details: (query?: IncludeChaptersQuery) => get(path, query),
      chapters: (query?: PaginatedQuery) => get(`${path}/chapters`, query),
    };
  },
  user: (id: number) => {
    const path = `${BASE_API}/user/${id}`;
    return {
      details: (query?: IncludeChaptersQuery) => get(path, query),
      chapters: (query?: PaginatedQuery) => get(`${path}/chapters`, query),
      followedManga: () => get(`${path}/followed-manga`),
      followedUpdates: (query?: FollowedUpdatesQuery) =>
        get(`${path}/followed-updates`, query),
      ratings: () => get(`${path}/ratings`),
      mangaDetails: (mangaId?: number) =>
        get(`${path}${mangaId ? `/${mangaId}` : ''}`),
      marker: (body: MarkerBody) => post(`${path}/marker`, body),
    };
  },
  tag: (id?: number) => get(`${BASE_API}/tag${id ? `/${id}` : ''}`),
  relations: () => get(`${BASE_API}/relations`),
  follows: () => get(`${BASE_API}/follows`),
};
