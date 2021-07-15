import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductSummary } from 'src/app/entity/product-summary.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: number;
  product: IProductSummary;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.productId = p.id;
      this.retrieveData();
    });
  }

  retrieveData() {
    this.product = this.dataService.retrieveProductSummary(this.productId);
  }

}
