import { Component, OnInit } from '@angular/core';
import { IProductSummary } from 'src/app/entity/product-summary.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: IProductSummary[];

  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
    this.retrieveProductList();
  }

  retrieveProductList() {
    this.productList = this.dataService.retrieveProductSummaryList();
  }

}
