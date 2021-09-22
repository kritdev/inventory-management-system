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
import { UnitOfMeasureListComponent } from './unit-of-measure-list/unit-of-measure-list.component';
import { UnitOfMeasureUpdateComponent } from './unit-of-measure-update/unit-of-measure-update.component';
import { AppFormModule } from '../component/app-form/app-form.module';

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    NavbarComponent,
    ProductDetailComponent,
    TransactionComponent,
    ProductUpdateComponent,
    CategoryListComponent,
    CategoryUpdateComponent,
    UnitOfMeasureListComponent,
    UnitOfMeasureUpdateComponent
  ],
  imports: [
    SharedModule,
    PageRoutingModule,
    AppComponentModule,
    AppFormModule,
  ],
  exports: [
    MainComponent,
    NavbarComponent
  ]
})
export class PageModule {}
