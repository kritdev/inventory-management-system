import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { MainComponent } from './page/layout/main/main.component';
import { LoginComponent } from './security/login/login.component';

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
export class AppRoutingModule {}
