import { Component, Input, OnInit } from '@angular/core';
import { getCountInStock, getProductImage, hasImage, IProduct } from 'src/app/entity/product.model';

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.css']
})
export class ProductSummaryComponent implements OnInit {

  @Input() product: IProduct;
  @Input() enableProductDetailLink = true;

  constructor() { }

  ngOnInit(): void {
  }

  hasImage() {
    return this.product && hasImage(this.product);
  }

  getProductImage() {
    return getProductImage(this.product);
  }

  getCountInStock() {
    return getCountInStock(this.product);
  }
}
