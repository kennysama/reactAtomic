import config from '../configuration/config';
import { ERouterPath } from '../types/index';

export function resolvePath(path: ERouterPath) {
  if (config.baseUrl === '') {
    return `/${path}`;
  }

  if (path === ERouterPath.login) {
    return `${config.baseUrl}`;
  }

  return `${config.baseUrl}/${path}`;
}
