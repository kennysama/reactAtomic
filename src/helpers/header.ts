import { HEADER_ITEMS } from '../lookups/header';
import Logger from './logger';
import { resolvePath } from './path';

export function resolveHeaderTextKey(pathname?: string): string {
  const path = pathname ? pathname : window.location.pathname;
  const item = HEADER_ITEMS.find(v => resolvePath(v.path) === path);
  if (!item) {
    Logger.error(`[Error]: resolveHeaderTextKey not found ${path}`);
    return 'Home.page';
  }
  return item.textKey;
}
