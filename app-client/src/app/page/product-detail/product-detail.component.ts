import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { IProduct } from 'src/app/entity/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: number;
  product: IProduct;
  isLoadingProduct = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.productId = p.id;
      this.retrieveProduct(this.productId);
    });
  }

  protected retrieveProduct(productId: number) {
    this.isLoadingProduct = true;
    this.productService.find(productId)
      .pipe(
        finalize(() => this.isLoadingProduct = false)
      )
      .subscribe(
        result => { 
          this.product = result.body; 
        },
        err => { alert(err); }
      );
  }

}
