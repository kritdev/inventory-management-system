import { Injectable } from '@angular/core';
import { IInventoryTransactionItem } from '../entity/inventory-transaction-item.model';
import { IProductSummary } from '../entity/product-summary.model';
import { sampleProductDataList } from './sample-product-data';
import { sampleTransactionByProductDataList } from './sample-transaction-log-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public retrieveProductSummary(productId: number): IProductSummary {
    return sampleProductDataList[productId - 101];
  }

  public retrieveProductSummaryList(): IProductSummary[] {
    return sampleProductDataList;
  }

  public retrieveTransactionLogByProductId(productId: number): IInventoryTransactionItem[] {
    return sampleTransactionByProductDataList;
  }

}
