import { AuthGuard } from './auth.guard';
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ListeLocationsComponent } from './liste-locations/liste-locations.component';
import { ModifierLocationComponent } from './modifier-location/modifier-location.component';
import { LocationsAllComponent } from './locations-all/locations-all.component';
import { ListeChatComponent } from './liste-chat/liste-chat.component';
import { ChatComponent } from './chat/chat.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { ListLocationsAdminComponent } from './list-locations-admin/list-locations-admin.component';
import { ListLocationsEncoursAdminComponent } from './list-locations-encours-admin/list-locations-encours-admin.component';
import { ListeAdminComponent } from './liste-admin/liste-admin.component';
import { AddAdminComponent } from './add-admin/add-admin.component';



class PayloadDummy extends NbAuthSimpleToken {
  protected override payload = {
    role: 'test'
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent,
    FromulaireComponent,
    ListeLocationsComponent,
    ModifierLocationComponent,
    LocationsAllComponent,
    ListeChatComponent,
    ChatComponent,
    DiscussionComponent,
    ListLocationsAdminComponent,
    ListLocationsEncoursAdminComponent,
    ListeAdminComponent,
    AddAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
  providers: [AuthGuard],
  bootstrap:[AppComponent]
})

export class AppModule {
}
