import { Component, OnInit } from '@angular/core';
import { IUnitOfMeasure } from 'src/app/entity/unit-of-measure.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-unit-of-measure-list',
  templateUrl: './unit-of-measure-list.component.html',
  styleUrls: ['./unit-of-measure-list.component.css']
})
export class UnitOfMeasureListComponent implements OnInit {

  unitOfMeasures: IUnitOfMeasure[] = [];
  isLoading = false;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.retrieveData();
  }

  protected retrieveData() {
    this.isLoading = true;
    this.dataService.retrieveUnitOfMeasureList()
      .subscribe(
        result => {
        this.isLoading = false;
        this.unitOfMeasures = result as any;
      },
        err => {
        this.isLoading = false;
        alert(err);
      }
    );
  }

}
