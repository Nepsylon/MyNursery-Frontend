import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthInterceptorProviders } from './core/auth/auth.interceptor';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { secret } from './environments/environment.secret';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        AuthInterceptorProviders,
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: secret.RECAPTCHA_SITE_KEY },
    ],
};
