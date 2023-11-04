import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CalcoliPrecedentiDialogComponent } from './calcoli-precendenti-dialog/calcoli-precedenti-dialog.component';
import { SalvaCalcoloDialogComponent } from './salva-calcolo-dialog/salva-calcolo-dialog.component';

import localeIt from '@angular/common/locales/it';
import { ServiceWorkerModule } from '@angular/service-worker';
registerLocaleData(localeIt);

@NgModule({
    declarations: [
        AppComponent,
        CalcoliPrecedentiDialogComponent,
        SalvaCalcoloDialogComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatTooltipModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        }),
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'it-IT'},
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
