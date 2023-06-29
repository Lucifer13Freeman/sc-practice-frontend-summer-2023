import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Injectable()
export class AuthTokenService {
  private static readonly TOKEN_KEY = 'accessToken';

  constructor() {}

  private static decode(text: string): string {
    try {
      return atob(text);
    } catch (e) {
      return '';
    }
  }

  public static isTokenExpired(token: string): boolean {
    const expiry = JSON.parse(this.decode(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  public static get(): string | null {
    let token: string | null = LocalStorageService.get<string | null>(this.TOKEN_KEY);
    if (token && AuthTokenService.isTokenExpired(token)) {
      AuthTokenService.remove();
      token = null;
    }
    return token;
  }

  public static save(token: string): void {
    if (!token) {
      return;
    }
    return LocalStorageService.set(AuthTokenService.TOKEN_KEY, token);
  }

  public static remove(): void {
    return LocalStorageService.remove(AuthTokenService.TOKEN_KEY);
  }
}
