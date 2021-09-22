import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ISetting } from 'src/app/entity/setting.model';
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
    this.dataService.findUnitOfMeasure(itemId)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        result => { 
          this.unitOfMeasure = result.body; 
        },
        err => { alert(err); }
      );
  }

  save(item: ISetting): void {
    this.isSaving = true;
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

