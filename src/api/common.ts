export type MangadexResponse<T> =
  | {
      code: 200;
      status: 'OK';
      data: T;
    }
  | {code: 403 | 404; status: 'error'; message: string};

export interface Serializable {
  [key: string]: string | boolean | number | undefined;
}

export type relationid = number;
export type tagid = number;
export type userid = number;
export type mangaid = number;
export type chapterid = number;
export type groupid = number;
