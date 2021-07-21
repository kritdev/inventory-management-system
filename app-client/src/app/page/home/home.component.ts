import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProductFilter } from 'src/app/entity/product-filter.model';
import { IProduct, Product } from 'src/app/entity/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: IProduct[];
  isLoading = false;
  productFilter: IProductFilter = {};

  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.retrieveProductList();
  }

  protected retrieveProductList() {
    this.isLoading = true;
    this.productService.query().subscribe(
      (res: HttpResponse<IProduct[]>) => {
        this.isLoading = false;
        this.productList = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  applyProductFilter(event) {
    this.productFilter = event;
  }

  getProductList() {
    if(!this.productList) return [];

    return this.productList.filter(product => {
      // if no filter, return all items
      if(!this.productFilter) return true;

      // filter items
      return (this.productFilter.category? product.category.name.includes(this.productFilter.category) : true)
          && (this.productFilter.productName? product.name.toLowerCase().includes(this.productFilter.productName) : true);
    });
  }

}
