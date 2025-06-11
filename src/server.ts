import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AUTH_TOKEN } from './app/core/tokens/auth.token';
import bootstrap from './main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const app = express();
const commonEngine = new CommonEngine();

/*
 * =================================
 * สรุปความหมาย Glob Patterns
 * =================================
 *
 * สัญลักษณ์: * (ดาวเดียว)
 * ความหมาย: จับคู่ 1 ท่อน (Segment) ของ Path (อะไรก็ได้ที่ไม่ข้ามเครื่องหมาย '/')
 * ตัวอย่าง:  จับคู่ /users, /about | ไม่จับคู่ /users/profile
 * การใช้งาน: app.get('*', ...) มักใช้เป็นตัวดักจับทุก Route ที่เหลือ (Catch-all)
 *
 * ---------------------------------
 *
 * สัญลักษณ์: *.* (ดาว จุด ดาว)
 * ความหมาย: จับคู่ 1 ท่อนของ Path ที่มีเครื่องหมายจุด (.) อยู่ข้างใน
 * ตัวอย่าง:  จับคู่ main.js, styles.css | ไม่จับคู่ about
 * การใช้งาน: app.get('*.*', ...) เหมาะสำหรับการดักจับไฟล์ Asset ต่างๆ
 *
 * ---------------------------------
 *
 * สัญลักษณ์: ** (ดาวสองดวง)
 * ความหมาย: จับคู่ทุกอย่างแบบไม่จำกัดชั้น (สามารถข้ามเครื่องหมาย '/' ได้)
 * ตัวอย่าง:  assets/** จะจับคู่ได้ทั้ง assets/img.png และ assets/css/main.css
 * การใช้งาน: ไม่ได้ใช้โดยตรงใน Express Route แต่ใช้บ่อยในไฟล์ตั้งค่าอื่นๆ เช่น .gitignore, tsconfig.json
 *
 */

app.get(
  '*.*', // <-- สำคัญมาก: ดักเฉพาะ URL ที่มีจุด (เช่น .js, .css, .ico)
  (req, res, next) => {
    console.log(`Serving static file: ${req.url} from ${browserDistFolder} \n\n`);
    express.static(browserDistFolder, {
      maxAge: '1y',
    })(req, res, next);
  },
);

app.get('*', (req, res, next) => { // <-- ดักจับทุก URL ที่ไม่มีจุด (เช่น /, /about, /users)
  const { protocol, originalUrl, baseUrl, headers } = req;
  // console.log(` :55 app.get headers: ${new Date().toISOString()}`, headers, `\n=================${new Date().toISOString()}=============================\n\n\n  `);
  let token = req.headers['authorization'] || req.headers['Authorization'] || '';
  if (token && typeof token === 'string') { 
    token = token.trim(); // ทำให้แน่ใจว่าไม่มีช่องว่างข้างหน้า/หลัง
    token = token.replace(/^Bearer\s+/, ''); // ลบคำว่า "Bearer " ถ้ามี
  } 
  token = token || `can't get headers request`;
  console.log(`Server.js :'*': token:`, token );

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [
        { provide: APP_BASE_HREF, useValue: baseUrl },
        { provide: AUTH_TOKEN, useValue: token }, // <-- ส่งค่า authToken ไปยัง Angular
      ],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export default app;
