import { InjectionToken, makeStateKey, StateKey } from '@angular/core';

// เปลี่ยนจาก <any> เป็น <string | null> เพื่อความปลอดภัยของ Type
export const AUTH_TOKEN = new InjectionToken<string | null>('AUTH_TOKEN');

// ส่วนนี้ถูกต้องสมบูรณ์แบบอยู่แล้ว
export const AUTH_TOKEN_KEY: StateKey<string | null> = makeStateKey<string | null>('authToken');