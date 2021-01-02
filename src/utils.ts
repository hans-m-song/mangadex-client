import {Serializable} from './types';

export const multipart = {
  boundary: (): string => 'mfa' + Math.floor(Math.random() * 1000).toString(),
  payload: (boundary = 'mfa', obj: Serializable = {}): string =>
    Object.keys(obj).reduce((payload, key) => {
      const current =
        `--${boundary}\nContent-Disposition: form-data; ` +
        `name="${key}"\n\n${obj[key]}\n`;
      return `${current}${payload}`;
    }, `--${boundary}--`),
};
