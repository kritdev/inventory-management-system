import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProductSummaryComponent } from './product-summary/product-summary.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

const componentList = [
  SearchBarComponent,
  ProductSummaryComponent,
  TransactionListComponent
];

@NgModule({
  declarations: [ componentList ],
  imports: [
    SharedModule
  ],
  exports: [ componentList ]
})
export class AppComponentModule {}
