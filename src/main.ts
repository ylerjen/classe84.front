import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'rxjs/add/operator/map'; // to use specific methods like map on observable
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { getTranslationProviders } from './app/i18n.provider';

if (environment.production) {
  enableProdMode();
}


getTranslationProviders().then(providers => {
  const options = { providers };
  platformBrowserDynamic().bootstrapModule(AppModule, options);
});
