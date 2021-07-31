import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../security/login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { UserRouteAccessService } from '../security/auth/user-route-access.service';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryUpdateComponent } from './category-update/category-update.component';
import { UnitOfMeasureListComponent } from './unit-of-measure-list/unit-of-measure-list.component';
import { UnitOfMeasureUpdateComponent } from './unit-of-measure-update/unit-of-measure-update.component';

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
          component: HomeComponent
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
        {
          path: 'category',
          component: CategoryListComponent,
          canActivate:[UserRouteAccessService]
        },
        {
          path: 'category/new',
          component: CategoryUpdateComponent,
          canActivate:[UserRouteAccessService]
        },
        {
          path: 'category/update/:id',
          component: CategoryUpdateComponent,
          canActivate:[UserRouteAccessService]
        },
        {
          path: 'unit-of-measure',
          component: UnitOfMeasureListComponent,
          canActivate:[UserRouteAccessService]
        },
        {
          path: 'unit-of-measure/new',
          component: UnitOfMeasureUpdateComponent,
          canActivate:[UserRouteAccessService]
        },
        {
          path: 'unit-of-measure/update/:id',
          component: UnitOfMeasureUpdateComponent,
          canActivate:[UserRouteAccessService]
        },
      ]
    ),
  ],
  exports: [RouterModule],
})
export class PageRoutingModule {}
