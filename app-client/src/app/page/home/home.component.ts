import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

}
