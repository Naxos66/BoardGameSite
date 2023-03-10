import { LocationsComponent } from './locations/locations.component';
import { FromulaireComponent } from './fromulaire/fromulaire.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

const routes: Routes = [

    {
      path: '',
      component: NbLoginComponent
    },
    {
      path: 'login',
      component: NbLoginComponent,
    },
    {
      path: 'register',
      component: NbRegisterComponent,
    },
    {
      path: 'logout',
      component: NbLogoutComponent,
    },
    {
      path: 'request-password',
      component: NbRequestPasswordComponent,
    },
    {
      path: 'reset-password',
      component: NbResetPasswordComponent,
    },
    {
      path: 'locations',
      component: LocationsComponent,
    },
  {
    path: 'addLocation',
    component: FromulaireComponent,
  },
    {
      path: '**',
      redirectTo: 'login'
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
