import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../security/login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

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
        {
          path: 'product',
          component: ProductUpdateComponent
        },
        {
          path: 'transaction/new',
          component: TransactionComponent
        },
      ]
    ),
  ],
  exports: [RouterModule],
})
export class PageRoutingModule {}
