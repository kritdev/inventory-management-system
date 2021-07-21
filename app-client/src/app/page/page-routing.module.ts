import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../security/login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { UserRouteAccessService } from '../security/auth/user-route-access.service';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'login',
          component: LoginComponent
        },        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'home'
        },
        {
          path: 'home',
          component: HomeComponent,
          canActivate:[UserRouteAccessService]
        },
        {
          path: 'product-detail/:id',
          component: ProductDetailComponent,
          canActivate:[UserRouteAccessService]
        },
        {
          path: 'product',
          component: ProductUpdateComponent,
          canActivate:[UserRouteAccessService]
        },
        {
          path: 'product/:id',
          component: ProductUpdateComponent,
          canActivate:[UserRouteAccessService]
        },
        {
          path: 'transaction',
          component: TransactionComponent,
          canActivate:[UserRouteAccessService]
        },
        {
          path: 'transaction/:id',
          component: TransactionComponent,
          canActivate:[UserRouteAccessService]
        },
      ]
    ),
  ],
  exports: [RouterModule],
})
export class PageRoutingModule {}
