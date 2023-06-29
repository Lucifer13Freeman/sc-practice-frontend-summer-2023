import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor() {}

  public static set(key: string, value: any, isJson = false): void {
    localStorage.setItem(key, isJson ? JSON.stringify(value) : value);
  }

  public static get<T>(key: string, isJson = false): string | T | null {
    const str: string | null = localStorage.getItem(key);
    if (!str) {
      return null;
    }
    if (!isJson) {
      return str;
    }
    return JSON.parse(str) as T;
  }

  public static remove(key: string): void {
    localStorage.removeItem(key);
  }

  public static clear(): void {
    localStorage.clear();
  }
}
