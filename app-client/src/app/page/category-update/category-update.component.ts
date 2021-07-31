import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Category, ICategory } from 'src/app/entity/category.model';
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

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
  });

  constructor(
    private fb: FormBuilder, 
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
          this.updateForm(this.category);
        },
        err => { alert(err); }
      );
  }

  protected updateForm(item: ICategory): void {
    if(item){
      this.editForm.patchValue({
        id: item.id,
        name: item.name,
        description: item.description,
      });
    }
  }

  protected getFormItem(): ICategory {
    return {
      ...new Category(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }

  save(): void {
    this.isSaving = true;
    const item = this.getFormItem();
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
