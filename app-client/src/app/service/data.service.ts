import { Injectable } from '@angular/core';
import { IProductSummary } from '../entity/product-summary.model';
import { sampleDataList } from './sample-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public retrieveProductSummary(id: number): IProductSummary {
    return sampleDataList[id - 101];
  }

  public retrieveProductSummaryList(): IProductSummary[] {
    return sampleDataList;
  }
}
