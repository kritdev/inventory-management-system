import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/entity/product.model';

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.css']
})
export class ProductSummaryComponent implements OnInit {

  product: IProduct = {
    name: 'Small Chair',
    brand: 'Chicky Chair',
    category: {name:'Chair'},
    unitOfMeasure: {name:'pcs.'}
  };

  constructor() { }

  ngOnInit(): void {
  }

}
