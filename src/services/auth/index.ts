import { ERouterPath } from '../../types/index';
import { IStaff } from '../../types/staff';
import { INITIAL_LOGGED_IN_STAFF } from '../../lookups/staff';

const TOKEN_KEY = 'TOKEN';
const TEMPO_CODE_KEY = 'TEMPO_CODE';
const STAFF_CODE_KEY = 'STAFF_CODE';
const MANAGER_FLAG_KEY = 'MANAGER_FLAG';
const ALL_KEYS = [TOKEN_KEY, MANAGER_FLAG_KEY, TEMPO_CODE_KEY, STAFF_CODE_KEY];

export function getToken(): string {
  if (!hasToken()) {
    return '';
  }

  const cookies = getCookieObject();
  const cookie = cookies[TOKEN_KEY] ? cookies[TOKEN_KEY] : '';
  return cookie;
}

export function getLoggedInStaff(): IStaff {
  const cookies = getCookieObject();
  return {
    tempoCode: cookies[TEMPO_CODE_KEY] ? cookies[TEMPO_CODE_KEY] : INITIAL_LOGGED_IN_STAFF.tempoCode,
    staffCode: cookies[STAFF_CODE_KEY] ? cookies[STAFF_CODE_KEY] : INITIAL_LOGGED_IN_STAFF.staffCode,
    managerFlag: cookies[MANAGER_FLAG_KEY] ? cookies[MANAGER_FLAG_KEY] : INITIAL_LOGGED_IN_STAFF.managerFlag,
  };
}

export function deleteCookieStore() {
  ALL_KEYS.forEach(key => {
    document.cookie = `${key}=null; max-age=0`;
  });
}

export function setToken(token: string): void {
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${getMaxAge()}`;
}

export function setLoggedInStaff(data: IStaff) {
  document.cookie = `${TEMPO_CODE_KEY}=${data.tempoCode}; path=/; max-age=${getMaxAge()}`;
  document.cookie = `${STAFF_CODE_KEY}=${data.staffCode}; path=/; max-age=${getMaxAge()}`;
  document.cookie = `${MANAGER_FLAG_KEY}=${data.managerFlag}; path=/; max-age=${getMaxAge()}`;
}

export function resetCookie(): void {
  const cookies = getCookieObject();
  ALL_KEYS.forEach(key => {
    const value = cookies[key] ? cookies[key] : '';
    document.cookie = `${key}=${value}; path=/; max-age=${getMaxAge()}`;
  });
}

export function hasToken(): boolean {
  const cookies = getCookieObject();
  if (cookies.hasOwnProperty(TOKEN_KEY)) {
    return true;
  }
  return false;
}

export function isLoggedIn(): boolean {
  if (hasToken()) {
    return true;
  }
  return false;
}

export function canDisplayLink(path: ERouterPath): boolean {
  switch (path) {
    case ERouterPath.login:
      return true;
    default:
      if (hasToken()) {
        return true;
      }
      return false;
  }
}

function getMaxAge(): string {
  return (2 * 60 * 60).toString();
}

function getCookieObject(): any {
  const ret: any = {};
  const cookies = document.cookie.split(/; ?/);
  cookies.forEach(cookie => {
    const tmp = cookie.split('=');
    ret[tmp[0]] = tmp[1];
  });

  return ret;
}
