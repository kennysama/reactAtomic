import { IndexedObject } from '../types';

export function toCamelCase(str: string): string {
  return str.replace(/^([A-Z])|[\s-_](\w)/g, (match, p1, p2, offset) => {
    return p2 ? p2.toUpperCase() : p1.toLowerCase();
  });
}

export function toCamelCaseObject(list: IndexedObject) {
  if (isPrimitive(list)) {
    return list;
  }
  if (list.length) {
    return list.map((nestedObj: IndexedObject) => toCamelCaseObject(nestedObj));
  } else {
    const result: IndexedObject = [];
    Object.keys(list).forEach(key => {
      if (key.length) {
        result[toCamelCase(key)] = toCamelCaseObject(list[key]);
      } else {
        result[toCamelCase(key)] = list[key];
      }
    });
    return { ...result };
  }
}

export function toSnakeCase(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase();
}

export function toSnakeCaseObject(list: IndexedObject) {
  if (isPrimitive(list)) {
    return list;
  }
  if (list.length) {
    return list.map((nestedObj: IndexedObject) => toSnakeCaseObject(nestedObj));
  } else {
    const result: IndexedObject = [];
    Object.keys(list).forEach(key => {
      if (key.length) {
        result[toSnakeCase(key)] = toSnakeCaseObject(list[key]);
      } else {
        result[toSnakeCase(key)] = list[key];
      }
    });
    return { ...result };
  }
}

const isPrimitive = (obj: IndexedObject) => !Array.isArray(obj) && (typeof obj !== 'object' || obj === null);
