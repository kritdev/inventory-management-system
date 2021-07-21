import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { ICategory } from 'src/app/entity/category.model';
import { IProductFilter, ProductFilter } from 'src/app/entity/product-filter.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  isLoading = false;
  categories: ICategory[] = [];
  productFilter: IProductFilter = new ProductFilter();

  @Output()
  OnFilter: EventEmitter<Object> = new EventEmitter();

  constructor(private dataService: DataService,) { }

  ngOnInit(): void {
    this.retrieveCategories();
  }

  protected retrieveCategories() {
    this.isLoading = true;
    this.dataService.retrieveCategorieList()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        result => { this.categories = result as any; },
        err => { alert(err); }
      );
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
