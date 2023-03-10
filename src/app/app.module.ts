import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbThemeModule, NbLayoutModule} from '@nebular/theme';
import {HttpClientModule} from '@angular/common/http';
import {NbAuthModule, NbAuthSimpleToken, NbDummyAuthStrategy, NbPasswordAuthStrategy} from '@nebular/auth';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {provideStorage, getStorage} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire/compat';
import {NbFirebaseAuthModule, NbFirebasePasswordStrategy} from '@nebular/firebase-auth';
import { LocationsComponent } from './locations/locations.component';
import { FromulaireComponent } from './fromulaire/fromulaire.component';
import {ReactiveFormsModule} from "@angular/forms";


class PayloadDummy extends NbAuthSimpleToken {
  protected override payload = {
    role: 'test'
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent,
    FromulaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'dark'}),
    NbLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    NbFirebaseAuthModule,
    NbAuthModule.forRoot({
      strategies: [
        NbFirebasePasswordStrategy.setup({
          name: 'password',
          login: {redirect: {success: '/locations', failure: null}}
        }),
      ],
      forms: {
        login: {
          strategy: 'password',
          rememberMe: true,
          socialLinks: [],
        },
        register: {
          strategy: 'password',
          terms: true,
          socialLinks: [],
        },
        logout: {
          strategy: 'password',
        },
        requestPassword: {
          strategy: 'password',
          socialLinks: [],
        },
        resetPassword: {
          strategy: 'password',
          socialLinks: [],
        },
        validation: {
          password: {
            required: true,
            minLength: 6,
            maxLength: 50,
          },
          email: {
            required: true,
          },
          fullName: {
            required: false,
            minLength: 4,
            maxLength: 50,
          },
        },
      },
    }),
    NbEvaIconsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap:[AppComponent]
})

export class AppModule {
}
