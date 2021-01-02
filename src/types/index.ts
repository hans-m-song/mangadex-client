export enum FollowType {
  'All' = 0,
  'Reading' = 1,
  'Completed' = 2,
  'On hold' = 3,
  'Plan To Read' = 4,
  'Dropped' = 5,
  'Re-reading' = 6,
}

export enum HentaiVisibility {
  'Hide' = 0,
  'Show all' = 1,
  'Show H only' = 2,
}

export interface Serializable {
  [key: string]: string | boolean | number | undefined;
}
