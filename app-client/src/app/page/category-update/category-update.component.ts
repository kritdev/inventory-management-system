import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ICategory } from 'src/app/entity/category.model';
import { ISetting } from 'src/app/entity/setting.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  isLoading = false;
  isSaving = false;
  category: ICategory = {};

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    // if provide id, retrieve item
    this.route.params.subscribe(p => {
      if(p.id) {
        this.retrieveItem(p.id);
      }
    });
  }

  retrieveItem(itemId: number) {
    this.isLoading = true;
    this.dataService.findCategory(itemId)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        result => { 
          this.category = result.body;
        },
        err => { alert(err); }
      );
  }

  save(item: ISetting): void {
    this.isSaving = true;
    if (item.id) {
      this.subscribeToSaveResponse(this.dataService.updateCategory(item));
    } else {
      this.subscribeToSaveResponse(this.dataService.createCategory(item));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategory>>): void {
    result
      .pipe(finalize(() => this.isSaving = false))
      .subscribe(
        () => this.previousState(),
        err => this.onSaveError(err)
      );
  }

  protected onSaveError(err): void {
    alert('Error');
  }

  previousState(): void {
    window.history.back();
  }
}
