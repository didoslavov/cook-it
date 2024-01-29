import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authInterceptor } from './store/auth/auth.interceptor';
import { AuthEffects } from './store/auth/auth.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { featureReducers, metaReducers } from './store/auth/auth.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(featureReducers, { metaReducers }),
    provideEffects([AuthEffects]),
    provideStoreDevtools({
      maxAge: 25,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
