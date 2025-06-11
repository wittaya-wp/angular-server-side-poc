import { CommonModule, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, Optional, PLATFORM_ID, TransferState } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AUTH_TOKEN, AUTH_TOKEN_KEY } from './core/tokens/auth.token';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'app-server-side';
  authToken: string | null = null;

  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(AUTH_TOKEN) private injectedAuthToken: string | null,
  ) {
    // 1. ลองอ่านค่าจาก State ที่ Server ส่งมาก่อนเป็นอันดับแรก
    this.authToken = this.transferState.get(AUTH_TOKEN_KEY, null);

    // 2. ถ้ายังไม่มีค่าใน authToken (แสดงว่าเป็น null) และเราอยู่บน Server...
    if (!this.authToken && isPlatformServer(this.platformId)) {
      // ...ก็ให้เอาค่าที่ Inject เข้ามา มาใช้และเก็บลง State เพื่อส่งต่อ
      this.authToken = this.injectedAuthToken;
      this.transferState.set(AUTH_TOKEN_KEY, this.authToken);
    }
  }

  ngOnInit() {
    console.log(`AppComponent initialized with authToken: ${this.authToken}`);
  }
}