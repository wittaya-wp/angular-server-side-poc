import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { AUTH_TOKEN } from './app/core/tokens/auth.token';

const bootstrap = () => bootstrapApplication(AppComponent, {
  ...config,
  providers: [
    ...config.providers,
    //*{ provide: AUTH_TOKEN, useValue: null } //*example of providing a default value
    //?edit this line to provide a default value for AUTH_TOKEN but 
    //! WARN this will override the value set in the server-side rendering
  ]
});

export default bootstrap;
