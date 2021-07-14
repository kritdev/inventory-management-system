import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/entity/product.model';

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.css']
})
export class ProductSummaryComponent implements OnInit {

  @Input() product: any;

  constructor() { }

  ngOnInit(): void {
  }

}