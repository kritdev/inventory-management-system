import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IProductFilter, ProductFilter } from 'src/app/entity/product-filter.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  productFilter: IProductFilter = new ProductFilter();

  @Output()
  OnFilter: EventEmitter<Object> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onProductChange(event) {
    this.productFilter.productName = event.target.value.toLowerCase();
    this.OnFilter.emit(this.productFilter);
  }

  onCategoryChange(event) {
    this.productFilter.category = event.target.value;
    this.OnFilter.emit(this.productFilter);
  }

}
