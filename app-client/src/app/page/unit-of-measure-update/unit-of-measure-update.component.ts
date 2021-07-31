import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IUnitOfMeasure, UnitOfMeasure } from 'src/app/entity/unit-of-measure.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-unit-of-measure-update',
  templateUrl: './unit-of-measure-update.component.html',
  styleUrls: ['./unit-of-measure-update.component.css']
})
export class UnitOfMeasureUpdateComponent implements OnInit {

  isLoading = false;
  isSaving = false;
  unitOfMeasure: IUnitOfMeasure = {};

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
    this.dataService.findUnitOfMeasure(itemId)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        result => { 
          this.unitOfMeasure = result.body; 
          this.updateForm(this.unitOfMeasure);
        },
        err => { alert(err); }
      );
  }

  protected updateForm(item: IUnitOfMeasure): void {
    if(item){
      this.editForm.patchValue({
        id: item.id,
        name: item.name,
        description: item.description,
      });
    }
  }

  protected getFormItem(): IUnitOfMeasure {
    return {
      ...new UnitOfMeasure(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }

  save(): void {
    this.isSaving = true;
    const item = this.getFormItem();
    if (item.id) {
      this.subscribeToSaveResponse(this.dataService.updateUnitOfMeasure(item));
    } else {
      this.subscribeToSaveResponse(this.dataService.createUnitOfMeasure(item));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUnitOfMeasure>>): void {
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

