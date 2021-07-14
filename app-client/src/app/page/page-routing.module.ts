import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../security/login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

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
        {
          path: 'product-detail/:id',
          component: ProductDetailComponent
        },
      ]
    ),
  ],
  exports: [RouterModule],
})
export class PageRoutingModule {}
