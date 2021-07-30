import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/entity/category.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: ICategory[] = [];
  isLoading = false;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.retrieveData();
  }

  protected retrieveData() {
    this.isLoading = true;
    this.dataService.retrieveCategorieList()
      .subscribe(
        result => {
        this.isLoading = false;
        this.categories = result as any;
      },
        err => {
        this.isLoading = false;
        alert(err);
      }
    );
  }

}
