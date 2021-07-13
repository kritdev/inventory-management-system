import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../security/login/login.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'home'
        },
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'login',
          component: LoginComponent
        },
      ]
    ),
  ],
  exports: [RouterModule],
})
export class PageRoutingModule {}
