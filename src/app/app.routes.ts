import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '.well-known/appspecific/com.chrome.devtools.json', component: AppComponent },
];