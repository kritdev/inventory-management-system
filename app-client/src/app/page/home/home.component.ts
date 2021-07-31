import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProductFilter } from 'src/app/entity/product-filter.model';
import { IProduct, Product } from 'src/app/entity/product.model';
import { AccountService } from 'src/app/security/auth/account.service';
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

  constructor(
    private accountService: AccountService,
    private productService: ProductService) { 
    }
  
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
          && this.searchProductByKeyward(product, this.productFilter.productName);
    });
  }

  /**
   * Return True, if the keyward is in any of these fields: -
   * - Product Name
   * - Product Code (Barcode)
   * - Description
   * 
   * @param product 
   * @param keyward 
   * @returns 
   */
  searchProductByKeyward(product: IProduct, keyward):boolean {

    // if keyward is blank, null or undefinded -> return true
    if(!keyward) return true;

    return (product.name? product.name.toLowerCase().includes(keyward) : false) ||
      (product.productCode? product.productCode.toLowerCase().includes(keyward) : false) ||
      (product.description? product.description.toLowerCase().includes(keyward) : false);
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

}
