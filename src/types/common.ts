export type unixtimelike = string;
export type datelike = string;
export type urllike = string;
export type emaillike = string;
export type numberlike = string;
export type hash = string;

export enum LoadState {
  Initial,
  Pending,
  Fulfilled,
  Rejected,
}
