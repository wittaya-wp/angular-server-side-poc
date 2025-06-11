import { Injectable, Inject } from '@angular/core';

export const AUTH_TOKEN = 'AUTH_TOKEN';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(@Inject(AUTH_TOKEN) private authToken: string) {}

  getToken(): string {
    return this.authToken;
  }
}