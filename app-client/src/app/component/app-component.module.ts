import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProductSummaryComponent } from './product-summary/product-summary.component';
import { InventoryLogComponent } from './inventory-log/inventory-log.component';

const componentList = [
  SearchBarComponent,
  ProductSummaryComponent,
  InventoryLogComponent
];

@NgModule({
  declarations: [ componentList ],
  imports: [
    SharedModule
  ],
  exports: [ componentList ]
})
export class AppComponentModule {}
