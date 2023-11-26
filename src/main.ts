import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) =>
    console.error(
      "Une erreur s'est produite à l'initialisation  : ",
      err.message
    )
  );
