import { NgModule } from '@angular/core';
import { PageRoutingModule } from './page-routing.module';
import { AppComponentModule } from '../component/app-component.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './layout/main/main.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryUpdateComponent } from './category-update/category-update.component';

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    NavbarComponent,
    ProductDetailComponent,
    TransactionComponent,
    ProductUpdateComponent,
    CategoryListComponent,
    CategoryUpdateComponent
  ],
  imports: [
    SharedModule,
    PageRoutingModule,
    AppComponentModule,
  ],
  exports: [
    MainComponent,
    NavbarComponent
  ]
})
export class PageModule {}
